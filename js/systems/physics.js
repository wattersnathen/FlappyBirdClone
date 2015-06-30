var collisionSystem = require('./collision');

var PhysicsSystem = function (entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.previousRun;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function () {
    var timestamp = performance.now();
    
    var delta = (timestamp - this.previousRun) / 1000;

    this.previousRun = timestamp;
    
    if (isNaN(delta)) {
        return;
    }

    for (var i=0; i<this.entities.length; i++) {
        var entity = this.entities[i];
        if (!('physics' in entity.components)) {
            continue;
        }

        entity.components.physics.update(delta);
    }
    
    this.collisionSystem.tick();
};

exports.PhysicsSystem = PhysicsSystem;