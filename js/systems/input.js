var settings = require('../settings');

var InputSystem = function (entities) {
    this.entities = entities;
    this.paused = false;
    // Canvas is where we get input from
    this.canvas = document.getElementById('canvas');
};

InputSystem.prototype.run = function () {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    window.addEventListener('keypress', this.keyPressed.bind(this));
};

InputSystem.prototype.keyPressed = function (e) {
	switch(e.keyCode) {
		case 32: // spacebar
			window.app.pause();
	}
};

InputSystem.prototype.onClick = function () {
	if (this.paused) {
		window.app.pause();
	}
    var bird = this.entities[0];
    settings.flapping.volume = 0.1;
    settings.flapping.play();
    bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;