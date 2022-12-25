<template>
  <div class="root">
    <div class="grid">
      <UsersList/>
      <JobList/>
      <TodoList/>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import UsersList from './components/User/UsersList.vue';
import JobList from './components/Job/JobList.vue';
import TodoList from './components/todo/TodoList.vue';

export default Vue.extend({
  name: 'App',
  components: {
    UsersList,
    JobList,
    TodoList
  },
});
</script>

<style>
.root {
  padding: 20px;
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
