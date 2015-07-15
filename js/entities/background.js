var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/background');

var settings = require('../settings');

var Background = function () {

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0;
	physics.position.y = 1;
	physics.velocity.x = -0.2;

	var graphics = new graphicsComponent.BackgroundGraphicsComponent(this);

	var backgroundImg = new Image();
	backgroundImg.src = settings.backgroundImg;

	this.components = {
		physics: physics,
		graphics: graphics,
		backgroundImg: backgroundImg
	};
};

exports.Background = Background;