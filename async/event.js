const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('data', data => console.log(data));
myEmitter.on('data', data => console.log(data + ' peter'));
myEmitter.once('data', data => console.log(data + ' _peter'));

myEmitter.emit('data', 'panda');
myEmitter.emit('data', 'peter');