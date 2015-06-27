var bird = require('../entities/bird');
var pipe = require('../entities/pipe');

var CollisionSystem = function (entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }
        
        for (var j = i + 1; j < this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }
            
            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;    
            }

            console.log('Entities Array ', this.entities);
                
            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
                if (entityA instanceof bird.Bird) {
                    this.entities.splice(1, this.entities.length - 1);
                }
            }
            
            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
                if (entityB instanceof bird.Bird) {
                    this.entities.splice(1, this.entities.length - 1);
                }
            }

            
        }
    }
};

exports.CollisionSystem = CollisionSystem;