import Vue from 'vue'
import Vuex from "vuex";
// import { groupWith } from "ramda";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
     caopingList:[],
     infoBox:{},
      work:{},
      person:{},
      worklist:[]
  },
  mutations:{
    setCaopingList(state,value){
      state.caopingList=value;
    },
    pushCaoping(state,v){
      state.caopingList.push(v);
    },

      setWorklist(state,v){
    state.worklist=v;
       },
          setInfoBox(state,v){
      state.infoBox=v;
    },
      setPerson(state,v){
          state.person=v;
      },
      setWork(state,v){
          state.work=v;
      },
  },
  getters:{

  },
  actions:{

  }


})
