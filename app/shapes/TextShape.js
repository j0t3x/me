var Shape = require('./Shape.js').Shape;

var TextShape = function( elem, id ){
  Shape.call( this, elem, id );
  this.textContent = '';
};
/*OOP herency*/
TextShape.prototype = Object.create( Shape.prototype );
TextShape.prototype.contructor = TextShape;
/*OOP herency*/

TextShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.domElement.innerHTML = this.textContent;

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;


};

//t is a string with the text for the textShape
TextShape.prototype.updateText = function( textContent ){
    
    this.needsReRender = true;
    
    if( typeof textContent !== 'string' )
      throw ': argument of updateText should be a string literal';

    this.textContent = textContent;
    
};

TextShape.prototype.render_ = function(){

  if( this.textContent )
    this.domElement.innerHTML = this.textContent;

};


exports.TextShape = TextShape;
