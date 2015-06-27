var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Pipe = function (pos, size) {
    var physics = new physicsComponent.PhysicsComponent(this);    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);   
    
    var collision = new collisionComponent.RectCollisionComponent(this, size);
    collision.onCollision = this.onCollision.bind(this);
    
    physics.position = pos;
    physics.acceleration.x = -0.4;
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Pipe.prototype.onCollision = function (entity) {
    // console.log('Pipe collided with entity: ', entity);
    
};

exports.Pipe = Pipe;