var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/score');

var settings = require('../settings');

var shuttle = require('./shuttle');
var bird = require('./bird');

var Score = function (pos, size) {
	this.scored = false;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position = pos;
	physics.velocity.x = -0.4;

	var graphics = new graphicsComponent.ScoreGraphicsComponent(this, size);
	var collision = new collisionComponent.RectCollisionComponent(this, size);
	collision.onCollision = this.onCollision.bind(this);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
};

Score.prototype.onCollision = function (entity) {
	if (this.scored || entity instanceof shuttle.Shuttle) {
		return;
	}
	
	this.scored = true;

	if (entity instanceof bird.Bird) {
		app.entities.push(new shuttle.Shuttle());	
	}
	
	app.score.updateScore();
};

exports.Score = Score;