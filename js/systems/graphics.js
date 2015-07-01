var GraphicsSystem = function (entities) {
    this.entities = entities;
    
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.paused = false;
};

GraphicsSystem.prototype.run = function () {
    // run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function () {
    
    if (this.canvas.width !== this.canvas.offsetWidth ||
            this.canvas.height !== this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    // clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);
    
    for (var idx = 0; idx < this.entities.length; idx++) {
        var entity = this.entities[idx];
        
        if (!('graphics' in entity.components)) {
            continue;
        }
        
        entity.components.graphics.draw(this.context);
    }
    this.context.restore();
    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;