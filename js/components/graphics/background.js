var settings = require('../../settings');

var BackgroundGraphicsComponent = function (entity) {
	this.entity = entity;
	this.canvas = document.getElementById('canvas');
};

BackgroundGraphicsComponent.prototype.draw = function (context) {

	return;

	var physics = this.entity.components.physics;
	var backgroundImg = this.entity.components.backgroundImg;

	var aspectRatio = this.canvas.width / this.canvas.height;

	context.save();

	context.drawImage(
		backgroundImg, -physics.position.x, 0, aspectRatio, backgroundImg.height);
	context.translate(this.canvas.width, 0);
	context.scale(-1, 1);
	context.drawImage(
		backgroundImg, -(this.canvas.width - physics.position.x), 0, aspectRatio, backgroundImg.height);

	context.restore();
};

exports.BackgroundGraphicsComponent = BackgroundGraphicsComponent;