var Shape = require('./Shape.js').Shape;

var ButtonShape = function( buttonText, id ){
  Shape.call( this, 'button', id );
  this.textContent = buttonText;
};
/*OOP herency*/
ButtonShape.prototype = Object.create( Shape.prototype );
ButtonShape.prototype.contructor = ButtonShape;
/*OOP herency*/

ButtonShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.domElement.innerHTML = this.textContent;

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;


};

//t is a string with the text for the ButtonShape
ButtonShape.prototype.updateText = function( text ){
    if( typeof text !== 'string' )
      throw ': argument of updateText should be a string literal';

    this.textContent = text;
};

ButtonShape.prototype.render_ = function(){

  if( this.textContent )
    this.domElement.innerHTML = this.textContent;

};



exports.ButtonShape = ButtonShape;
