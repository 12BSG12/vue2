import { userModule } from './Module/userModule';
import { jobModule } from './Module/jobModule';
import { todoModule } from './Module/todoModule';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    user: userModule,
    job: jobModule,
    todo: todoModule
  }
})