import App from '@/App.vue';
import Icons from '@/components/Icons.vue';
import Layout from '@/components/Layout.vue';
import Nav from '@/components/Nav.vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import Vue from 'vue';


Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icons", Icons);



 new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");


window.onload = function(){
  setTimeout(function(){
    window.scrollTo(0,200)
  },0)
}

if(document.documentElement.clientWidth > 500){
  alert("推荐手机打开以保证使用效果")
  const img = document.createElement('img')
  const div = document.createElement('div')
  div.innerText='x'
  div.style.position='fixed'
  div.style.zIndex='1'
  div.style.right='401px'
  div.style.top='0'
  div.style.cursor='pointer'
  img.src='./images/qrcode.png'
  img.style.position='fixed';
  img.style.right='400px'
  img.style.top='0'
  img.style.width='150px'
  document.body.appendChild(div)
  document.body.appendChild(img)
  div.addEventListener('click',()=>{
    document.body.removeChild(img)
    document.body.removeChild(div)
  })
}

