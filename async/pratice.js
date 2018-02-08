const fs = require('fs');
function todo(callback) {
    let result = {},
        count = 0;
    return function(key, value) {
        result[key] = value;
        if(++count == 3){
            callback(result);
        }
    }
}

fs.readFile('after.js', (err, data) => {
    done('data1', data);
});
fs.readFile('after.js', (err, data) => {
    done('data2', data);
});
fs.readFile('after.js', (err, data) => {
    done('data3', data);
});

const done = todo(function(result) {
    let keys = Object.keys(result);
    console.log(keys);
});