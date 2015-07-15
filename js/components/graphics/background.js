var settings = require('../../settings');

var BackgroundGraphicsComponent = function (entity) {
	this.entity = entity;
	this.canvas = document.getElementById('canvas');
};

BackgroundGraphicsComponent.prototype.draw = function (context) {

	var physics = this.entity.components.physics;
	var backgroundImg = this.entity.components.backgroundImg;

	var aspectRatio = this.canvas.width / this.canvas.height;

	context.save();

	if ((physics.position.x + aspectRatio) <= -(aspectRatio / 2)) {
		physics.position.x += aspectRatio * 2;
	}

	context.translate(-aspectRatio, 0);
	context.drawImage(
		backgroundImg, physics.position.x, 0, aspectRatio, 1);
	context.drawImage(
		backgroundImg, physics.position.x + aspectRatio * 2, 0, aspectRatio, 1);
	context.translate(aspectRatio, 0);
	context.scale(-1, 1);
	context.drawImage(
		backgroundImg, -(aspectRatio + physics.position.x), 0, aspectRatio, 1);

	context.restore();
};

exports.BackgroundGraphicsComponent = BackgroundGraphicsComponent;