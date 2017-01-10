var Shape = require('./shapes/Shape.js');
var Router = require('./utils/router.js');
var appShell = require('./modules/appShell/index.js'); 
var experiment = require('./modules/doubleSlit/index.js');
var dynContent = require('./modules/dynContent/index.js');


var body = new Shape( document.getElementsByTagName('body')[0] );
Router = new Router();
appShell = new appShell();
appShell.init();

dynContent = new dynContent();
dynContent.init();

body.appendShape( appShell.root );
body.appendShape( dynContent.root );
body.buildDom();
body.render();

experiment = new experiment( appShell.canvas.domElement );
experiment.init();




