var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/shuttle');

var settings = require('../settings');

var Shuttle = function () {
	var shuttleImage = new Image();
	shuttleImage.src = settings.shuttleImage;

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -(aspectRatio / 2) - 0.1;
	physics.position.y = getRandom(0.1, 0.9);
	physics.velocity.x = 0.8;
	physics.velocity.y = getRandom(0.1, 0.3);
	physics.acceleration.y = getRandom(-0.04, -0.12);

	var graphics = new graphicsComponent.ShuttleGraphicsComponent(this);

	this.components = {
		physics: physics,
		graphics: graphics,
		shuttleImage: shuttleImage
	};
};

var getRandom = function (min, max) {
	return Math.random() * (max - min) + min;
};

exports.Shuttle = Shuttle;