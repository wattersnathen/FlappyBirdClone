var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');

var settings = require('../settings');

var pipe = require('./pipe');
var score = require('./score');

var LeftEdge = function () {
	this.dimens = {
		x: 0.001,
		y: document.getElementById('canvas').height   
	};

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -(aspectRatio / 2) - 0.1;
	physics.position.y = 0.001;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	}
};

exports.LeftEdge = LeftEdge;