var ScoringSystem = function () {
	this.currentScore = 0;
	localStorage.setItem('highScore', 0);
	this.scoreElem = document.getElementById('score');
	this.highScoreElem = document.getElementById('highScore');
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
	if (this.currentScore > localStorage.getItem('highScore')) {
		localStorage.setItem('highScore', this.currentScore);
		this.highScoreElem.innerText = this.currentScore;
	}
};

exports.ScoringSystem = ScoringSystem;