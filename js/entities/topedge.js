var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');
var settings = require('../settings');

var TopEdge = function () {
	this.dimens = {
		x: settings.birdWidth * 2,	// only need a small width since bird is centered
		y: 0.01						// very thin
	};	

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0; 	// bird is always centered on canvas
	physics.position.y = 1.005;  // just above the canvas's top edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

TopEdge.prototype.onCollision = function (entity) {
//	console.log('Edge collided with entity: ', entity);
};

exports.TopEdge = TopEdge;