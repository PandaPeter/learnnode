const After = function(times, fn) {
    if(times < 0) return fn(times);
    return function() {
        console.log(times);
        if(--times < 1){
            return fn(times);
        }
    }
}

function a(x) {
    console.log(x);
}

const after = After(3, a);
after();
after();
after();
after();