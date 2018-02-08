const EventEmitter = require('events');
const http = require('http');
const fs = require('fs');
class Promise extends EventEmitter {
    then(fulfilledHandler, errorHandler) {
        if(typeof fulfilledHandler === 'function') {
            this.on('success', fulfilledHandler);
        }

        if(typeof errorHandler === 'function') {
            this.on('error', errorHandler);
        }
        return this;
    }
    error(errorHandler) {
        this.on('error', errorHandler);
    }
}

class Deferred {
    constructor() {
        this.promise = new Promise();
        this.state = 'unfulfilled';
    }

    resolve(result) {
        this.state = 'fulfilled';
        this.promise.emit('success', result);
    }

    reject(error) {
        this.state = 'error';
        this.promise.emit('error', error);
    }
}

const readFile = function(path) {
    const deferred = new Deferred();
    fs.readFile(path, (err, data) => {
        if(err){
            deferred.reject(err);
        }else{
            deferred.resolve(data);
        }
    });
    return deferred.promise;
}

readFile('aftefr.js').then(data => console.log(data.toString())).error(err => console.log(err.message));