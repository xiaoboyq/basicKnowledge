(function() {
  var moduleList = [
    // function(require, module, exports) {
    // }
    /* template-module-list */
  ]
  // var module = { 
  //   exports: {}
  // } 
  // moduleList[0](null, module)
  var moduleDepIdList = [
   /* template-module-dep-id-list */
  ]

  function require(id, parentId) {
    const currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][id] : id;
    var module = { exports: {} }
    var moduleFunc = moduleList[currentModuleId]
    moduleFunc((id) => require(id, currentModuleId), module, module.exports)
    return module.exports
  }

  // moduleList[0](null, module, require)
  require(0)
})()