 # npm run xxx 

 npm run xxx 会去 package.json中查找 scripts下的xxx命名， 然后执行这个对象里面定义的命令。
 其实跟直接执行这个命令是一样的， 
 ## 但是呢直接执行的时候， 如果全局环境中没有的话会报错【即使当前文件下有这个依赖】
 全局安装例如： create-react-app 
  1. 当我们在全局安装， npm i create-react-app -g 
  2. create-react-app myName 【直接运行一定要在安装时候-g 即全局安装】 来创建我的项目。
 如果么有-g 不是全局安装的时候 会报错。 因为操作系统中没有存在create-react-app这一条指令

 ## 但是当运行npm run xxx 命令时候 也是在运行这个命令， 会先在当前目录的node_modules/.bin下查找可执行的脚本，


.bin 目录，这个目录不是任何一个 npm 包。目录下的文件，表示这是一个个软链接，打开文件可以看到文件顶部写着 #!/bin/sh ，表示这是一个脚本。
由此我们可以知道，当使用 npm run serve 执行 vue-cli-service  serve 时，虽然没有安装 vue-cli-service的全局命令，但是 npm 会到 ./node_modules/.bin 中找到 vue-cli-service 文件作为  脚本来执行，则相当于执行了 ./node_modules/.bin/vue-cli-service serve（最后的 serve 作为参数传入）。


我们在安装依赖的时候，是通过npm i xxx 来执行的，例如 npm i @vue/cli-service，npm 在 安装这个依赖的时候，就会node_modules/.bin/ 目录中创建 好vue-cli-service 为名的几个可执行文件了。 一般这里面有几个同名不同后缀的文件， 运行在不同的平台【cmd windows-cmd， ps windows-powershell， unix】

 <!-- https://juejin.cn/post/7078924628525056007 -->
 <!-- https://blog.51cto.com/u_15077533/4531157 -->

