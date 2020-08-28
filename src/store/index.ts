import clone from '@/lib/clone';
import store from '@/store';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordList:[] as RecordItem[]
  },
  mutations: {
    fetchRecords(state) {
      console.log("来取数据了");
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
    },
    createRecord(state,record){
    const record2: RecordItem = clone(record);
    record2.recordTime = new Date();
    state.recordList.push(record2);
    console.log(state.recordList);
    store.commit("saveRecords")
    },
    saveRecords(state) {
      window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
  },
  actions: {
  },
  modules: {
  }
})
