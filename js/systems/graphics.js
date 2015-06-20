var GraphicsSystem = function (entities) {
    this.entities = entities;
};

GraphicsSystem.prototype.run = function () {
    for (var idx = 0; idx < 5; idx++) {
        this.tick();
    }
};

GraphicsSystem.prototype.tick = function () {
    for (var idx = 0; idx < this.entities.length; idx++) {
        var entity = this.entities[idx];
        
        if (!'graphics' in entity.components) {
            continue;
        }
        
        entity.components.graphics.draw(this.context);
    }
};

exports.GraphicsSystem = GraphicsSystem;