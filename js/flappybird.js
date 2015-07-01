var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');

var bird = require('./entities/bird');
var topedge = require('./entities/topedge');
var bottomedge = require('./entities/bottomedge');

var settings = require('./settings');

var FlappyBird = function () {
    this.entities = [new bird.Bird(), new topedge.TopEdge(), new bottomedge.BottomEdge()];
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


FlappyBird.prototype.resetGame = function () {
	this.entities.splice(3, this.entities.length - 3);

	var bird = this.entities[0];
	bird.components.physics.position = {
		x: settings.birdStartPos.x,
        y: settings.birdStartPos.y
	};
	bird.components.physics.velocity.y = 0;
};

exports.FlappyBird = FlappyBird;