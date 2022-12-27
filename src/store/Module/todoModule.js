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
      state.updateUsers = users;
    },
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
      let newUsers = [];
      users.forEach((i) => {
        i.task.forEach((j) => {
          if (j.name === item.name) {
            usersTodoDelArr.push(i);
          }
        });
        const body = {
          ...i,
          ...{ task: i.task.filter((obj) => obj.name !== item.name) },
        };
        newUsers.push(body);
      });
      if (usersTodoDelArr.length > 0) {
        usersTodoDelArr.forEach(async (el) => {
          const body = {
            ...el,
            task: el.task.filter((obj) => obj.name !== item.name),
          };
          await usersApi.editUser(el.id, body);
        });
      }
      commit('updateUsers', newUsers);
    },
    async updateTodo({ state, commit }, { values, users }) {
      const body = {
        name: values.todo,
      };
      await taskApi.editTask(state.editMode.id, body);
      const todos = state.todos.map((todo) =>
        todo.id === state.editMode.id ? { ...todo, ...body } : todo,
      );
      commit('setTodos', todos);
      let usersTodoDelArr = [];
      let newUsers = [];
      users.forEach((i) => {
        i.task.forEach((j) => {
          if (j.name === state.editMode.value) {
            usersTodoDelArr.push(i);
          }  
        });
        const body = {
          ...i,
          task: i.task.map((task) =>
              task.name === state.editMode.value
                ? {
                    ...task,
                    ...{
                      name: values.todo,
                    },
                  }
                : task,
            ),
        };
        newUsers.push(body);
      });
      if (usersTodoDelArr.length > 0) {
        usersTodoDelArr.forEach(async (el) => {
          const body = {
            ...el,
            task: el.task.map((task) =>
                task.name === state.editMode.value
                  ? {
                      ...task,
                      ...{
                        name: values.todo,
                      },
                    }
                  : task,
              ),
          };
          await usersApi.editUser(el.id, body);
        });
      }
      commit('updateUsers', newUsers);
    },
  },
  namespaced: true,
};
