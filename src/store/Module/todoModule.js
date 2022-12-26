import { taskApi, usersApi } from '@/utils/api';

export const todoModule = {
  state: () => ({
    todos: [],
    search: '',
    editMode: {
      id: 0,
      isEdit: false,
      value: '',
    },
    updateUsers: [],
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
    setTodos(state, todos) {
      state.todos = todos;
    },
    delateTodo(state, id) {
      state.todos = state.todos.filter((item) => item.id !== id);
    },
    updateUsers(state, users) {
      state.updateUsers = users
    }
  },
  actions: {
    setSearchQuery({ commit }, searchQuery) {
      commit('setSearch', searchQuery);
    },
    async getTodos({ state, commit }) {
      commit('setTodos', await taskApi.getTasks(state.search));
    },
    async createTodo({ state, commit }, arg) {
      const body = {
        id: new Date(),
        name: arg.todo,
      };
      console.log(arg);
      commit('setTodos', [...state.todos, await taskApi.createTask(body)]);
    },
    async delTodo({ commit }, { item, users }) {
      await taskApi.delTask(item.id);
      commit('delateTodo', item.id);
      let usersTodoDelArr = [];
      let updateUsers = [];
      users.forEach((i) => {
        i.task.forEach((j) => {
          if (j.name === item.name) {
            usersTodoDelArr.push(i);
          }
        });
      });
      if (usersTodoDelArr.length > 0) {
        usersTodoDelArr.forEach(async (el) => {
          const body = {
            FIO: el.FIO,
            job: el.job,
            task: el.task.filter((obj) => obj.name !== item.name),
          };
          await usersApi.editUser(el.id, body);
        });
      }
    
      // commit('updateUsers', users.map((user) => (user.job === item.name ? { ...user, ...{ job: '' } } : user)));
    },
    async updateTodo({ state, commit }, arg) {
      const body = {
        name: arg.todo,
      };
      await taskApi.editTask(state.editMode.id, body);
      const todos = state.todos.map((todo) =>
        todo.id === state.editMode.id ? { ...todo, ...body } : todo,
      );
      commit('setTodos', todos);
    },
  },
  namespaced: true,
};
