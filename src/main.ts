import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Icons from "@/components/Icons.vue";
import Layout from "@/components/Layout.vue";
import tagListModel from "@/models/tagListModel.ts";
import recordListModel from './models/recordListModel';

Vue.config.productionTip = false;

Vue.component("Nav", Nav);
Vue.component("Layout", Layout);
Vue.component("Icons", Icons);
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem)=>recordListModel.create(record)

window.tagList = tagListModel.fetch();
window.createTag = (name: string) => {
  const result = tagListModel.create(name);
  if (result === "duplicated") {
    window.alert("标签名重复啦 ");
  } else if (result === "success") {
    window.alert("添加成功");
  }
};
window.removeTag=(id: string)=>{
  return tagListModel.remove(id)
}
window.updateTag=(id: string,name: string)=>{
  return tagListModel.update(id, name);
}
window.findTag=(id: string)=>{
return  window.tagList.filter((t) => t.id === id)[0];
}
 new Vue({
  router: router,
  store,
  render: (h) => h(App),
}).$mount("#app");
