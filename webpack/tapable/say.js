module.exports = function (welcome) {
  welcome.sayAsyncHook.tap('say', words => {
    setTimeout(()=> {
      console.log('轻声说:', words);
    }, 10000)
      
  });
};
