function upperCaseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.substr(1);
}

function camelCase(string){
    return string
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

function handleEmpty(value, dash){
    return typeof value === "boolean" ? value : ((value &&  value!=="null")? value : (dash ? "-" : ""));
}

function handleOverflow(text, max){
    return text && text.length > max ? text.substr(0, max) + String.fromCharCode(8230) : text;
}

function convertUnicode(input) {
    return input && input.replace(/\\(x|u)+([A-Z0-9]+)/g,function(match, p1, p2) {
        const charCode = parseInt(p2, 16);
        return String.fromCharCode(charCode);
    });
}

function giveLetterSpacing(string){
        if(!string)return "";
        return string.split('').join('\u200A'.repeat(8));
    }

function giveStringSpaceFormat(string){
    if(!string)return "";
    //===================================================
    let stringHasil ='';
    const abcArr = string.split('');
    for(let i = 0; i < abcArr.length; i++){
    
    if(i%4 === 0 && i !== 0){
        stringHasil = stringHasil +' '+abcArr[i]
    }else{
        stringHasil = stringHasil + abcArr[i]
    }
       
}
    return stringHasil;
}


export {upperCaseFirstLetter, camelCase, handleEmpty, handleOverflow, convertUnicode, giveLetterSpacing,giveStringSpaceFormat}