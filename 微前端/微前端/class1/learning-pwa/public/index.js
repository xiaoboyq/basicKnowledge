const windowMap = new Map();
const resertWindow = {};

let routerUrl = '';
const handler = {
    get: function(obj, prop) {
        const tempWindow = windowMap.get(routerUrl);
        console.log(windowMap, routerUrl);
        return tempWindow[prop];
    },
    set: function(obj, prop, value) {
        if (!windowMap.has(routerUrl)) {
            windowMap.set(routerUrl, JSON.parse(JSON.stringify(resertWindow)));
        }
        const tempWindow =  windowMap.get(routerUrl);
        tempWindow[prop] = value;
        // console.log(obj, prop, value);
    },
};

let proxyWindow = new Proxy(resertWindow, handler);
// 首先是父类的啊属性.
proxyWindow.a = '我是父类的a属性的值';
 
// 改变路由到子类
routerUrl = 'routeA';
proxyWindow.a = '我是routerA的a属性的值'

// 改变路由到父类
routerUrl = '';
console.log(proxyWindow.a);

// 改变路由到子类
routerUrl = 'routeA';
console.log(proxyWindow.a);