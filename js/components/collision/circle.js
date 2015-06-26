var CircleCollisionComponent = function (entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
};

CircleCollisionComponent.prototype.collidesWith = function (entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function (entity) {
    var posA = this.entity.components.physics.position,
        posB = entity.components.physics.position,
    
        radA = this.radius,
        radB = entity.components.collision.radius,
    
        diff = {
            x: posA.x - posB.x,
            y: posA.y - posB.y
        },
    
        distanceSquared = diff.x * diff.x + diff.y * diff.y,
        radiusSum = radA + radB;
    
    return distanceSquared < radiusSum * radiusSum;
};

CircleCollisionComponent.prototype.collideRect = function (entity) {
    var clamp = function (value, low, high) {
            if (value < low) {
                return low;
            }
            if (value > high) {
                return high;
            }

            return value;
        },
    
        posA = this.entity.components.physics.position,
        posB = entity.components.physics.position,
        sizeB = entity.components.collision.size,
        
        closest = {
            x: clamp(posA.x, posB.x - sizeB.x / 2, posB.x + sizeB.x / 2),
            y: clamp(posA.y, posB.y - sizeB.y / 2, posB.y + sizeB.y / 2)
        },
        
        radiusA = this.radius,
        
        diff = {
            x: posA.x - closest.x,
            y: posA.y - closest.y
        },
        
        distanceSquared = diff.x * diff.x + diff.y * diff.y;
    
    return distanceSquared < radiusA * radiusA;
};

exports.CircleCollisionComponent = CircleCollisionComponent;