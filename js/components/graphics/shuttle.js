
var ShuttleGraphicsComponent = function (entity) {
	this.entity = entity;
	this.canvas = document.getElementById('canvas');
};

ShuttleGraphicsComponent.prototype.draw = function (context) {
	var physics = this.entity.components.physics;
	var shuttleImage = this.entity.components.shuttleImage;

	context.save();

	context.scale(1, -1);
	context.drawImage(
		shuttleImage, physics.position.x, -physics.position.y, 0.1, 0.05);

	context.restore();
};

exports.ShuttleGraphicsComponent = ShuttleGraphicsComponent;