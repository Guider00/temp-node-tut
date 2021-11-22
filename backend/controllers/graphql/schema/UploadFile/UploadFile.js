const generateRandomString = (len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('')


const { createWriteStream, existsSync, mkdirSync } =require('fs')
let path = require('path')

const _singleUpload  = async (payload,payload2,data,a) => {
    console.log(payload2)
     console.log( payload2.file)
     try {
        console.log('Upload File payload' ,payload2 )
         let file = payload2.file
        const { createReadStream , filename , mintype , encoding } = await file
        const { ext }  = path.parse(filename)
        const randomName = generateRandomString(12) + ext 

        console.log('filename',ext)
        
            await new Promise(res =>
                createReadStream()
                .pipe(createWriteStream(path.join(__dirname, "../../../../../public/uploadimages", randomName)))
                .on("close", res)
            );

        return  {
            url: `/uploadimages/${randomName}`,
            filename :`${randomName}`,
            mimtype :"",
            encoding :"",
           
        }
        
    } catch (error) {
      return error
    }

    //   return args.file.then(file => {
    //     const {createReadStream, filename, mimetype} = file

    //     const fileStream = createReadStream()

    //     fileStream.pipe(fs.createWriteStream(`./uploadedFiles/${filename}`))

    //     return file;
    //   });
}

const _UploadFile = async (payload , payload2)=> {
    //  if(payload === undefined && payload2){ payload = payload2 } //<< function for graphqlexpress , Apollo 
    // try {
    //     console.log('Upload File payload' ,payload )
    //      let file = payload.file
    //     const { createReadStream , filename , mintype , encoding } = await file
    //     const ext = path.parse(filename)
    //     const randomName = generateRandomString(12) + ext 
    //     const stream = createReadStream()
    //     const pathName = path.join(__dirname,`/public/images/${randomName}`)

    //     await stream.pip(fs.createWriteStreaming(pathName))
    //     return  {
    //         url: `/images/${randomName}`
    //     }
        
    // } catch (error) {
    //   return error
    // }
}

const _Fileschema = `


type File {
    url:String!
    filename: String!
    mimtype: String!
    encoding: String!
  }
`
const _UploadFile_query =`
    Files :[File]
`
const _UploadFileschema_mutation = `
    UploadFile(file: Upload!): File!
    singleUpload(file: Upload!): File!
 

`



exports.UploadFile = _UploadFile
exports.singleUpload = _singleUpload
exports.UploadFile_query =_UploadFile_query
exports.UploadFileschema_mutation = _UploadFileschema_mutation
exports.Fileschema = _Fileschema