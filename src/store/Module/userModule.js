import { usersApi } from '@/utils/api';

export const userModule = {
  state: () => ({
    users: [],
    search: '',
    addTodoUserInfo: 0,
    editMode: {
      id: 0,
      isEdit: false,
      inputValue: '',
      selectValue: '',
    },
    editModeTodo: {
      id: 0,
      isEdit: false,
      name: '',
      dataStart: '',
      dataEnd: '',
    },
  }),
  getters: {
    findUserTodo(state) {
      return state.users.find((user) => user.id === state.editMode.id)?.task;
    },
    checkTime: () => (dateEnd) => {
      const timeEnd = new Date(dateEnd).getTime();
      const timeNow = new Date().getTime();
      if (timeEnd <= timeNow) {
        return { pending: false, fulfilled: false, rejected: true };
      } else if (timeEnd > timeNow) {
        return { pending: true, fulfilled: false, rejected: false };
      }
    },
  },
  mutations: {
    showEditForm(state, item) {
      state.editMode.id = item.id;
      state.editMode.inputValue = item.FIO;
      state.editMode.selectValue = item.job;
      state.editMode.isEdit = true;
    },
    closeEditForm(state) {
      state.editMode.id = 0;
      state.editMode.inputValue = '';
      state.editMode.selectValue = '';
      state.editMode.isEdit = false;
    },
    showEditTodoForm(state, item) {
      state.editModeTodo.id = item.id;
      state.editModeTodo.name = item.name;
      state.editModeTodo.dataStart = item.start;
      state.editModeTodo.dataEnd = item.end;
      state.editModeTodo.isEdit = true;
    },
    closeEditTodoForm(state) {
      state.editModeTodo.id = 0;
      state.editModeTodo.name = '';
      state.editModeTodo.dataStart = '';
      state.editModeTodo.dataEnd = '';
      state.editModeTodo.isEdit = false;
    },
    setSearch(state, searchQuery) {
      state.search = searchQuery;
    },
    setUsers(state, users) {
      state.users = users;
    },
    delUser(state, id) {
      state.users = state.users.filter((item) => item.id !== id);
    },
    setTodoUserInfo(state, info) {
      state.addTodoUserInfo = info;
    },
  },
  actions: {
    setSearchQuery({ commit }, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getUsers({ state, commit }) {
      commit('setUsers', await usersApi.getUsers(state.search));
    },
    async createUser({ state, commit }, arg) {
      const body = {
        id: new Date(),
        FIO: arg.fio,
        job: arg.job,
        task: [],
      };
      commit('setUsers', [...state.users, await usersApi.createUser(body)]);
    },
    async delUser({ commit }, id) {
      await usersApi.delUser(id);
      commit('delUser', id);
    },
    async updateUser({ state, commit, getters }, arg) {
      const body = {
        FIO: arg.fio,
        job: arg.select,
        task: getters.findUserTodo,
      };
      await usersApi.editUser(state.editMode.id, body);
      const users = state.users.map((user) =>
        user.id === state.editMode.id ? { ...user, ...body } : user,
      );
      commit('setUsers', users);
      commit('closeEditForm')
    },
    async createUserTodo({ state, commit, getters }, arg) {
      const body = {
        ...state.addTodoUserInfo,
        task: [
          ...state.addTodoUserInfo.task,
          {
            id: new Date(),
            name: arg.select,
            start: arg['range-picker'][0],
            end: arg['range-picker'][1],
            ...getters.checkTime(arg['range-picker'][1]),
          },
        ],
      };
      await usersApi.editUser(state.addTodoUserInfo.id, body);
      const users = state.users.map((user) =>
        user.id === state.addTodoUserInfo.id ? { ...user, ...body } : user,
      );
      commit('setUsers', users);
    },
    async updateUserTodoDate({ state, commit, getters }, arg) {
      const body = {
        ...state.addTodoUserInfo,
        task: state.users
        .find((user) => user.id === state.addTodoUserInfo.id)?.task.map((task) =>
          task.id === state.editModeTodo.id
            ? {
                ...task,
                ...{
                  start: arg['range-picker'][0],
                  end: arg['range-picker'][1],
                  ...getters.checkTime(arg['range-picker'][1]),
                },
              }
            : task,
        ),
      };
      await usersApi.editUser(state.addTodoUserInfo.id, body);
      const users = state.users.map((user) =>
        user.id === state.addTodoUserInfo.id ? { ...user, ...body } : user,
      );
      commit('setUsers', users);
      commit('closeEditTodoForm')
    },
    async updateUserTodoStatus({ state, commit }, arg) {
      const body = {
        ...state.addTodoUserInfo,
        task: state.users
        .find((user) => user.id === state.addTodoUserInfo.id)?.task.map((task) =>
          task.id === arg.id
            ? {
                ...task,
                ...{
                  pending: false,
                  fulfilled: true,
                  rejected: false,
                },
              }
            : task,
        ),
      };
      await usersApi.editUser(state.addTodoUserInfo.id, body);
      const users = state.users.map((user) =>
        user.id === state.addTodoUserInfo.id ? { ...user, ...body } : user,
      );
      commit('setUsers', users);
    },
    async checkRejectUserTodoStatus({ state, commit }) {
      const body = {
        ...state.addTodoUserInfo,
        task: state.users
          .find((user) => user.id === state.addTodoUserInfo.id)
          ?.task.map((task) =>
            new Date(task.end).getTime() <= new Date().getTime() && !task.fulfilled
              ? {
                  ...task,
                  ...{
                    pending: false,
                    fulfilled: false,
                    rejected: true,
                  },
                }
              : task,
          ),
      };
      const isReject = body.task.some(item => item.rejected === true) 
      if(isReject){
        await usersApi.editUser(state.addTodoUserInfo.id, body);
        const users = state.users.map((user) =>
          user.id === state.addTodoUserInfo.id ? { ...user, ...body } : user,
        );
        commit('setUsers', users);
      }
    },
    async delUserTodo({ state, commit }, id) {
      const body = {
        ...state.addTodoUserInfo,
        task: state.addTodoUserInfo.task.filter((task) => task.id !== id),
      };
      await usersApi.editUser(state.addTodoUserInfo.id, body);
      const users = state.users.map((user) =>
        user.id === state.addTodoUserInfo.id ? { ...user, ...body } : user,
      );
      commit('setUsers', users);
    },
  },
  namespaced: true,
};
