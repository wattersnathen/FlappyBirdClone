(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function (entity, size) {
    this.entity = entity;
    this.size = size;
};

PipeGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;
    
    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    context.fill();
    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
var PhysicsComponent = function (entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function (delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],4:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');

var Bird = function () {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = 0.5;
    physics.acceleration.y = -2;
    
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    
    this.components = {
        physics: physics,
        graphics: graphics
    };
};

exports.Bird = Bird;
},{"../components/graphics/bird":1,"../components/physics/physics":3}],5:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');

var Pipe = function (pos, size) {
    var physics = new physicsComponent.PhysicsComponent(this);    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);    
    
    physics.position = pos;
    physics.acceleration.x = -0.4;
    
    this.components = {
        physics: physics,
        graphics: graphics
    };
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":2,"../components/physics/physics":3}],6:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');

var bird = require('./entities/bird');

var FlappyBird = function () {
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipeSystem.PipeSystem(this.entities);
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pipes.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":4,"./systems/graphics":9,"./systems/input":10,"./systems/physics":11,"./systems/pipe":12}],7:[function(require,module,exports){
var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    app.run();
});
},{"./flappybird":6}],8:[function(require,module,exports){
exports.pipeWidth = 0.15;
exports.pipeGap = 0.2;
},{}],9:[function(require,module,exports){
var GraphicsSystem = function (entities) {
    this.entities = entities;
    
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');
};

GraphicsSystem.prototype.run = function () {
    // run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function () {
    
    if (this.canvas.width !== this.canvas.offsetWidth ||
            this.canvas.height !== this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    // clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);
    
    for (var idx = 0; idx < this.entities.length; idx++) {
        var entity = this.entities[idx];
        
        if (!('graphics' in entity.components)) {
            continue;
        }
        
        entity.components.graphics.draw(this.context);
    }
    this.context.restore();
    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;
},{}],10:[function(require,module,exports){
var InputSystem = function (entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('canvas');
};

InputSystem.prototype.run = function () {
    this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;
},{}],11:[function(require,module,exports){
var PhysicsSystem = function (entities) {
    this.entities = entities;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function () {
    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('physics' in entity.components)) {
            continue;
        }

        entity.components.physics.update(1/60);
    }
};

exports.PhysicsSystem = PhysicsSystem;
},{}],12:[function(require,module,exports){
var pipe = require('../entities/pipe');
var settings = require('../settings');

var PipeSystem = function (entities) {
    this.entities = entities;
    this.canvas = document.getElementById('canvas');
    this.interval = 0;
};

PipeSystem.prototype.run = function () {
    this.interval = window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function () {
    var right = 0.5 * this.canvas.width / this.canvas.height;
    var gapPosition = 0.4 + Math.random() * 0.2;

    var height = gapPosition - settings.pipeGap / 2;
    var position = {
        x: right + settings.pipeWidth / 2,
        y: height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };

    this.entities.push(new pipe.Pipe(position, size));

    var height = 1 - gapPosition - settings.pipeGap / 2;
    var position = {
        x: right + settings.pipeWidth / 2,
        y: 1 - height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };
    this.entities.push(new pipe.Pipe(position, size));
};

exports.PipeSystem = PipeSystem;
},{"../entities/pipe":5,"../settings":8}]},{},[7]);
