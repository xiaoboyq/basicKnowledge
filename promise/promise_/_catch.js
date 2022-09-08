Promise.prototype.catch = function(onRejct) {
  return this.then(null, onRejct)
}