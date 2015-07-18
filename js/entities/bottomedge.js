var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');
var settings = require('../settings');

var BottomEdge = function () {
	this.dimens = {
		x: settings.birdWidth * 2,	// only need a small width since bird is centered
		y: 0.01						// very thin
	};	

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0; 	// bird is always centered on canvas
	physics.position.y = -0.05; // just below the canvas's bottom edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

exports.BottomEdge = BottomEdge;