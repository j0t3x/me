var Shape = require('./Shape.js').Shape;

var OptionShape = function( name, type ){
     
     if( typeof type !== 'string' )
          throw 'indicate wether this is a radio or check group of options with a string';
     
     this.type = '';
     //setting input type, dom style
     if( type === 'radio' )
          this.type = 'radio';
     else if( type === 'check' )
          this.type = 'checkbox';
     
     this.groupName = name;
     this.structure = [];
     this.domElements = [];
     this.domElement;
     this.changedOptionsValues = [];
     
};
/*OOP herency*/
OptionShape.prototype = Object.create( Shape.prototype );
OptionShape.prototype.contructor = OptionShape;
/*OOP herency*/

OptionShape.prototype.addOption = function( displayText, value, classForName, classForInput ){
     
     if( !displayText || !value )
          throw 'you should add an option with display and value arguments...';
          
     this.structure.push({ 
          display: displayText, 
          value: value, 
          classForName: ( classForName ) ? classForName : '', 
          classForInput: ( classForInput ) ? classForInput : ''
     });
     
};

OptionShape.prototype.buildDom = function(){
     
     this.domElement = document.createElement('div');
     
     for (var i = 0; i < this.structure.length; i++ ) {
          
          var optionUnit = {
               container: document.createElement('div'),
               input: null,
               label: null,
               name: null,
               indicator: null
          };
          
          optionUnit.input = document.createElement('input');
          optionUnit.input.type = this.type;
          optionUnit.input.name = this.groupName;
          optionUnit.input.value = this.structure[i].value;
          optionUnit.input.className = this.structure[i].classForInput;
          //optionUnit.container.appendChild( optionUnit.input );
          
          optionUnit.label = document.createElement('label');
          //optionUnit.label.innerHTML = this.structure[i].display;
          optionUnit.label.className = this.structure[i].classForName;
          optionUnit.label.appendChild( optionUnit.input );
          
          optionUnit.name = document.createElement('span');
          optionUnit.name.innerHTML = this.structure[i].display;
          optionUnit.name.className = 'custom-control-description';
          optionUnit.label.appendChild( optionUnit.name );
          
          optionUnit.indicator = document.createElement('span');
          optionUnit.indicator.className = 'custom-control-indicator';
          optionUnit.label.appendChild( optionUnit.indicator );
          
          optionUnit.container.appendChild( optionUnit.label );
          
          optionUnit.container.className = 'form-check';
          
          this.domElements.push( optionUnit );
          //add the root dom element to attach to page
          this.domElement.appendChild( optionUnit.container );
          
     }
     
     if( this.id )
          this.domElement.id = this.id;
     
     if( this.classes )
          this.domElement.className += ' ' + this.classes;

};

//t is a string with the text for the OptionShape
OptionShape.prototype.getSelectedOptions = function(){
    
    var res = [];
    
     for (var i = this.domElements.length; i--; ) {
     
          if( this.domElements[i].input.checked )
               res.push( this.domElements[i].input.value )
     
     }
     
     return res;  
};

OptionShape.prototype.render_ = function(){
     
     //no render need, yet
     
};


exports.OptionShape = OptionShape;
