var settings = require('../settings');

var collisionSystem = require('./collision');
var collectorSystem = require('./collector');

var PhysicsSystem = function (entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.collectorSystem = new collectorSystem.CollectorSystem(entities);
    this.previousRun;
    this.paused = false;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function () {
    var timestamp = performance.now();
    
    var delta = (timestamp - this.previousRun) / 1000;

    delta = delta / settings.slowmo;

    this.previousRun = timestamp;
    
    if (isNaN(delta)) {
        return;
    }

    if (!this.paused) {
        for (var i=0; i<this.entities.length; i++) {
            var entity = this.entities[i];
            if (!('physics' in entity.components)) {
                continue;
            }

            entity.components.physics.update(delta);
        }
        
        this.collisionSystem.tick();
        this.collectorSystem.tick();
    }

};

exports.PhysicsSystem = PhysicsSystem;