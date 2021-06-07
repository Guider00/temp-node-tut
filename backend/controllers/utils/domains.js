import ThrowError from "../errors/basic"

export const findAndUpdate = async (repo, filter, data) => {
  let obj
  let resulte
  try {
    obj = await repo.findOne(filter)
    if (data && obj && obj._doc) {
      obj._doc = { ...obj._doc, ...data }
      resulte = await repo.updateOne(filter, obj._doc)
    }
  } catch (e) {
    console.log("error", e)
    resulte = e
  }
  return resulte
}

export const findAndUpdateOrCreate = async (repo, filter, data) => {
  let obj = await repo.findOne(filter)
  if (obj) {
    obj = await repo.update(filter, data)
  } else {
    obj = await repo.create(data)
  }
  return obj
}
export const findOrCreate = async (repo, filter, data) => {
  let obj = null
  if (filter && filter) {
    obj = await repo.findOne(filter)
    if (!obj) {
      obj = await repo.create(data)
    }
  } else {
    try {
      obj = await repo.create(data)
    } catch (e) {
      console.log(e)
    }
  }
  return obj
  // let obj = await repo.findOne(filter)
  // if (!obj) {
  //   obj = await repo.create(data)
  // }
  // return obj
}

export const findOneIfAlreadyExistThrowError = async (repo, filter) => {
  const obj = await repo.findOne(filter)
  if (obj) throw ThrowError.ALREADY_EXIST({ model: repo.model.modelName, ...filter })
  return obj
}

export const findOneIfNotExistThrowError = async (repo, filter) => {
  const obj = await repo.findOne(filter)
  if (!obj) throw ThrowError.NOT_FOUND({ model: repo.model.modelName, ...filter })
  return obj
}

export const findOneOrFindAll = async (repo, filter) => {
  let obj = null
  if (!filter) {
    obj = await repo.find()
  } else {
    obj = await repo.findOne(filter)
  }
  return obj

  // const obj = await repo.find(filter)
  // return obj
}

export const findOneWithFilter = async (repo, filter) => {
  let obj = null
  if (!filter) {
    obj = await repo.find()
  } else {
    obj = await repo.find(filter)
  }
  return obj
}

export const checkUpdate = async (repo, filter, data) => {
  const obj = await repo.update(filter, data, { new: true })
  if (!obj) throw ThrowError.NOT_FOUND({ model: repo.model.modelName, ...filter })
  return obj
}

export const checkDelete = async (repo, filter) => {
  const obj = await repo.deleteOne(filter)
  if (!obj) throw ThrowError.NOT_FOUND({ model: repo.model.modelName, ...filter })
  return obj
}

export const clearCollection = async (repo) => {
  const obj = await repo.remove({})
  return obj
}

export const convertObjectToArrayAndSetKey = (data) => {
  let updateData = []
  if (data) {
    const keys = Object.keys(data)
    updateData = Object.values(data)
    let key
    for (key in updateData) {
      updateData[key] = { ...updateData[key], key: keys[key] }
    }
  }
  return updateData
}
