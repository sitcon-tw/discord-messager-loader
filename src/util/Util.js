export default class {
  // Example: 
  // getParamNames(getParamNames) // returns ['func']
  // getParamNames(function (a,b,c,d){}) // returns ['a','b','c','d']
  // getParamNames(function (a,/*b,c,*/d){}) // returns ['a','d']
  // getParamNames(function (){}) // returns []
  static getParamNames(func) {
    let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
    let ARGUMENT_NAMES = /([^\s,]+)/g;  
    let fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if(result === null)
       result = [];
    return result;
  }
}