var InputSystem = function (entities) {
    this.entities = entities;
    this.paused = false;
    // Canvas is where we get input from
    this.canvas = document.getElementById('canvas');
};

InputSystem.prototype.run = function () {
    this.canvas.addEventListener('click', this.onClick.bind(this));
};

InputSystem.prototype.onClick = function () {
	if (this.paused) {
		window.app.pause();
	}
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;