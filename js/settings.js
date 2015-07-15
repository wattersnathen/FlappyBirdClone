/* 
    Using a settings.js file to store common property 
    values throughoutthe application.
*/
exports.pipeWidth = 0.15;   	// rectangular width of the pipes to be the same
exports.pipeGap = ((location.hash == '#cheat') ? 0.7 : 0.2); 	// distance between the pipes
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