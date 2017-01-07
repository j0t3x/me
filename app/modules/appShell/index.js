var Shape = require('../../shapes/Shape.js');
var styles = require('./index.css');

var appShell = function(){

	this.root;
	this.canvas;


}

appShell.prototype.init = function(){

	this.root = new Shape('div');
	this.root.setClass( styles.allrealstate );
	this.initContent();

};


appShell.prototype.initHeader = function(){

	

};

appShell.prototype.initContent = function(){

	this.canvas = new Shape('canvas');
	this.canvas.setClass( styles.canvasset );

	this.root.appendShape( this.canvas );

};

appShell.prototype.initFooter = function(){

};


module.exports = appShell;