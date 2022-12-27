<template>
  <div>
    <a-card title="Должности">
      <a-input-search
        slot="extra"
        placeholder="Поиск"
        :loading="false"
        enter-button
        v-model="query"
        @input="debouncedSearch"
      />
      <a-list item-layout="horizontal" :data-source="jobs">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-button
            slot="actions"
            size="small"
            @click="() => showEditForm(item)"
            :disabled="editMode.isEdit"
          >
            <a-icon type="edit" theme="twoTone" />
          </a-button>
          <div slot="actions" @mouseover="setJobInfo({item, users})">
            <a-popover  :title="jobInfo.description" trigger="hover">
              <div class="alertDel" slot="content">
                <a-button @click="delJob({item, users})">Да</a-button>
              </div>
              <a-button size="small" type="danger">
                <a-icon type="delete" />
              </a-button>
            </a-popover>
          </div>
          <a-list-item-meta>
            <div slot="title">
              <jobEditForm v-if="item.id === editMode.id && editMode.isEdit" />
              <div v-else>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </a-list-item-meta>
        </a-list-item>
        <a-button slot="footer" type="primary" block @click="showAddForm = true"
          >Добавить должность</a-button
        >
      </a-list>
    </a-card>
    <a-modal v-model="showAddForm" title="Добавить должность" @ok="showAddForm = false">
      <JobForm/>
    </a-modal>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import {mapState, mapActions, mapMutations} from 'vuex'
import debounce from 'lodash/debounce';
import jobEditForm from './JobEditForm.vue'
import JobForm from './JobAddForm.vue'

export default Vue.extend({
  name: 'JobList',
  components:{
    jobEditForm,
    JobForm
  },
  data() {
    return {
      showTodo: false,
      showAddForm: false,
    };
  },
  computed: {
    ...mapState({
      editMode: state => state.job.editMode,
      search: state => state.job.search,
      jobs: state => state.job.jobs,
      users: state => state.user.users,
      updateUsers: state => state.job.updateUsers,
      jobInfo: state => state.job.jobInfo,
    }),
    query: {
      get() {
        return this.search;
      },
      set(val) {
        return this.setSearchQuery(val);
      }
    }
  },
  watch:{
    updateUsers(arr){
      this.setUsers(arr)
    }
  },
  methods: {
    ...mapMutations({
      showEditForm: 'job/showEditForm',
      setUsers: 'user/setUsers',
      setJobInfo: 'job/setJobInfo'
    }),
    ...mapActions({
      setSearchQuery: 'job/setSearchQuery',
      getJobs: 'job/getJobs',
      delJob: 'job/delJob',
    }),
    showModal() {
      this.showTodo = true;
    },
    debouncedSearch: debounce(function() {
      this.getJobs();
    }, 250),
  },
  mounted(){
    this.getJobs()
  },
});
</script>