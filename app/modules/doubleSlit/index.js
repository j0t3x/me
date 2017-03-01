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
	this.scaleFactorRadius = 1;

	this.nmToM = Math.pow( 10, -9 );
	this.mmToM = Math.pow( 10, -3 );

	this.xMaxes = 4;
	this.distancesToXMax = [];

	this.particleNum = 1000;
	this.particles = [];
	this.particlesWithChangesToBeDone = [];

	//animation values
	this.WANTED_FPS = 24;
	this.WANTED_FRAME_TIME = 1000 / this.WANTED_FPS;
	this.CURRENT_FRAME_COUNT = 0;
	this.last_render = 0;
	this.stop_anim = false;
	this.delta = 0;
	this.now = 0;

	this.MAX_OPACITY = 0.4;
	this.gradient;

	this.gradient0 = { r: 103, g: 58, b: 183 };
	this.gradient1 = { r: 0, g: 0, b: 0 };

	this.gradientf0 = { r: 255, g: 207, b: 160 };
	this.gradientf1 = { r: 234, g: 92, b: 68 };

	this.fg0 = { r: 153, g: 158, b: 23 };
	this.fg1 = { r: 0, g: 0, b: 0 };

	this.totalGradSteps = 60;
	this.seed = 0;
}

doubleSlit.prototype.init = function(){

	this.setProblemVars();

	window.addEventListener( 'resize', this.onResizeWindow.bind(this) );
	for (var i = 0; i < this.xMaxes; i++) {
		this.distancesToXMax[i] = this.calculateMaxDistanceFromCenterMax( i );
	}

	for (var i = 0; i < this.particleNum; i++) {
		this.createParticle( this.MAX_OPACITY );
	}

	this.setGradient();

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

	this.ctx.save();
	this.ctx.beginPath();
	this.ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
	this.ctx.fillStyle = p.color;
	this.ctx.strokeStyle = p.border;
	this.ctx.lineWidth = 6;
	this.ctx.globalAlpha = p.opacity;
	this.ctx.fill();
	this.ctx.stroke();
	this.ctx.restore();

};

doubleSlit.prototype.createParticle = function( opacity ){

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

	p.radius = 2 * this.scaleFactorRadius;
	p.color = "snow";
	p.border = "#ff1744";
	p.opacity = ( opacity )? opacity : 0;

	if( opacity )
		this.particles.push( p );
	else
		this.particlesWithChangesToBeDone.push( p );

};

doubleSlit.prototype.updateParticle = function( p ){

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

	p.radius = 2 * this.scaleFactorRadius;

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

	//console.log( this.WANTED_FRAME_TIME )

	this.now = Date.now();

	var delta = 0;
	var lostTime = 0;

	if( time !== 0 ){
		delta = this.now - this.last_render;
		//console.log( delta )
		if( delta >= this.WANTED_FRAME_TIME ){
			this.render( delta );
			this.changeParticleOpacity( delta );
			this.calculateNextColorStepForGradient( delta );
			this.last_render = this.now; //+ ( delta - this.WANTED_FRAME_TIME );
		}
	}else{
		this.last_render = this.now;
	}

	if( !this.stop_anim )
		requestAnimationFrame(this.update.bind(this));
};

doubleSlit.prototype.render = function( delta ){

	this.clearCanvas();
	this.drawBackground();

	for (var i = 0; i < 20; i++) {
		this.createParticle();
		this.removeParticle();
	}

	for (var i = 0; i < this.particles.length; i++) {
		this.drawCircleInXMax( this.particles[i] );
	}

	for (var i = 0; i < this.particlesWithChangesToBeDone.length; i++) {
		this.drawCircleInXMax( this.particlesWithChangesToBeDone[i] );
	}

	this.drawProjectVersion();

};

doubleSlit.prototype.drawBackground = function( delta ){

	this.ctx.fillStyle = this.gradient;
	this.ctx.fillRect( 0, 0, this.width, this.height );

};

doubleSlit.prototype.changeParticleOpacity = function( delta ){

	for (var i = 0; i < this.particlesWithChangesToBeDone.length; i++) {

		if( this.particlesWithChangesToBeDone[i].opacity < this.MAX_OPACITY ){
			this.particlesWithChangesToBeDone[i].opacity += ( 0.01 );
		}else{
			var particleToMove = this.particlesWithChangesToBeDone.splice( i, 1 );
			this.particles.push( particleToMove[0] );
			i--;
		}
	}

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

doubleSlit.prototype.setGradient = function(){

	this.gradient = this.ctx.createLinearGradient( 0, 0, this.width, this.height );
	this.gradient.addColorStop( 0, "rgb( " + Math.round( this.fg0.r ) + ", " + Math.round( this.fg0.g ) + ", " + Math.round( this.fg0.b ) + " )" );
	this.gradient.addColorStop( 1, "rgb( " + Math.round( this.fg1.r ) + ", " + Math.round( this.fg1.g ) + ", " + Math.round( this.fg1.b ) + " )" );
	//this.gradient.addColorStop( 0, "rgb( 103, 58, 183 )" );
	//this.gradient.addColorStop( 1, "rgb( 33, 33, 33 )" );
	//console.log( this.fg0, this.fg1 )

};

doubleSlit.prototype.calculateNextColorStepForGradient = function( delta ){

	if( delta > 1000 )
		return;

	this.seed += delta/10000;

	this.fg0.r = Math.sin( this.seed ) * Math.abs( this.gradient0.r - this.gradientf0.r );
	this.fg0.g = Math.cos( this.seed ) * Math.abs( this.gradient0.g - this.gradientf0.g );
	this.fg0.b = Math.sin( this.seed ) * Math.abs( this.gradient0.b - this.gradientf0.b );

	this.fg1.r = Math.cos( this.seed ) * Math.abs( this.gradient1.r - this.gradientf1.r );
	this.fg1.g = Math.sin( this.seed ) * Math.abs( this.gradient1.g - this.gradientf1.g );
	this.fg1.b = Math.cos( this.seed ) * Math.abs( this.gradient1.b - this.gradientf1.b );

	this.setGradient();



	//console.log( this.fg0, this.fg1 )
};
doubleSlit.prototype.onResizeWindow = function(){

	this.ctx.canvas.width  = this.width = window.innerWidth;
  	this.ctx.canvas.height = this.height = window.innerHeight;

	this.centerOfScreenX = this.width / 2;
	this.centerOfScreenY = this.height / 2;

  	var percX = this.ctx.canvas.width / 1103;
  	var percY = this.ctx.canvas.height / 1093;

  	this.scaleFactorX = 190000 * percX;
	this.scaleFactorY = 18 * percY;
	this.scaleFactorRadius = percX;
	//console.log( this.scaleFactorRadius )

	this.setGradient();

	for (var i = 0; i < this.particles.length; i++) {
		this.updateParticle( this.particles[i] );
	}

	for (var i = 0; i < this.particlesWithChangesToBeDone.length; i++) {
		this.updateParticle( this.particlesWithChangesToBeDone[i] );
	}

};

doubleSlit.prototype.drawProjectVersion = function(){

	this.ctx.save();
	this.ctx.font = "11px serif";
	this.ctx.strokeStyle = 'white';
	this.ctx.globalAlpha = 0.3;
	this.ctx.strokeText("1.1", this.width - 25, this.height - 10);
	this.ctx.restore();

};


module.exports = doubleSlit;
