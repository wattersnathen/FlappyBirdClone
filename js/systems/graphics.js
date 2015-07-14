var settings = require('../settings');

var GraphicsSystem = function (entities) {
    this.entities = entities;
    
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    var background = new Image();
    background.src = settings.backgroundImg;

    this.background = background;

    this.paused = false;

    this.scrollVal = 0;
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

    if (this.scrollVal >= this.canvas.width - 0.8) {
        this.scrollVal = 0;
    }

    this.scrollVal += 0.8;

    this.context.drawImage(this.background, -this.scrollVal, 0, this.background.width, this.background.height);
    this.context.drawImage(this.background, this.canvas.width - this.scrollVal, 0, this.background.width, this.background.height);

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

    if (this.paused) {
        this.context.save();
        this.context.fillStyle = 'rgba(0, 0, 0, 0.3)';
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fill();
        this.context.fillStyle = "#FFFFFF";
        this.context.font = "48px sans-serif";
        this.context.textAlign = "center";
        this.context.fillText(this.pauseReason, 
            this.canvas.width / 2, 
            this.canvas.height / 2);
        this.context.restore();
    }

    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;