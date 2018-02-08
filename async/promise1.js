const fs = require('fs');
class Pormise {
    constructor() {
        this.queue = [];
       
        this.isPromise = true;
    }

    then(fulfilledHandler, errorHandle) {
        let handle = {};
        if(typeof fulfilledHandler === 'function'){
            handle.fulfilled = fulfilledHandler;
        }

        if(typeof errorHandle === 'function') {
            handle.error = errorHandle;
        }

        this.queue.push(handle);
        return this;
    }
}

class Deferred {
    constructor() {
        this.promise = new Pormise();
    }

    resolve(obj) {
        let promise = this.promise;
        let handle;
        while((handle = promise.queue.shift())){
            if(handle && handle.fulfilled){
                let ret = handle.fulfilled(obj);
                if(ret && ret.isPromise){
                    ret.queue = promise.queue;
                    this.promise = ret;
                    return;
                }
            }
        }
    }

    callback() {
        let that = this;
        return function(err, data) {
            if(err){
                console.log(err);
            }else{
                that.resolve(data);
            }
        }
    }
}

readFile1 = function(path, encoding) {
    const deferred = new Deferred();
    fs.readFile(path, deferred.callback());
    return deferred.promise;
}
readFile2 = function(path, encoding) {
    const deferred = new Deferred();
    fs.readFile(path, deferred.callback());
    return deferred.promise;
}

readFile1('promise.js', 'utf8').then(function(file1) {
    return readFile2('after.js', 'utf8');
}).then(data => {console.log(data)});