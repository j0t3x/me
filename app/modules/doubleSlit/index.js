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
	this.scaleFactorX = 90000;
	this.scaleFactorY = 15;

	this.nmToM = Math.pow( 10, -9 );
	this.mmToM = Math.pow( 10, -3 );

	this.xMaxes = 6;
	this.distancesToXMax = [];

	this.particleNum = 6000;
	this.particles = [];

}

doubleSlit.prototype.init = function(){

	this.setProblemVars();
	for (var i = 0; i < this.xMaxes; i++) {
		this.distancesToXMax[i] = this.calculateMaxDistanceFromCenterMax( i );
	}

	for (var i = 0; i < this.particleNum; i++) {
		this.createParticle();
	}

	for (var i = 0; i < this.particles.length; i++) {
		this.drawCircleInXMax( this.particles[i] );
	}

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
	this.ctx.fill();

};

doubleSlit.prototype.createParticle = function(){

	var p = new particle();

	var randomCenterMax = Math.round( Math.random() * this.xMaxes ); 

	p.x = 
		( this.centerOfScreenX ) + 
		( this.distancesToXMax[ randomCenterMax ] * this.randomPositiveOrNegative() * this.scaleFactorX ) + 
		( this.randomPositiveOrNegative() * ( ( this.xMaxes - randomCenterMax ) * Math.random() ) * 2 );

	p.y = 
		( this.centerOfScreenY ) + 
		( Math.random() * 20 * this.randomPositiveOrNegative() ) * 
		this.scaleFactorY;

	p.radius = 2;
	p.color = "hsla(" + ( 360 / this.xMaxes) * randomCenterMax + ", 100%, 50%, 0.5)";

	this.particles.push( p );

};

doubleSlit.prototype.randomPositiveOrNegative = function(){

	return ( Math.random() <= 0.5 )? 1 : -1;

};

doubleSlit.prototype.clearCanvas = function(){

	this.ctx.clearRect(0, 0, this.width, this.height);

};



module.exports = doubleSlit;