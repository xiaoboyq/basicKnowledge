<!-- webpack会自动解决模块问题 作用域问题。 -->
xx.js文件中 export default = fn() {
    console.log(xx)
  };

webpack 会把所有模块加载一个文件中， 为避免函数变量等冲突 ， 每一个模块放入闭包中  

webpack会将export default, reuqire等 转化为浏览器可以识别的函数形式
__webpack_export__ 
__webpack_export__["default"] = { // __webpack_export__ 对象下有一个default对象
  fn() {
    console.log(xx)
  }
}

__webpack_require__
__webpack_require__('./xxx.js') 
// 会寻找./xxx.js 模块 ./xxx.js在这里其实就是模块的id【因为都在同一个文件中，用打包前的路径来区分模块】

__webpack_require__.r(__webpack_export__) 
 // __webpack_require__下的r函数接受__webpack_export__ 对象 执行  

 当然每一个模块打包后都是字符串形式 都需要用eval去执行
 nodejs 下的vm.runInContext() 会将字符串执行 类似eval


<!-- 预处理器 loader -->
 webpack 不看文件的后缀的，都默认为js代码处理
 //当webpack 去读取一个模块的时候， 默认会作为js模块去处理，但是我们可以配置一个loader的选项， 去告诉webpack这个内容要如何处理
 loader 使资源处理变得更加灵活


 plugin 使webpack变得更加灵活 


 <!-- Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程： -->

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
确定入口：根据配置中的 entry 找出所有的入口文件
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。


# 简单说
<!-- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中 -->




## Chunk生成算法
1.webpack首先会将entry中对应的module都生成一个新的chunk。
2.遍历module的依赖列表，将依赖的module也加入到chunk中。
3.如果一个依赖module是动态引入的模块，会根据这个module创建一个新的chunk，继续遍历依赖。
4.重复上面的过程，直至得到所有的chunk。


## hash chunkhash contenthash 

hash 一般结合 CDN 缓存来使用，通过 webpack 构建之后，生成对应文件名自动带上对应的 MD5 值。如果文件内容改变，对应文件的哈希值也会发生改变,对应的 HTM 引用的 URL 地址也会改变，触发 CDN 服务器从源服务器上拉取对应数据，进而更新本地缓存。

<!-- https://blog.csdn.net/weixin_36894745/article/details/114291614 -->
1. hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值

2. chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响。
采用chunkhash，所以项目主入口文件Index.js及其对应的依赖文件Index.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建  

3. contenthash 和单个文件的内容相关，使用 contenthash 值，只要当前文件内容不变，那么不会重复构建，生成的相应文件哈希值也是一样
 在chunkhash的例子，我们可以看到由于index.css被index.js引用了，所以共用相同的chunkhash值。但是这样子有个问题，如果index.js更改了代码，css文件就算内容没有任何改变，由于是该模块发生了改变，导致css文件会重复构建。
这个时候，我们可以使用mini-css-extarct-plugin里的contenthash值，保证即使css文件所处的模块里就算其他文件内容改变，只要css文件内容不变，那么不会重复构建

### 特
file-loader 的 hash
字体的 file-loader 的打包时，使用的是[name]_[hash:8].[ext]但是如果改了其他工程文件，比如 index.js，生成的图片 hash 并没有变化。这里需要注意的是，file-loader 的 hash 字段，这个 loader 自己定义的占位符，和 webpack 的内置 hash 字段并不一致。这里的 hash 是使用 md4 等 hash 算法，对文件内容进行 hash。
```javascript
{
  test: /.\(png|svg|jpg)/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[hash].js'
      }
    }
  ]
}
```

所以只要文件内容不变，hash 还是会保持一致。


webpack webpack-bundle-analyze 打包分析





## 多页面打包通用方案：
1. entry设置多入口 和output设置多出口 多个new htmlwebpackplugin 设置多页面

2. 更通用方案：
glob.sync
<!-- https://www.npmjs.com/package/glob -->
<!-- npm i glob -->
<!-- var glob = require("glob") -->
entry: glob.sync(path.join(__dirname, './src/*/index.js')) 
将src下的所有包含index.js的单独打包成页面
```javascript
var glob = require("glob")
const setMap = function() {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(__dirname, './src/*/index.js');
   
  Object.keys(entryFiles)
  .map(index => {
        const entryFile = entryFiles[index];
        console.log('entryFile', entryFile)
        // entryFile /Users/boyq/Desktop/geektime-webpack-course/code/chapter03/inline-resource/src/search/index.js
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        console.log('match', match)
        // match [
        //     'src/search/index.js',
        //     'search', // 数组的第2个是名字
        //     index: 75,
        //     input: '/Users/boyq/Desktop/geektime-webpack-course/code/chapter03/inline-resource/src/search/index.js',
        //     groups: undefined
        //   ]

        const pageName = match && match[1];

        entry[pageName] = entryFile;
        htmlwebpackplugins.push({
          new HtmlWebpackPlugin({
            inlineSource: '.css$',
            template: path.join(__dirname, `src/${pageName}/index.html`),
            filename: `${pageName}.html`,
            chunks: ['vendors', pageName],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        })
    })
  })


  return {
    entry, htmlwebpackplugins
  }

}

```


## source map 关键字 【可以组合使用】
【一般在开放环境使用，生产环境不用， 因为会暴露太多的逻辑】
<!--devtool: eval: 使用eval包裹模块代码【代码后面有个sourceURL指定哪个原始文件】 -->
```javascript
eval('__webpack_require__.r(__webpack_exports__); xxx打包的代码 //# sourceURL=//.src/index/index.js')
```
cheap: 不包含列信息【只能定位到行的信息】
source-map:生成单独的.map文件
<!-- devtool: source-map js和.map文件会分离 在js最后一行 会有 //# sourceURL=//.src/index/index.js.map 指定是对应哪个map文件 -->
inline: 将.map作为DataURl嵌入，不单独生成.map文件
<!--devtool: inline-source-map; 会将.map 放入js文件的最后一行， 文件大小会大很多 -->
module: 包含loader的suorcemap【可以更深入的排查错误】

生产环境一般设置： cheap-module-source-map【源码只能看见行】
                cheap-source-map【经过loader转化后的代码 只能看见行】
                source-map【源码】



# 利⽤ SplitChunksPlugin 进⾏公共脚本分离
## SplitChunksPlugin 【webpack4内置的 取代webpack3的CommonsChunkPlugin】
利用SplitChunksPlugin 进行公共脚本分离
chunks: 'async' 对异步引入的库进行分离【默认】
        'sync' 对同步引入的库进行分离
        'all' 所有引入的库进行分离【推荐】

基本配置 
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 0, // 最小的大小 字节
      maxSize: 0, //  最大的大小
      minChunks: 2, // 多个页面都使用  2: 2个页面引用到就提取到一个公共chunk
      maxAsyncRequests: 5, // 同时请求的数量
      maxInitialRequests: 3, // 
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/, // 将react|react-dom提取成 vendors
          name: 'vendors',
          chunks: 'all',

          // name: 'commons',
          // chunks: 'all',
          // minChunks: 2, // 将引用超过2个的文件提取到commons中
        }
      }

    }
  }
}

```


基础库分离
思路：将 react、react-dom 基础包通过 cdn 引⼊，不打⼊ bundle 中·
⽅法：使⽤ html-webpack-externals-plugin
# html-webpack-externals-plugin
<!-- npm i html-webpack-externals-plugin -D -->

```javascript
// webpack.config.js
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'http:xxx/lib/16.2.0/react.min.js',
          global: 'React'
        },
        {
          module: 'react-dom',
          entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ]
    })
  ]
}

// html 模版中
    <script type="text/javascript" src="http:xxx/lib/16.2.0/react.min.js"></script>
    <script type="text/javascript" src="https://11.url.cn/now/lib/16.2.0/react-dom.min.js"></script>
```



 # tree shaking
 概念：一个模块可能有多个方法， 只要其中某一个方法被用到了， 则整个文件都会被打包到bundle中， tree shaking就是只把用到的方法打包到bundle中， 没用到的方法在uglify阶段被擦除掉。
代码编译阶段，删除无用代码 【即使方法被导入，但是没有被调用也是默认删除】
<!-- import { fn } from './index.js' 但是 fn没有被调用， fn也不会被打包进bundle -->
使用： webpack production mode下 默认开启
【.babelrc中设置modules: false 和  package.json的{sideEffects: false}】
### modules: false  modules 是babel将原始文件转化为哪种规则的代码  设置为false 即为esmodule; 还有其他值 commonjs, amd, umd等


<!-- https://www.cnblogs.com/mengff/p/12845204.html -->
1. Tree-shaking只对ES Module起作用，对于commonjs无效，对于umd亦无效

因为tree-shaking是针对静态结构进行分析，只有import和export是静态的导入和导出。而commonjs有动态导入和导出的功能，无法进行静态分析。

ESModule模块的特点
只能在模块顶层的语句出现， import的变量名只能是字符串常量； 

cmjs如下代码，只有运行代码的时候才能知道导入的内容；
```javascript
//运行时才知道的导入内容 || 即tree-shaking 不知道要导入的内容 
var my_lib;
if (Math.random()) {
    my_lib = require('foo');
} else {
    my_lib = require('bar');
}

//运行时才知道的导出的内容
if (Math.random()) {
    exports.baz = function baz(){};
}
```
2. babel编译默认将模块转换为commonjs，需要配置.babelrc的{module:false} 和 package.json的{sideEffects: false}才可以进行tree-shaking
3. rollup的tree-shaking比webpack的要强一些
4. webpack4默认开启tree-shaking，具体可参考 webpack4的tree-shaking 