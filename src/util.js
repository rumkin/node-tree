function toMap(object) {
    let map = new Map();
    
    Object.getOwnPropertyNames(object)
    .forEach((prop) => {
        map.set(prop, object[prop]);
    });
    
    return map;
}

module.exports.toMap = toMap;