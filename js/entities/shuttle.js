var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/shuttle');

var settings = require('../settings');

var Shuttle = function () {
	var shuttleImage = new Image();
	shuttleImage.src = settings.shuttleImage;

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -aspectRatio;
	physics.position.y = getRandom(0.1, 0.9);
	physics.velocity.x = 0.2;
	physics.velocity.y = 0.04;
	physics.acceleration.y = -0.02;

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