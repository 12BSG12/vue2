import { usersApi } from "@/utils/api";

export const userModule = {
  state: () => ({
    users: [],
    search: '',
    editMode: {
      id: 0,
      isEdit: false,
    },
  }),
  getters: {},
  mutations: {
    showEditForm(state, id) {
      state.editMode.id = id;
      state.editMode.isEdit = true;
    },
    closeEditForm(state) {
      state.editMode.id = 0;
      state.editMode.isEdit = false;
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
