var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/shuttle');
var collisionComponent = require('../components/collision/circle');

var settings = require('../settings');

var Shuttle = function () {
	var shuttleImage = new Image();
	shuttleImage.src = settings.shuttleImage;

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -(aspectRatio / 2) - 0.1;
	physics.position.y = getRandom(0.2, 0.9);
	physics.velocity.x = 0.8;
	physics.velocity.y = getRandom(0.15, 0.35);

	if (physics.position.y > 0.7) {
		physics.velocity.y = -physics.velocity.y;
	}

	physics.acceleration.y = getRandom(-0.04, -0.12);

	var graphics = new graphicsComponent.ShuttleGraphicsComponent(this);

	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision,
		shuttleImage: shuttleImage
	};
};

var getRandom = function (min, max) {
	return Math.random() * (max - min) + min;
};

exports.Shuttle = Shuttle;