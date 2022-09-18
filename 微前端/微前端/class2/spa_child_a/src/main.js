/*
 * @Author: your name
 * @Date: 2021-10-05 12:10:57
 * @LastEditTime: 2022-02-24 18:23:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /dayday/微前端/微前端/class2/spa_child_a/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  el: '#microApp',
  router,
  render: h => h(App)
}
// 支持应用独立运行、部署，不依赖于基座应用
// if (!process.env.isMicro) {
//   delete appOptions.el
//   new Vue(appOptions).$mount('#app')
// }
if (!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}
// 基于基座应用，导出生命周期函数
const vueLifecycle = singleSpaVue({
  Vue,
  appOptions
})

export function bootstrap (props) {
  console.log('app1 bootstrap')
  return vueLifecycle.bootstrap(() => {})
}

export function mount (props) {
  console.log('app1 mount')
  return vueLifecycle.mount(() => {})
}

export function unmount (props) {
  console.log('app1 unmount')
  return vueLifecycle.unmount(() => {})
}
