1. 自动转义
React 在渲染 HTML 内容和渲染 DOM 属性时都会将 "'&<> 这几个字符进行转义;

2.  $$typeof防止存储型xss攻击 注意到其中有个属性是 $$typeof，它是用来标记此对象是一个 ReactElement，React 在进行渲染前会通过此属性进行校验，校验不通过将会抛出上面的错误。React 利用这个属性来防止通过构造特殊的 Children 来进行的 XSS 攻击，原因是 $$typeof 是个 Symbol 类型，进行 JSON 转换后会 Symbol 值会丢失，无法在前后端进行传输。如果用户提交了特殊的 Children，也无法进行渲染，利用此特性，可以防止存储型的 XSS 攻击。