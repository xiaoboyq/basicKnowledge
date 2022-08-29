// 编译器
// 递归遍历dom树
// 判断节点类型， 如果是文本，则判断是否是插值绑定
// 如果是元素， 则遍历其属性判断是否是指令或者事件，然后递归子元素
 class Compiler {
  //  el是宿主元素
  // vm  是MyVue的实例
   constructor(el,vm) {
     this.$vm = vm;
     this.$el = document.getElementById(el);

    //  console.log(el)
    //  console.log(document.querySelector(el))
     if(this.$el) {
       // 执行编译
       this.compile(this.$el);
     }

   }

   // 编译
   compile(el) {
    //  遍历el树
    const childNodes = el.childNodes;
    console.log(el);
    console.log(childNodes);
    Array.from(childNodes).forEach(node => {
      // 判断是否是元素
      if(this.isElement(node)){
        // console.log('编译元素' + node.nodeName)
        this.compileElement(node)
      } else if(this.isInter(node)){
        // console.log('编译插值绑定'+ node.textContent)
        this.compileText(node)
      }

      if(node.childNodes&&node.childNodes.length > 0) {
        this.compile(node)
      }     
    });
   }

   // 判断是否是元素
   isElement(node) {
    return node.nodeType === 1
   }
   //  文本插值
   isInter(node) {
     // 首先是文本标签，其次内容是{{xxx}}
      return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)

      //正则表达式 /\{\{(.*)\}\}/ 只要有分组就会放到  RegExp 中去  RegExp.$1 获取第一个
   }
   
   // 编译文本插值
   compileText(node) {
    //  console.log(this.$vm) 
    //  console.log(RegExp.$1) // counter
    //  node.textContent =  this.$vm[RegExp.$1]

     this.update(node,RegExp.$1, 'text')
   }
   // 编译元素
   compileElement(node) {
     // 节点是元素
     // 遍历其属性列表
     const nodeAttrs = node.attributes;
     Array.from(nodeAttrs).forEach(attr => {
       // 规定 指令以 k-xx='oo'定义
       const attrName = attr.name;
       const exp = attr.value;
       if(this.isDirective(attrName)) {
         const dir = attrName.substring(2); // 获取指令 xx
         // 执行指令
         this[dir]&&this[dir](node, exp)
       }
     })
   }

   // 是否为指令
   isDirective(name) {
     return name.indexOf('k-') === 0
   }

   update(node, exp, dir) {
     // 初始化
     // 指令对象的更新函数xxUpdater
     const fn = this[dir+'Updater']
     fn && fn(node, this.$vm[exp]);

     // 更新处理, 封装一个更新函数， 可以更新对应dom元素
     new Watcher(this.$vm, exp, function(val) {
       fn && fn(node, val);
     })

   }

   textUpdater(node, value) {
    node.textContent = value
   }

   //k-text
   text(node, exp) {
    //  node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
   }

   // k-html
   html(node, exp) {
    //  node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
   }

   htmlUpdater(node, value) {
     node.innerHTML = value
   }
 }


 // 实现事件和双向绑定