(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function () {
    console.log('Drawing a Bird');
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function (entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function () {
    console.log('Drawing a Pipe');
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],3:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/bird');

var Bird = function () {
    console.log('Creating Bird entity');
    
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    
    this.components = {
        graphics: graphics
    };
};

exports.Bird = Bird;
},{"../components/graphics/bird":1}],4:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/pipe');

var Pipe = function () {
    console.log('Creating Pipe entity');
    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    
    this.components = {
        graphics: graphics
    };
};

exports.Pipe = Pipe;
},{"../components/graphics/pipe":2}],5:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function () {
    this.entities = [new bird.Bird(), new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":3,"./entities/pipe":4,"./systems/graphics":7}],6:[function(require,module,exports){
var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    app.run();
});
},{"./flappybird":5}],7:[function(require,module,exports){
var GraphicsSystem = function (entities) {
    this.entities = entities;
};

GraphicsSystem.prototype.run = function () {
    for (var idx = 0; idx < 5; idx++) {
        this.tick();
    }
};

GraphicsSystem.prototype.tick = function () {
    for (var idx = 0; idx < this.entities.length; idx++) {
        var entity = this.entities[idx];
        
        if (!'graphics' in entity.components) {
            continue;
        }
        
        entity.components.graphics.draw(this.context);
    }
};

exports.GraphicsSystem = GraphicsSystem;
},{}]},{},[6]);
