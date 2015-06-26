var RectCollisionComponent = function (entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
};

RectCollisionComponent.prototype.collidesWith = function (entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    }
    else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    
    return false;
};

RectCollisionComponent.prototype.collideCircle = function (entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function (entity) {
    var posA = this.entity.components.physics.position,
        posB = entity.components.physics.position,
        
        sizeA = this.size,
        sizeB = entity.components.collision.size,
        
        leftA = posA.x - sizeA.x / 2,
        rightA = posA.x + sizeA.x / 2,
        bottomA = posA.y - sizeA.y / 2,
        topA = posA.y + sizeA.y / 2,
        
        leftB = posB.x - sizeB.x / 2,
        rightB = posB.x + sizeB.x / 2,
        bottomB = posB.y - sizeB.y / 2,
        topB = posB.y + sizeB.y / 2;
    
    return !(leftA > rightB || leftB > rightA || bottomA > topB || bottomB > topA);
};

exports.RectCollisionComponent = RectCollisionComponent;