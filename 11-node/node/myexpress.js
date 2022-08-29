const http = require('http');
const url = require("url");

module.exports = (() => {
    return function () {
      let router = [];
      return {
        get: function (path, handler) {
          console.log("get...", path);
          if (typeof path === "string") {
            router.push({
              path,
              method: "get",
              handler
            });
          } else {
            router.push({
              path: "*",
              method: "get",
              handler: path
            });
          }
        },
        listen: function () {
          const server = http.createServer(function (req, res) {
            console.log(url.parse(req.url, true));
            let { pathname } = url.parse(req.url, true);
            router.forEach(route => {
              let { path, method, handler } = route;
              if (pathname == path && req.method.toLowerCase() == method) {
                return handler(req, res);
              }
              if (path == "*") {
                return handler(req, res);
              }
            });
          });
          server.listen(...arguments);
        }
      }
    }
  })()
