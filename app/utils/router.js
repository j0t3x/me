var Shape = require('../shapes/Shape.js').Shape;

var Router = function(){
     
     this.routes = {};
     this.currentPage;
     this.routeRegExp = /\/([a-zA-Z\.\=\@\-\_]+)/g; //remember to skip 0 index in the array which is the url start
     this.argumentsRegExp = /([a-zA-Z0-9]+)(\=)([a-zA-Z0-9\@\.\#\-\~\°\!]*)/g;
     this._getCurrentPage();
     
};

Router.prototype.getArgumentByName = function( argName ){
     
     var res;
     var matches = this.currentPage.search.match( this.argumentsRegExp );
     
     for (var i = matches.length; i--; ) {
          res = ( matches[i].substr( 0, argName.length ) === argName )? matches[i].split('=')[1] : null;
          if( res ) break;
     }
     
     return res;
     
};

Router.prototype.setRoute = function( route, rootShape ){

     if( !route )
          throw 'You shouldnt input empty values as a route';

     if( !rootShape || !rootShape instanceof Shape )
          throw 'You should input a shape';

     this.routes[ this._repairSlashes( route ) ] = rootShape;

};

Router.prototype.getPageShape = function(){

     this._getCurrentPage(); 
     return this.routes[ this.currentPage.pathname ];

};

Router.prototype._getCurrentPage = function(){

     this.currentPage = {

          host: window.location.host,
          hostname: window.location.hostname,
          href: window.location.href,
          origin: window.location.origin,
          pathname:  this._repairSlashes( window.location.pathname ),
          port: window.location.port,
          protocol: window.location.protocol,
          search: window.location.search

     };

};

Router.prototype._repairSlashes = function( word ){

     if( word === '' )
          word = '/';

          //add slash at end if needed
     if( word.charAt(0) !== '/' ){
          word = '/' + word;
     }

     //remove slash at end if needed
     if( word.charAt( word.length - 1 ) === '/' ){
          word = word.substr( 0, word.length - 1 );
     }

     return word;

};


exports.Router = Router;