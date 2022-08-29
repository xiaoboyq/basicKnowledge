
// 插件需要install  声明插件
const myPlugin = {
  install(Vue, options) {
    // 标题组件
    Vue.component('heading', {
      props: {
        level: {
          type: String,
          required: true
        },
        title: {
          type: String,
          defalut: ''
        },
        icon: {
          type: String
        }
      },

      render(h) { // h 即 creatElement函数
        let childrend = [];
        if (this.icon) {
          childrend.push(h(
            'svg',
            { class: 'icon' },
            [h('use', { attrs: { 'xlink:href': '#icon-' + this.icon } })]
          ))
        }


        // 拼接子元素 把图标和子节点拼接
        childrend = childrend.concat(this.$slots.default)

        return h(
          'h' + this.level,  // 参数1  tagname
          { attrs: { title: this.title } }, // 参数2 属性
          childrend, // 参数3 一个数组  子节点vnode数组

        )

      }
    })

  }
}

if (window !== undefined && window.Vue) {
  // 使用插件  在引用的组件中使用插件方法一样
  window.Vue.use(myPlugin)
}