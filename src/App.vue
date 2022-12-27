<template>
  <div class="root">
    <a-alert
      v-if="todoError.isError"
      message="Error"
      :description="todoError.description"
      type="error"
      show-icon
      closable
      @close="setError({ isError: false, description: '' })"
    ></a-alert>
    <div class="grid">
      <UsersList />
      <JobList />
      <TodoList />
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import UsersList from './components/User/UsersList.vue';
import JobList from './components/Job/JobList.vue';
import TodoList from './components/todo/TodoList.vue';
import { mapMutations, mapState } from 'vuex';

export default Vue.extend({
  name: 'App',
  components: {
    UsersList,
    JobList,
    TodoList
  },
  computed:{
    ...mapState({
      todoError: state => state.todo.todoError,
    })
  },
  methods:{
    ...mapMutations({
      setError: 'todo/setError'
    })
  }
});
</script>

<style>
.root {
  padding: 20px;
}
.root .ant-alert {
  margin: 0 auto 10px auto;
  width: 500px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  gap: 10px;
}
.alertDel {
  display: flex;
  justify-content: space-evenly;
}
</style>
