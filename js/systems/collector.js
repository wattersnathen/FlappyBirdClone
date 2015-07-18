var leftedge = require('../entities/leftedge');
var rightedge = require('../entities/rightedge');
var topedge = require('../entities/topedge');
var bottomedge = require('../entities/bottomedge');

var pipe = require('../entities/pipe');
var score = require('../entities/score');
var shuttle = require('../entities/shuttle');

var settings = require('../settings');

var CollectorSystem = function (entities) {
	this.entities = entities;
	this.paused = false;

	this.canvas = document.getElementById('canvas');
	this.canvasAspectRatio = this.canvas.width / this.canvas.height;
};

CollectorSystem.prototype.tick = function () {

	for (var idx = 0, len = this.entities.length; idx < len; idx++) {
		// reference to current entity
		var entity = this.entities[idx];

		// collect pipes and score objects
	    if ((entity instanceof pipe.Pipe || entity instanceof score.Score)
	        && entity.components.physics.position.x < -this.canvasAspectRatio / 2 - settings.pipeWidth) {
	        this.entities.splice(idx, 1);
	        idx--;
	    }

	    // collect shuttles
	    if (entity instanceof shuttle.Shuttle && ( 
	    	entity.components.physics.position.x > this.canvasAspectRatio / 2 + settings.pipeWidth||
	    	entity.components.physics.position.y > 1 ||
	    	entity.components.physics.position.y < 0)) {
	    	this.entities.splice(idx, 1);
	    	idx--;
	    }
	}	

};

exports.CollectorSystem = CollectorSystem;