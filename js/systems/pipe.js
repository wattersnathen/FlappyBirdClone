var pipe = require('../entities/pipe');
var settings = require('../settings');

var PipeSystem = function (entities) {
    this.entities = entities;
    this.canvas = document.getElementById('canvas');
    this.interval = 0;
};

PipeSystem.prototype.run = function () {
    this.interval = window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function () {
    var canvasRight = 0.5 * this.canvas.width / this.canvas.height;
    var gapPosition = 0.4 + Math.random() * 0.2;

    var initialX = canvasRight + settings.pipeWidth / 2;

    var height = gapPosition - settings.pipeGap / 2;
    var position = {
        x: initialX,
        y: height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };

    this.entities.push(new pipe.Pipe(position, size));

    var height = 1 - gapPosition - settings.pipeGap / 2;
    var position = {
        x: initialX,
        y: 1 - height / 2
    };

    var size = {
        x: settings.pipeWidth,
        y: height
    };
    this.entities.push(new pipe.Pipe(position, size));
};

exports.PipeSystem = PipeSystem;