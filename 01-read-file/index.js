const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(pathFile, 'utf-8');
let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', error => console.log('Error', error.message))