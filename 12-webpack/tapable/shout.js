module.exports = function (welcome) {
  welcome.sayHook.tap('shout', words => {
      console.log('出其不意的大喊一声:', words);
  });
};