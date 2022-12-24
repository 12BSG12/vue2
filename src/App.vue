<template>
  <div class="root">
    <div class="grid">
      <UsersList/>
      <JobList :jobs="jobs"/>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import UsersList from './components/User/UsersList.vue';
import JobList from './components/Job/JobList.vue';
import { jobApi } from './utils/api';
import {mapState } from 'vuex'

export default Vue.extend({
  name: 'App',
  components: {
    UsersList,
    JobList
  },
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    ...mapState({
      search: state => state.user.search,
    })
  },
  methods: {
    async getJobs() {
      this.jobs = await jobApi.getJobs();
    },
  },
  mounted(){
    this.getJobs()
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
</style>
