var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');

var settings = require('../settings');

var RightEdge = function () {
	this.dimens = {
		x: 0.1,
		y: document.getElementById('canvas').height
	};

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = aspectRatio / 2 + 0.1;
	physics.position.y = 0;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	}
};

exports.RightEdge = RightEdge;