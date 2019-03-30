import Vue from 'vue'
import Vuex from "vuex";
// import { groupWith } from "ramda";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
     caopingList:[]
  },
  mutations:{
    setCaopingList(state,value){
      state.caopingList=value;
    },
    pushCaoping(state,v){
      state.caopingList.push(v);
    }
  },
  getters:{

  },
  actions:{

  }


})
