import { usersApi } from "@/utils/api";

export const userModule = {
  state: () => ({
    users: [],
    search: '',
    editMode: {
      id: 0,
      isEdit: false,
      inputValue: '',
      selectValue: '',
    },
    editModeTodo: {
      id: 0,
      isEdit: false,
      dataStart: '',
      dataEnd: '',
    },
  }),
  getters: {},
  mutations: {
    showEditForm(state, item) {
      state.editMode.id = item.id;
      state.editMode.inputValue = item.FIO;
      state.editMode.selectValue = item.job;
      state.editMode.isEdit = true;
    },
    closeEditForm(state) {
      state.editMode.id = 0;
      state.editMode.isEdit = false;
    },
    showEditTodoForm(state, item) {
      state.editModeTodo.id = item.id;
      state.editModeTodo.dataStart= item.start;
      state.editModeTodo.dataEnd = item.end;
      state.editModeTodo.isEdit = true;
    },
    closeEditTodoForm(state) {
      state.editModeTodo.id = 0;
      state.editModeTodo.isEdit = false;
    },
    setSearch(state, searchQuery){
      state.search = searchQuery
    },
    setUsers(state, users){
      state.users = users;
    }
  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getUsers({state, commit}) {
      commit('setUsers', await usersApi.getUsers(state.search));
    },
  },
  namespaced: true,
};
