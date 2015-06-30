var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/circle");
var settings = require("../settings");

var Bird = function () {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = settings.birdStartPos.y;
    physics.acceleration.y = settings.gravity;
    
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function (entity) {
    
    // Reset the Bird's position on collision
    this.components.physics.position = {
        x: settings.birdStartPos.x,
        y: settings.birdStartPos.y
    };
    this.components.physics.velocity.y = 0;
};

exports.Bird = Bird;