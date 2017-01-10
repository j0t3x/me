var particle = require('./particle.js');

var doubleSlit = function( canvas ){

	this.ctx = canvas.getContext("2d");
	
	this.ctx.canvas.width  = window.innerWidth;
  	this.ctx.canvas.height = window.innerHeight;

	this.width = canvas.width;
	this.height = canvas.height;
	this.centerOfScreenX = this.width / 2;
	this.centerOfScreenY = this.height / 2;

	//experiment variables
	this.d;//distance between slits
	this.L;//distance from the slits to the wall
	this.lambda;//wave length, which we can play with in the future to generate different colors of light

	//bright spots
	this.centerMax = 0;
	this.maxXlambda = 1;
	this.scaleFactorX = 190000;
	this.scaleFactorY = 18;

	this.nmToM = Math.pow( 10, -9 );
	this.mmToM = Math.pow( 10, -3 );

	this.xMaxes = 4;
	this.distancesToXMax = [];

	this.particleNum = 4000;
	this.particles = [];

	//animation values
	this.WANTED_FPS = 60;
	this.WANTED_FRAME_TIME = 1000 / this.WANTED_FPS;
	this.CURRENT_FRAME_COUNT = 0;
	this.last_time = 0;
	this.stop_anim = false;
	this.delta = 0;
	this.now = 0;

}

doubleSlit.prototype.init = function(){

	this.setProblemVars();
	for (var i = 0; i < this.xMaxes; i++) {
		this.distancesToXMax[i] = this.calculateMaxDistanceFromCenterMax( i );
	}

	for (var i = 0; i < this.particleNum; i++) {
		this.createParticle();
	}

	this.update( 0 );

};

doubleSlit.prototype.setProblemVars = function(){

	this.lambda = 600 * this.nmToM; //nm
	this.d = 1.5 * this.mmToM; //mm
	this.L = 2;//m


};

doubleSlit.prototype.calculateMaxDistanceFromCenterMax = function( max ){

	var centerOfXMax = 0;

	centerOfXMax = ( max * this.lambda * this.L ) / this.d;

	return centerOfXMax;

};

doubleSlit.prototype.drawCircleInXMax = function( p ){

	this.ctx.beginPath();
	this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
	this.ctx.fillStyle = p.color;
	this.ctx.strokeStyle = p.border;
	this.ctx.lineWidth = 8;
	this.ctx.globalAlpha = 0.3;
	this.ctx.fill();
	this.ctx.stroke();

};

doubleSlit.prototype.createParticle = function(){

	var p = new particle();

	var randomCenterMax = Math.round( this.randomGaussian() * this.xMaxes ); 
	randomCenterMax = ( randomCenterMax > this.xMaxes || randomCenterMax < 0 )? 0 : randomCenterMax; 

	p.x = 
		( this.centerOfScreenX ) + 
		( this.distancesToXMax[ randomCenterMax ] * this.randomPositiveOrNegative() * this.scaleFactorX ) + 
		( this.randomPositiveOrNegative() * ( ( this.xMaxes - randomCenterMax ) * this.randomGaussian() ) * 10 );

	p.y = 
		( this.centerOfScreenY ) + 
		( this.randomGaussian() * 10 * this.randomPositiveOrNegative() ) * 
		this.scaleFactorY;

	p.radius = 2;
	p.color = "snow";
	p.border = "orchid";

	this.particles.push( p );

};

doubleSlit.prototype.removeParticle = function(){

	this.particles.splice( 0, 1 );

};

doubleSlit.prototype.randomPositiveOrNegative = function(){

	return ( Math.random() <= 0.5 )? 1 : -1;

};

doubleSlit.prototype.clearCanvas = function(){

	this.ctx.clearRect(0, 0, this.width, this.height);

};

doubleSlit.prototype.update = function( time ){

	this.now = Date.now();
	if( this.last_time + time - this.now > this.WANTED_FRAME_TIME ){
		this.render();
	}
	this.last_time = this.now;
	if( !this.stop_anim )
		requestAnimationFrame(this.update.bind(this));
};

doubleSlit.prototype.render = function(){

	this.clearCanvas();
	this.createParticle();
	this.removeParticle();
	for (var i = 0; i < this.particles.length; i++) {
		this.drawCircleInXMax( this.particles[i] );
	}

};

doubleSlit.prototype.drawBackground = function(){



};


doubleSlit.prototype.randomGaussian = function( mean, standardDeviation ) {

	mean = ( mean ) ? mean : 0.0;
	standardDeviation = ( standardDeviation )? standardDeviation : 0.5;

	if (this.randomGaussian.nextGaussian !== undefined) {
		
		var nextGaussian = this.randomGaussian.nextGaussian;
		delete this.randomGaussian.nextGaussian;
		return (nextGaussian * standardDeviation) + mean;

	} else {
		var v1, v2, s, multiplier;
		
		do {
			v1 = Math.random(); // between -1 and 1
			v2 = Math.random(); // between -1 and 1
			s = v1 * v1 + v2 * v2;
		} while (s >= 1 || s == 0);
		
		multiplier = Math.sqrt(-2 * Math.log(s) / s);
		this.randomGaussian.nextGaussian = v2 * multiplier;
		return (v1 * multiplier * standardDeviation) + mean;
	}
 
};


module.exports = doubleSlit;