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
          <a-button slot="actions" size="small" @click="() => showModal(item.task)">
            Задачи
          </a-button>
          <a-button
            slot="actions"
            size="small"
            @click="() => showEditForm(item.id)"
            :disabled="editMode.isEdit"
          >
            <a-icon type="edit" theme="twoTone" />
          </a-button>
          <a-popover slot="actions" title="Удалить пользователя?" trigger="hover">
            <div class="alertDel" slot="content">
              <a-button @click="delUser">Да</a-button>
            </div>
            <a-button size="small" type="danger">
              <a-icon type="delete" />
            </a-button>
          </a-popover>
          <a-list-item-meta>
            <div slot="title">
              <UserEditForm v-if="item.id === editMode.id && editMode.isEdit" />
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
      @ok="showTodo = false"
    >
      <a-button> Добавить задачу </a-button>
      <UserTodoList :todos="todos" />
    </a-modal>
    <a-modal v-model="showAddForm" title="Добавить пользователя" @ok="showAddForm = false">
      <UserForm />
    </a-modal>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import UserForm from "./UserAddForm.vue";
import UserTodoList from "./UserTodoList.vue";
import UserEditForm from "./UserEditForm.vue";
import {mapState, mapMutations, mapActions} from 'vuex'
import debounce from 'lodash/debounce';

export default Vue.extend({
  name: 'UsersList',
  components:{
    UserForm,
    UserTodoList,
    UserEditForm
  },
  data() {
    return {
      showTodo: false,
      showAddForm: false,
      todos: [],
    };
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
    }
  },

  methods: {
    ...mapMutations({
      showEditForm: 'user/showEditForm',
      setSearch: 'user/setSearch'
    }),
    ...mapActions({
      setSearchQuery: 'user/setSearchQuery',
      getUsers: 'user/getUsers'
    }),
    showModal(task) {
      this.todos = task;
      this.showTodo = true;
    },
    debouncedSearch: debounce(function () {
      this.getUsers();
    }, 250),
    delUser() {
    },
  },
  mounted(){
    this.getUsers()
  },
});
</script>

<style scoped>
.alertDel {
  display: flex;
  justify-content: space-evenly;
}
.userInfo {
  display: flex;
  flex-direction: column;
}
</style>
