(function () {
  var moduleList = [
    // index.js
    function (require, module, exports) {
      const moduleA = require('./moduleA')
      console.log('moduleA', moduleA)
      module.exports = "hello world"
    },
    // moduleA.js
    function (require, module, exports) {
      module.exports = new Date().getTime()
    }
  ]

  var moduleDepIdList = [
    {
      "./moduleA": 1
    },
    {}
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