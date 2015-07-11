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

ScoringSystem.prototype.updateHighScoreView = function () {
	this.highScoreElem.innerText = this.highScore;
};

exports.ScoringSystem = ScoringSystem;