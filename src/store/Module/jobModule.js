import { jobApi, usersApi } from '@/utils/api';

export const jobModule = {
  state: () => ({
    jobs: [],
    search: '',
    editMode: {
      id: 0,
      isEdit: false,
      value: '',
    },
    updateUsers: [],
    jobInfo: {
      isError: false,
      description: '',
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
    setSearch(state, searchQuery) {
      state.search = searchQuery;
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    delateJob(state, id) {
      state.jobs = state.jobs.filter((item) => item.id !== id);
    },
    updateUsers(state, users) {
      state.updateUsers = users;
    },
    setJobInfo(state, { item, users }) {
      const isError = users.some((user) => user.job === item.name);
      state.jobInfo = {
        isError,
        description: isError
          ? 'Данная должность кому-то принадлежит. Вы действительно хотите удалить её?'
          : 'Удалить должность?',
      };
    },
    setError(state, body){
      state.jobInfo = body
    }
  },
  actions: {
    setSearchQuery({ commit }, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getJobs({ state, commit }) {
      commit('setJobs', await jobApi.getJobs(state.search));
    },
    async createJob({ state, commit }, arg) {
      const body = {
        id: new Date(),
        name: arg.job,
      };
      commit('setJobs', [...state.jobs, await jobApi.createJob(body)]);
    },
    async delJob({ state, commit }, { item, users }) {
      commit('setError', {
        isError: false,
        description: '',
      });
      if (!state.jobInfo.isError) {
        await jobApi.delJob(item.id);
        commit('delateJob', item.id);
        const usersJobDelArr = users.filter((user) => {
          if (user.job === item.name) {
            return users;
          }
        });
        usersJobDelArr.forEach(async (el) => {
          const body = {
            ...el,
            job: '',
          };
          await usersApi.editUser(el.id, body);
        });
        commit(
          'updateUsers',
          users.map((user) => (user.job === item.name ? { ...user, ...{ job: '' } } : user)),
        );
      } 
    },
    async updateJob({ state, commit }, { arg, users }) {
      const body = {
        name: arg.job,
      };
      await jobApi.editJob(state.editMode.id, body);
      const jobs = state.jobs.map((job) =>
        job.id === state.editMode.id ? { ...job, ...body } : job,
      );
      commit('setJobs', jobs);

      const usersJobUpdateArr = users.filter((user) => {
        if (user.job === state.editMode.value) {
          return users;
        }
      });
      usersJobUpdateArr.forEach(async (el) => {
        const body = {
          ...el,
          job: arg.job,
        };
        await usersApi.editUser(el.id, body);
      });
      commit(
        'updateUsers',
        users.map((user) =>
          user.job === state.editMode.value ? { ...user, ...{ job: arg.job } } : user,
        ),
      );
    },
  },
  namespaced: true,
};
