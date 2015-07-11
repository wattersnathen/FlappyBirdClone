var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');
var scoringSystem = require('./systems/scoring');

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
    this.score = new scoringSystem.ScoringSystem();

    this.paused = false;
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pause("Click to start Playing");
    this.pipes.run();
};

FlappyBird.prototype.pause = function (reason, nextCall) {
	if (this.onUnpause) {
		this.onUnpause();
	}
	this.onUnpause = nextCall;
	this.paused = !this.paused;
	this.graphics.paused = this.paused;
	this.physics.paused = this.paused;
	this.input.paused = this.paused;
	this.pipes.paused = this.paused;

	this.graphics.pauseReason = reason || 'PAUSED';
};

FlappyBird.prototype.resetGame = function () {
	this.entities.splice(3, this.entities.length - 3);

	var bird = this.entities[0];
	bird.components.physics.position = {
		x: settings.birdStartPos.x,
        y: settings.birdStartPos.y
	};
	bird.components.physics.velocity.y = 0;

	this.score.resetScore();
};

exports.FlappyBird = FlappyBird;