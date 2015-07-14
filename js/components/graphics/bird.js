var settings = require('../../settings');

var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;
    var birdImg = this.entity.components.birdImg;

    context.save();
    context.translate(position.x, position.y);
    context.scale(1, -1); // flips bird right side up
    context.drawImage(
    	// img to draw
    	birdImg, 
    	// img dimensions
    	50, 50, -50, -50,
    	// canvas placement
    	-0.02, -0.02, 
    	// img dimensions on canvas
    	0.05, 0.05);
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;