import { taskApi } from "@/utils/api";

export const todoModule = {
  state: () => ({
    todos: [],
    search: '',
    editMode: {
      id: 0,
      isEdit: false,
      value: ''
    },
  }),
  getters: {},
  mutations: {
    showEditForm(state, item) {
      state.editMode.id = item.id;
      state.editMode.value = item.name;
      state.editMode.isEdit = true;
    },
    closeEditForm(state) {
      state.editMode.id = 0;
      state.editMode.value = '';
      state.editMode.isEdit = false;
    },
    setSearch(state, searchQuery){
      state.search = searchQuery
    },
    setTodos(state, todos){
      state.todos = todos;
    }
  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getTodos({state, commit}) {
      commit('setTodos', await taskApi.getTasks(state.search));
    },
  },
  namespaced: true,
};
