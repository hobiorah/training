const os = require('os');
const path = require('path');
//const math = require('./math');
const {add, subtract, multiply, divide} = require('./math');

//when we import entire file as a variable we can access what we specifically want with the variable
//console.log(math.add(1,2));
console.log(add(1,2));


console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname);
console.log(__filename);

//whats directory is this file in
console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));

