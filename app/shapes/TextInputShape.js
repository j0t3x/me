var Shape = require('./Shape.js').Shape;

var TextInputShape = function( id ){
  Shape.call( this, 'input', id );
  this.textContent = '';
};
/*OOP herency*/
TextInputShape.prototype = Object.create( Shape.prototype );
TextInputShape.prototype.contructor = TextInputShape;
/*OOP herency*/

TextInputShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.domElement.type = 'text';
  this.domElement.value = this.textContent;

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;


};

//t is a string with the text for the TextInputShape
TextInputShape.prototype.getVal = function(){
    if( !this.domElement )
      throw ': first build object DOM ->  buildDom()';

    return this.domElement.value;
};

//t is a string with the text for the TextInputShape
TextInputShape.prototype.setValue = function( value ){
    if( typeof value !== 'string' )
      throw ': argument of updateText should be a string literal';

    this.textContent = value;
};

TextInputShape.prototype.render_ = function(){
  
  if( this.textContent )
    this.domElement.value = this.textContent;

};


exports.TextInputShape = TextInputShape;
