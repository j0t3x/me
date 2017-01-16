var Shape = require('../../shapes/Shape.js');
var TextShape = require('../../shapes/TextShape.js');
var styles = require('./index.css');

var dynContent = function(){

	this.root;
	this.myName;
	this.myDescription;

};

dynContent.prototype.init = function() {
	// body...
	this.root = new Shape( 'div' );
	this.root.setClass( styles.contentFixed );
	this.createName();
};

dynContent.prototype.createName = function() {

	this.myName = new TextShape( 'h1' );
	this.myName.updateText('Jose. M. Palacios');
	this.myName.setClass( styles.name );

	var aka = new TextShape( 'span' );
	aka.updateText( 'a.k.a. Tex' );
	aka.setClass( styles.inline );

	this.myDescription = new TextShape( 'h2' );
	this.myDescription.updateText(' Engineer | Product Manager ');
	this.myDescription.setClass( styles.desc );


	var lToAbout = new TextShape( 'a' );
	lToAbout.updateText( 'about' );
	lToAbout.setClass( styles.lTo );
	lToAbout.setDomProp( 'href', '#' );

	var lToBlog = new TextShape( 'a' );
	lToBlog.updateText( 'blog' );
	lToBlog.setClass( styles.lTo );
	lToBlog.setDomProp( 'href', 'http://blog.t3x.me' );

	var lToGit = new TextShape( 'a' );
	lToGit.updateText( 'git' );
	lToGit.setClass( styles.lTo );
	lToGit.setDomProp( 'href', 'https://github.com/j0t3x' );

	var lToProjects = new TextShape( 'a' );
	lToProjects.updateText( 'projects' );
	lToProjects.setClass( styles.lTo );
	lToProjects.setDomProp( 'href', '#' );



	this.root.appendShape( this.myName );
	this.root.appendShape( aka );
	this.root.appendShape( this.myDescription );

	this.root.appendShape( lToAbout );
	this.root.appendShape( lToBlog );
	this.root.appendShape( lToGit );
	this.root.appendShape( lToProjects );


};

module.exports = dynContent;