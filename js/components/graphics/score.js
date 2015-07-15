var ScoreGraphicsComponent = function (entity, size) {
	this.entity = entity;	
	this.size = size;
};

ScoreGraphicsComponent.prototype.draw = function (context) {
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.fillStyle = "rgba(0, 0, 0, 0)";
	context.beginPath();
	context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
	context.fill();
	context.closePath();
	context.restore();
};

exports.ScoreGraphicsComponent = ScoreGraphicsComponent;