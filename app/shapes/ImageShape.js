var Shape = require('./Shape.js').Shape;

var ImageShape = function( src, id ){
  Shape.call( this, 'img', id );

  if( typeof src !== 'string' )
    throw ': image src should be a string literal';

  if( src ){
    this.src = src;
  }else{
    throw ': 3rd input shouldnt be null';
  }

  this.width;
  this.height;

};
/*OOP herency*/
ImageShape.prototype = Object.create( Shape.prototype );
ImageShape.prototype.contructor = ImageShape;
/*OOP herency*/

ImageShape.prototype.buildDom = function(){

  if( this.elementName && !this.domElement )
    this.domElement = document.createElement( this.elementName );

  this.domElement.src = this.src;

  if( this.id )
    this.domElement.id = this.id;

  if( this.classes )
    this.domElement.className += ' ' + this.classes;
    
  if( this.width )
    this.domElement.width = this.width;
    
    
  if( this.height )
    this.domElement.height = this.height;


};

ImageShape.prototype.render_ = function(){

  this.domElement.src = this.src;

  if( this.width )
    this.domElement.style.width = this.width + 'px';

  if( this.height )
    this.domElement.style.height = this.height + 'px';

};

ImageShape.prototype.changeImage = function( src ){

  if( typeof src !== 'string' )
    throw ': image src should be a string literal';

  this.src = src;

};

ImageShape.prototype.setWHpx = function( w, h ){

  if( w && typeof w === 'number' ){
    this.width = w;
  }

  if( h && typeof h === 'number' ){
    this.height = h;
  }

};

exports.ImageShape = ImageShape;
