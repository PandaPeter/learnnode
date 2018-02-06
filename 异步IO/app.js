const fs = require('fs');
setImmediate(function() {
    console.log('setImmediate');
});
setTimeout(function() {
    console.log('setTimeout');
}, 0);
process.nextTick(function() {
    console.log('nexttick');
});
fs.readFile('../README.md', function(err, data) {
    console.log('readFile');
});
console.log('app.js');