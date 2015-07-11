(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
var settings = require('../../settings');

var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    
    context.arc(0, 0, settings.birdWidth, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{"../../settings":14}],4:[function(require,module,exports){
var PipeGraphicsComponent = function (entity, size) {
    this.entity = entity;
    this.size = size;
};

PipeGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;
    
    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
    context.fill();
    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],5:[function(require,module,exports){
var ScoreGraphicsComponent = function (entity, size) {
	this.entity = entity;	
	this.size = size;
};

ScoreGraphicsComponent.prototype.draw = function (context) {
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.fillStyle = "#FF00FF";
	context.beginPath();
	context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
	context.fill();
	context.closePath();
	context.restore();
};

exports.ScoreGraphicsComponent = ScoreGraphicsComponent;
},{}],6:[function(require,module,exports){
var PhysicsComponent = function (entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function (delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

exports.PhysicsComponent = PhysicsComponent;
},{}],7:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/bird');
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require("../components/collision/circle");
var score = require('./score');

var settings = require("../settings");

var Bird = function () {
    var physics = new physicsComponent.PhysicsComponent(this);
    physics.position.y = settings.birdStartPos.y;
    physics.acceleration.y = settings.gravity;
    
    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);
    collision.onCollision = this.onCollision.bind(this);
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Bird.prototype.onCollision = function (entity) {

    if (entity instanceof score.Score) {
        settings.scoreAudio.play();
        return;
    }
    settings.collisionAudio.play();
    window.app.pause("You're dead", (function () {

        window.app.resetGame();
    }).bind(this));
};

exports.Bird = Bird;
},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":6,"../settings":14,"./score":10}],8:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');
var settings = require('../settings');

var BottomEdge = function () {
	this.dimens = {
		x: settings.birdWidth * 2,	// only need a small width since bird is centered
		y: 0.01						// very thin
	};	

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0; 	// bird is always centered on canvas
	physics.position.y = -0.005; // just below the canvas's bottom edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

BottomEdge.prototype.onCollision = function (entity) {
	//console.log('Edge collided with entity: ', entity);
};

exports.BottomEdge = BottomEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6,"../settings":14}],9:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Pipe = function (pos, size) {
    var physics = new physicsComponent.PhysicsComponent(this);    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);   
    
    var collision = new collisionComponent.RectCollisionComponent(this, size);
    collision.onCollision = this.onCollision.bind(this);
    
    physics.position = pos;
    physics.velocity.x = -0.4;
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

Pipe.prototype.onCollision = function (entity) {
    // console.log('Pipe collided with entity: ', entity);
};

exports.Pipe = Pipe;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6,"../settings":14}],10:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/score');

var bird = require('./bird');

var settings = require('../settings');

var Score = function (pos, size) {
	this.scored = false;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position = pos;
	physics.velocity.x = -0.4;

	var graphics = new graphicsComponent.ScoreGraphicsComponent(this, size);
	var collision = new collisionComponent.RectCollisionComponent(this, size);
	collision.onCollision = this.onCollision.bind(this);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision
	};
};

Score.prototype.onCollision = function (entity) {
	if (this.scored) {
		return;
	}
	this.scored = true;
	app.score.updateScore();
};

exports.Score = Score;
},{"../components/collision/rect":2,"../components/graphics/score":5,"../components/physics/physics":6,"../settings":14,"./bird":7}],11:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');
var settings = require('../settings');

var TopEdge = function () {
	this.dimens = {
		x: settings.birdWidth * 2,	// only need a small width since bird is centered
		y: 0.01						// very thin
	};	

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0; 	// bird is always centered on canvas
	physics.position.y = 1.005;  // just above the canvas's top edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

TopEdge.prototype.onCollision = function (entity) {
//	console.log('Edge collided with entity: ', entity);
};

exports.TopEdge = TopEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":6,"../settings":14}],12:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');
var scoringSystem = require('./systems/scoring');

var bird = require('./entities/bird');
var topedge = require('./entities/topedge');
var bottomedge = require('./entities/bottomedge');

var settings = require('./settings');

var FlappyBird = function () {
    this.entities = [new bird.Bird(), new topedge.TopEdge(), new bottomedge.BottomEdge()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    this.physics = new physicsSystem.PhysicsSystem(this.entities);
    this.input = new inputSystem.InputSystem(this.entities);
    this.pipes = new pipeSystem.PipeSystem(this.entities);
    this.score = new scoringSystem.ScoringSystem();

    this.paused = false;
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
    this.physics.run();
    this.input.run();
    this.pause('Click to start Playing');
    this.pipes.run();
};

FlappyBird.prototype.pause = function (reason, nextCall) {
	if (this.onUnpause) {
		this.onUnpause();
	}
	this.onUnpause = nextCall;
	this.paused = !this.paused;
	this.graphics.paused = this.paused;
	this.physics.paused = this.paused;
	this.input.paused = this.paused;
	this.pipes.paused = this.paused;

	this.graphics.pauseReason = reason || 'PAUSED';
};

FlappyBird.prototype.resetGame = function () {
	this.entities.splice(3, this.entities.length - 3);

	var bird = this.entities[0];
	bird.components.physics.position = {
		x: settings.birdStartPos.x,
        y: settings.birdStartPos.y
	};
	bird.components.physics.velocity.y = 0;

	this.score.resetScore();
};

exports.FlappyBird = FlappyBird;
},{"./entities/bird":7,"./entities/bottomedge":8,"./entities/topedge":11,"./settings":14,"./systems/graphics":16,"./systems/input":17,"./systems/physics":18,"./systems/pipe":19,"./systems/scoring":20}],13:[function(require,module,exports){
var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    window.app = app;
    app.run();
});
},{"./flappybird":12}],14:[function(require,module,exports){
/* 
    Using a settings.js file to store common property 
    values throughoutthe application.
*/
exports.pipeWidth = 0.15;   	// rectangular width of the pipes to be the same
exports.pipeGap = 0.2;      	// distance between the pipes
exports.birdWidth = 0.02;		// width of the bird object
exports.birdStartPos = {		// starting position of the bird
	x: 0,
	y: 0.6
};		
exports.gravity = -2;			// rate of gravity -- how fast bird falls

exports.collisionAudio = new Audio('assets/audio/collision.mp3');
exports.scoreAudio = new Audio('assets/audio/point.mp3');
exports.flapping = new Audio('assets/audio/jump.mp3');
},{}],15:[function(require,module,exports){
var score = require('../entities/score');

var CollisionSystem = function (entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }
        
        for (var j = i + 1; j < this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
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
},{"../entities/score":10}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
    bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;
},{}],18:[function(require,module,exports){
var collisionSystem = require('./collision');

var PhysicsSystem = function (entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.previousRun;
    this.paused = false;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 /60);
};

PhysicsSystem.prototype.tick = function () {
    var timestamp = performance.now();
    
    var delta = (timestamp - this.previousRun) / 1000;

    this.previousRun = timestamp;
    
    if (isNaN(delta)) {
        return;
    }

    if (!this.paused) {
        for (var i=0; i<this.entities.length; i++) {
            var entity = this.entities[i];
            if (!('physics' in entity.components)) {
                continue;
            }

            entity.components.physics.update(delta);
        }
        
        this.collisionSystem.tick();
    }

};

exports.PhysicsSystem = PhysicsSystem;
},{"./collision":15}],19:[function(require,module,exports){
var pipe = require('../entities/pipe');
var score = require('../entities/score');

var settings = require('../settings');

var PipeSystem = function (entities) {
    this.entities = entities;
    this.canvas = document.getElementById('canvas');
    this.interval = 0;
    this.paused = false;
};

PipeSystem.prototype.run = function () {
    this.interval = window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function () {
    
    if (this.paused) {
        return;
    }

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

    // add score entity next to pipes
    var scorePos = {
        x: (initialX + settings.pipeWidth) + settings.birdWidth,
        y: gapPosition
    };

    var scoreSize = {
        x: 0.001,
        y: settings.pipeGap * 2
    };

    this.entities.push(new score.Score(scorePos, scoreSize));

    for (var i = 0; i < this.entities.length; i++) {
        if ((this.entities[i] instanceof pipe.Pipe || this.entities[i] instanceof score.Score)
            && this.entities[i].components.physics.position.x < -initialX) {
            this.entities.splice(i, 1);
            i--;
        }
    }
};

exports.PipeSystem = PipeSystem;
},{"../entities/pipe":9,"../entities/score":10,"../settings":14}],20:[function(require,module,exports){
var ScoringSystem = function () {
	this.currentScore = 0;
	this.highScore = localStorage.getItem('highScore');
	this.scoreElem = document.getElementById('score');
	this.highScoreElem = document.getElementById('highScore');
	this.updateHighScoreView();
};

ScoringSystem.prototype.resetScore = function () {
	this.currentScore = 0;
	this.scoreElem.innerText = this.currentScore;
};

ScoringSystem.prototype.updateScore = function () {
	this.currentScore = this.currentScore + 1;
	this.scoreElem.innerText = this.currentScore;
	this.setHighScore();
};

ScoringSystem.prototype.setHighScore = function () {
	if (this.currentScore > this.highScore) {
		this.highScore = this.currentScore;
		localStorage.setItem('highScore', this.highScore);
		this.updateHighScoreView();
	}
};

ScoringSystem.prototype.resetHighScore = function () {
	this.highScore = 0;
	localStorage.setItem('highScore', this.highScore);
	this.updateHighScoreView();
};

ScoringSystem.prototype.updateHighScoreView = function () {
	this.highScoreElem.innerText = this.highScore;
};

exports.ScoringSystem = ScoringSystem;
},{}]},{},[13]);
