
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;
//one way to export. do after youve defined everything
module.exports = {add, subtract, multiply, divide};

/* another way to export
exports.const add = (a,b) => a+b;
exports.const subtract = (a,b) => a-b;
exports.const multiply = (a,b) => a*b;
exports.const divide = (a,b) => a/b;
*/

