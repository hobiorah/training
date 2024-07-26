const {format} = require('date-fns');
//import v4 as uuid
const { v4: uuid } = require('uuid');
const fs = require('fs');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm'))
console.log(uuid());