export const lookup = (obj, key) => {
    const type = typeof key;
    if (type == 'string' || type == "number"){
        //handle case where [1] may occur
        key = ("" + key).replace(/\[(.*?)\]/, function (m, key) {
            //strip quotes
            return '.' + key.replace(/["']/g, "");
        }).split('.');
    }
    for (let i = 0, l = key.length; i < l; i++) {
        if (_.has(obj, key[i])){
            obj = obj[key[i]];
        }else{
            return undefined;
        }
    }
    return obj;
};

export const clean = (obj, boolToStringList) => {
    for (let propName in obj) {
        if (obj.hasOwnProperty(propName) && (obj[propName] === null || obj[propName] === undefined || obj[propName] === "" || obj[propName] === "null")) {
            delete obj[propName];
        }else if(obj.hasOwnProperty(propName) && boolToStringList && boolToStringList.indexOf(propName) >= 0){
            obj[propName] = obj[propName] ? "Y" : "N"
        }
    }

    return obj;
};

/**
 * Author: Joshua Clanton
 * http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
 * @param a
 * @param b
 * @return {boolean}
 */
export const isEquivalent = (a, b) => {
    try {
        const aProps = Object.getOwnPropertyNames(a);
        const bProps = Object.getOwnPropertyNames(b);

        if (aProps.length != bProps.length) {
            return false;
        }

        for (let i = 0; i < aProps.length; i++) {
            const propName = aProps[i];

            if (a[propName] !== b[propName]) {
                return false;
            }
        }

        return true;
    } catch (e) {
        // console.log( "comparing non object values" );
        return a === b;
    }
};