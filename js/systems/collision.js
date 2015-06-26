var CollisionSystem = function (entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function () {
    for (var i = 0, len = this.entities.length; i < len; i++) {
        var entityA = this.entities[i];
        if (!('collision' in entityA.components)) {
            continue;
        }
        
        for (var j = i + 1; j < len; j++) {
            var entityB = this.entities[j];
            if (!('collision' in entityB.components)) {
                continue;
            }
            
            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;    
            }
                
            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }
            
            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

exports.CollisionSystem = CollisionSystem;