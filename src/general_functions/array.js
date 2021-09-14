


export const  uniq = (a) => {
    return Array.from(new Set(a));
 }
export const uniq_sort = (a) =>{
    return Array.from(new Set(a)).sort();
}


export const uniqueArrayByProperty = (array, property) => {
    return ( array.filter((a, i) => array.findIndex((s) => a[property] === s[property]) === i) ).sort((a, b) => a[property].toLowerCase() > b[property].toLowerCase() ? 1 : -1);
  }
//  Access object multi-level
export const access_obj_mutilevel = (obj, path) =>{
    path = path.split('.');
    var current = obj;
    while(path.length) {
        if(typeof current !== 'object') return undefined;
        current = current[path.shift()];
    }
    return current;
}