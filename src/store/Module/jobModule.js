import { jobApi } from "@/utils/api";

export const jobModule = {
  state: () => ({
    jobs: [],
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
    setJobs(state, jobs){
      state.jobs = jobs;
    }
  },
  actions: {
    setSearchQuery({commit}, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getJobs({state, commit}) {
      commit('setJobs', await jobApi.getJobs(state.search));
    },
  },
  namespaced: true,
};
