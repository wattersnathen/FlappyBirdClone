var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');

var Pipe = function (pos, size) {
    var physics = new physicsComponent.PhysicsComponent(this);    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);    
    
    physics.position = pos;
    physics.acceleration.x = -0.4;
    
    this.components = {
        physics: physics,
        graphics: graphics
    };
};

exports.Pipe = Pipe;