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

var BackgroundGraphicsComponent = function (entity) {
	this.entity = entity;
	this.canvas = document.getElementById('canvas');
};

BackgroundGraphicsComponent.prototype.draw = function (context) {

	var physics = this.entity.components.physics;
	var backgroundImg = this.entity.components.backgroundImg;

	var aspectRatio = this.canvas.width / this.canvas.height;

	context.save();

	if ((physics.position.x + aspectRatio) <= -(aspectRatio / 2)) {
		physics.position.x += aspectRatio * 2;
	}

	context.translate(-aspectRatio, 0);
	context.drawImage(
		backgroundImg, physics.position.x, 0, aspectRatio, 1);
	context.drawImage(
		backgroundImg, physics.position.x + aspectRatio * 2, 0, aspectRatio, 1);
	context.translate(aspectRatio, 0);
	context.scale(-1, 1);
	context.drawImage(
		backgroundImg, -(aspectRatio + physics.position.x), 0, aspectRatio, 1);

	context.restore();
};

exports.BackgroundGraphicsComponent = BackgroundGraphicsComponent;
},{"../../settings":20}],4:[function(require,module,exports){
var settings = require('../../settings');

var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    var position = this.entity.components.physics.position;
    var birdImg = this.entity.components.birdImg;

    context.save();
    context.translate(position.x, position.y);
    context.scale(1, -1); // flips bird right side up
    context.drawImage(
    	// img to draw
    	birdImg, 
    	// img dimensions
    	50, 50, -50, -50,
    	// canvas placement
    	-0.02, -0.02, 
    	// img dimensions on canvas
    	0.05, 0.05);
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;
},{"../../settings":20}],5:[function(require,module,exports){
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
    context.fillStyle = '#aaaaaa';
    context.fill();
    context.closePath();
    context.restore();
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;
},{}],6:[function(require,module,exports){
var ScoreGraphicsComponent = function (entity, size) {
	this.entity = entity;	
	this.size = size;
};

ScoreGraphicsComponent.prototype.draw = function (context) {
	var position = this.entity.components.physics.position;

	context.save();
	context.translate(position.x, position.y);
	context.fillStyle = "rgba(0, 0, 0, 0)";
	context.beginPath();
	context.rect(-this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y);
	context.fill();
	context.closePath();
	context.restore();
};

exports.ScoreGraphicsComponent = ScoreGraphicsComponent;
},{}],7:[function(require,module,exports){

var ShuttleGraphicsComponent = function (entity) {
	this.entity = entity;
	this.canvas = document.getElementById('canvas');
};

ShuttleGraphicsComponent.prototype.draw = function (context) {
	var physics = this.entity.components.physics;
	var shuttleImage = this.entity.components.shuttleImage;

	context.save();

	context.scale(1, -1);
	context.drawImage(
		shuttleImage, physics.position.x, -physics.position.y, 0.1, 0.05);

	context.restore();
};

exports.ShuttleGraphicsComponent = ShuttleGraphicsComponent;
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/background');

var settings = require('../settings');

var Background = function () {

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = 0;
	physics.position.y = 1;
	physics.velocity.x = -0.02;

	var graphics = new graphicsComponent.BackgroundGraphicsComponent(this);

	var backgroundImg = new Image();
	backgroundImg.src = settings.backgroundImg;

	this.components = {
		physics: physics,
		graphics: graphics,
		backgroundImg: backgroundImg
	};
};

exports.Background = Background;
},{"../components/graphics/background":3,"../components/physics/physics":8,"../settings":20}],10:[function(require,module,exports){
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
    
    var birdImg = document.createElement('img');
    birdImg.src = settings.spaceBirdImage;

    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision,
        birdImg: birdImg
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
},{"../components/collision/circle":1,"../components/graphics/bird":4,"../components/physics/physics":8,"../settings":20,"./score":15}],11:[function(require,module,exports){
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
	physics.position.y = -0.05; // just below the canvas's bottom edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

exports.BottomEdge = BottomEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../settings":20}],12:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');

var settings = require('../settings');

var pipe = require('./pipe');
var score = require('./score');

var LeftEdge = function () {
	this.dimens = {
		x: 0.001,
		y: document.getElementById('canvas').height   
	};

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -(aspectRatio / 2) - 0.1;
	physics.position.y = 0.001;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	}
};

exports.LeftEdge = LeftEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../settings":20,"./pipe":13,"./score":15}],13:[function(require,module,exports){
var graphicsComponent = require('../components/graphics/pipe');
var physicsComponent  = require('../components/physics/physics');
var collisionComponent = require("../components/collision/rect");
var settings = require("../settings");

var Pipe = function (pos, size) {
    var physics = new physicsComponent.PhysicsComponent(this);    
    var graphics = new graphicsComponent.PipeGraphicsComponent(this, size);   
    
    var collision = new collisionComponent.RectCollisionComponent(this, size);
    
    physics.position = pos;
    physics.velocity.x = -0.4;
    
    this.components = {
        physics: physics,
        graphics: graphics,
        collision: collision
    };
};

exports.Pipe = Pipe;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../settings":20}],14:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/pipe');

var settings = require('../settings');

var RightEdge = function () {
	this.dimens = {
		x: 0.1,
		y: document.getElementById('canvas').height
	};

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = aspectRatio / 2 + 0.5;
	physics.position.y = 0;

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	}
};

exports.RightEdge = RightEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../settings":20}],15:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var collisionComponent = require('../components/collision/rect');
var graphicsComponent = require('../components/graphics/score');

var settings = require('../settings');

var shuttle = require('./shuttle');
var bird = require('./bird');

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
	if (this.scored || entity instanceof shuttle.Shuttle) {
		return;
	}
	
	this.scored = true;

	if (entity instanceof bird.Bird) {
		app.entities.push(new shuttle.Shuttle());	
	}
	
	app.score.updateScore();
};

exports.Score = Score;
},{"../components/collision/rect":2,"../components/graphics/score":6,"../components/physics/physics":8,"../settings":20,"./bird":10,"./shuttle":16}],16:[function(require,module,exports){
var physicsComponent = require('../components/physics/physics');
var graphicsComponent = require('../components/graphics/shuttle');
var collisionComponent = require('../components/collision/circle');

var settings = require('../settings');

var Shuttle = function () {
	var shuttleImage = new Image();
	shuttleImage.src = settings.shuttleImage;

	var canvas = document.getElementById('canvas');
	var aspectRatio = canvas.width / canvas.height;

	var physics = new physicsComponent.PhysicsComponent(this);
	physics.position.x = -(aspectRatio / 2) - 0.1;
	physics.position.y = getRandom(0.2, 0.9);
	physics.velocity.x = 0.8;
	physics.velocity.y = getRandom(0.15, 0.35);

	if (physics.position.y > 0.7) {
		physics.velocity.y = -physics.velocity.y;
	}

	physics.acceleration.y = getRandom(-0.04, -0.12);

	var graphics = new graphicsComponent.ShuttleGraphicsComponent(this);

	var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);

	this.components = {
		physics: physics,
		graphics: graphics,
		collision: collision,
		shuttleImage: shuttleImage
	};
};

var getRandom = function (min, max) {
	return Math.random() * (max - min) + min;
};

exports.Shuttle = Shuttle;
},{"../components/collision/circle":1,"../components/graphics/shuttle":7,"../components/physics/physics":8,"../settings":20}],17:[function(require,module,exports){
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
	physics.position.y = 1.05;  // just above the canvas's top edge

	var graphics = new graphicsComponent.PipeGraphicsComponent(this, this.dimens);
	var collision = new collisionComponent.RectCollisionComponent(this, this.dimens);

	this.components = {
		physics: physics,
		collision: collision,
		graphics: graphics
	};
};

exports.TopEdge = TopEdge;
},{"../components/collision/rect":2,"../components/graphics/pipe":5,"../components/physics/physics":8,"../settings":20}],18:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var physicsSystem = require('./systems/physics');
var inputSystem = require('./systems/input');
var pipeSystem = require('./systems/pipe');
var scoringSystem = require('./systems/scoring');

var bird = require('./entities/bird');
var topedge = require('./entities/topedge');
var bottomedge = require('./entities/bottomedge');
var leftedge = require('./entities/leftedge');
var rightedge = require('./entities/rightedge');
var background = require('./entities/background');
var shuttle = require('./entities/shuttle');

var settings = require('./settings');

var FlappyBird = function () {
	this.bird = new bird.Bird();
    this.entities = [
    	new background.Background(), 
    	new topedge.TopEdge(), 
    	new bottomedge.BottomEdge(),
    	new leftedge.LeftEdge(),
    	new rightedge.RightEdge(),
    	this.bird];
    this.entities.bird = this.bird;
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
	this.entities.splice(6, this.entities.length - 6);

	var bird = this.entities.bird;
	bird.components.physics.position = {
		x: settings.birdStartPos.x,
        y: settings.birdStartPos.y
	};
	bird.components.physics.velocity.y = 0;

	this.score.resetScore();
};

exports.FlappyBird = FlappyBird;
},{"./entities/background":9,"./entities/bird":10,"./entities/bottomedge":11,"./entities/leftedge":12,"./entities/rightedge":14,"./entities/shuttle":16,"./entities/topedge":17,"./settings":20,"./systems/graphics":23,"./systems/input":24,"./systems/physics":25,"./systems/pipe":26,"./systems/scoring":27}],19:[function(require,module,exports){
var flappyBird = require('./flappybird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    window.app = app;
    app.run();
});
},{"./flappybird":18}],20:[function(require,module,exports){
/* 
    Using a settings.js file to store common property 
    values throughoutthe application.
*/
exports.pipeWidth = 0.15;   	// rectangular width of the pipes to be the same
exports.pipeGap = ((location.hash == '#cheat') ? 0.7 : 0.225); 	// distance between the pipes
exports.birdWidth = 0.02;		// width of the bird object
exports.birdStartPos = {		// starting position of the bird
	x: 0,
	y: 0.6
};		
exports.gravity = -2;			// rate of gravity -- how fast bird falls

exports.slowmo = (location.hash == '#cheat' ? 3 : 1);

exports.collisionAudio = new Audio('assets/audio/collision.mp3');
exports.scoreAudio = new Audio('assets/audio/point.mp3');
exports.flapping = new Audio('assets/audio/jump.mp3');

exports.spaceBirdImage = 'assets/images/Blue_Space_Bird.gif';
exports.backgroundImg = 'assets/images/space_background.jpg';
exports.shuttleImage = 'assets/images/spaceship.png';
},{}],21:[function(require,module,exports){
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
},{"../entities/bottomedge":11,"../entities/leftedge":12,"../entities/pipe":13,"../entities/rightedge":14,"../entities/score":15,"../entities/shuttle":16,"../entities/topedge":17,"../settings":20}],22:[function(require,module,exports){
var CollisionSystem = function (entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!('collision' in entityA.components)) {
            continue;
        }
        
        for (var j = i + 1; j < this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!('collision' in entityB.components)) {
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
},{}],23:[function(require,module,exports){
var settings = require('../settings');

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

    // draw each entities if it has a graphics component
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
        this.context.fillStyle = 'rgba(100, 100, 100, 0.3)';
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fill();
        this.context.fillStyle = "#aaaaaa";
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
},{"../settings":20}],24:[function(require,module,exports){
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
    var bird = this.entities.bird;
    settings.flapping.volume = 0.1;
    settings.flapping.play();
    bird.components.physics.velocity.y = 0.7;
};

exports.InputSystem = InputSystem;
},{"../settings":20}],25:[function(require,module,exports){
var settings = require('../settings');

var collisionSystem = require('./collision');
var collectorSystem = require('./collector');

var PhysicsSystem = function (entities) {
    this.entities = entities;
    this.collisionSystem = new collisionSystem.CollisionSystem(entities);
    this.collectorSystem = new collectorSystem.CollectorSystem(entities);
    this.previousRun;
    this.paused = false;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function () {
    var timestamp = performance.now();
    
    var delta = (timestamp - this.previousRun) / 1000;

    delta = delta / settings.slowmo;

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
        this.collectorSystem.tick();
    }

};

exports.PhysicsSystem = PhysicsSystem;
},{"../settings":20,"./collector":21,"./collision":22}],26:[function(require,module,exports){
var pipe = require('../entities/pipe');
var score = require('../entities/score');
var shuttle = require('../entities/shuttle');

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
        x: settings.pipeWidth / 2 + initialX + settings.birdWidth * 2,
        y: gapPosition
    };

    var scoreSize = {
        x: 0.001,
        y: settings.pipeGap * 2
    };

    this.entities.push(new score.Score(scorePos, scoreSize));

};

exports.PipeSystem = PipeSystem;
},{"../entities/pipe":13,"../entities/score":15,"../entities/shuttle":16,"../settings":20}],27:[function(require,module,exports){
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
},{}]},{},[19]);
