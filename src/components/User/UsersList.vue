<template>
  <div>
    <a-card title="Пользователи">
      <a-input-search
        slot="extra"
        placeholder="Поиск"
        :loading="false"
        enter-button
        v-model="query"
        @input="debouncedSearch"
      />
      <a-list item-layout="horizontal" :data-source="users">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-button slot="actions" size="small" @click="showModal(item)"> Задачи </a-button>
          <a-button
            slot="actions"
            size="small"
            @click="showEditForm(item)"
            :disabled="editMode.isEdit"
          >
            <a-icon type="edit" theme="twoTone" />
          </a-button>
          <a-popover slot="actions" title="Удалить пользователя?" trigger="hover">
            <div class="alertDel" slot="content">
              <a-button @click="delUser(item.id)">Да</a-button>
            </div>
            <a-button size="small" type="danger">
              <a-icon type="delete" />
            </a-button>
          </a-popover>
          <a-list-item-meta>
            <div slot="title">
              <UserEditForm v-if="item.id === editMode.id && editMode.isEdit" :showJobForm="showJobForm"/>
              <div v-else class="userInfo">
                <span>{{ item.FIO }}</span>
                <span>{{ item.job }}</span>
              </div>
            </div>
            <a-avatar slot="avatar"><a-icon type="user" /></a-avatar>
          </a-list-item-meta>
        </a-list-item>
        <a-button slot="footer" type="primary" block @click="showAddForm = true"
          >Добавить пользователя</a-button
        >
      </a-list>
    </a-card>
    <a-modal
      :dialog-style="{ top: '20px' }"
      v-model="showTodo"
      title="Информация о задачах"
      :closable="false"
      :maskClosable="false"
      okText="Выход"
      @ok="closeTodoModel"
    >
      <a-button v-if="!showAddTodoForm" @click="showAddTodoForm = true"> Добавить задачу </a-button>
      <UserAddTodoForm v-else :closeAddTodoForm="closeAddTodoForm" />
      <UserTodoList v-if="showTodo" :todos="todos" ref="myChild" />
    </a-modal>
    <a-modal v-model="showAddForm" title="Добавить пользователя" @ok="showAddForm = false">
      <UserForm />
    </a-modal>
    <a-modal v-model="showAddJobForm" title="Добавить должность" @ok="showAddJobForm = false">
      <JobForm />
    </a-modal>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import UserForm from "./UserAddForm.vue";
import UserTodoList from "./UserTodoList.vue";
import UserEditForm from "./UserEditForm.vue";
import UserAddTodoForm from "./UserAddTodoForm.vue";
import JobForm from "../Job/JobAddForm.vue";
import {mapState, mapMutations, mapActions} from 'vuex'
import debounce from 'lodash/debounce';

export default Vue.extend({
  name: 'UsersList',
  components:{
    UserForm,
    UserTodoList,
    UserEditForm,
    UserAddTodoForm,
    JobForm
  },
  data() {
    return {
      showTodo: false,
      showAddForm: false,
      showAddTodoForm: false,
      showAddJobForm: false,
      todos: [],
      id: 0, 
    };
  },
  watch: {
    users(arr){
      const newTodo = arr.find(item => item.id === this.id)?.task
      if(newTodo){
        this.todos = newTodo
      }
    },
  },
  computed: {
    ...mapState({
      editMode: state => state.user.editMode,
      search: state => state.user.search,
      users: state => state.user.users
    }),
    query: {
      get() {
        return this.search;
      },
      set(val) {
        return this.setSearchQuery(val);
      }
    },
  },

  methods: {
    ...mapMutations({
      showEditForm: 'user/showEditForm',
      setTodoUserInfo: 'user/setTodoUserInfo',
    }),
    ...mapActions({
      setSearchQuery: 'user/setSearchQuery',
      getUsers: 'user/getUsers',
      delUser: 'user/delUser',
    }),
    showModal(item) {
      this.id = item.id;
      this.todos = item.task;
      this.showTodo = true;
      this.setTodoUserInfo(item)
    },
    debouncedSearch: debounce(function() {
      this.getUsers();
    }, 250),
    closeAddTodoForm(){
      this.showAddTodoForm = false;
    },
    showJobForm(){
      this.showAddJobForm = true;
    },
    closeTodoModel(){
      this.showTodo = false
      this.$refs.myChild.clearSetInterval()
    }
  },
  mounted(){
    this.getUsers()
  },
});
</script>

<style scoped>
.userInfo {
  display: flex;
  flex-direction: column;
}
</style>
