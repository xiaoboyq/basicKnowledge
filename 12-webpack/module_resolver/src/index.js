 /* template */
 const path = require('path');
 const fs = require('fs');

 const boiler = fs.readFileSync(path.resolve(__dirname, 'index.bundle.boilerplate.js'), 'utf-8');
 const target = fs.readFileSync(path.resolve(__dirname, '..', 'index.js'), 'utf-8');

/* template-module-list */ 
// ==>  function(require, module, exports) {
// }
 const content = boiler.replace('/* template-module-list */', target)
 fs.writeFileSync(path.resolve(__dirname, '..', 'dist/index'), content, 'utf-8')