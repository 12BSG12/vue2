<template>
  <div>
    <a-card title="Задачи">
      <CustomSearchInput v-model="query" :debounceFunc='getTodos'/>
      <a-list item-layout="horizontal" :data-source="todos">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-button
            slot="actions"
            size="small"
            @click="() => showEditForm(item)"
            :disabled="editMode.isEdit"
          >
            <a-icon type="edit" theme="twoTone" />
          </a-button>
          <a-popover slot="actions" title="Удалить задачу?" trigger="hover">
            <div class="alertDel" slot="content">
              <a-button @click="delTodo({item, users})">Да</a-button>
            </div>
            <a-button size="small" type="danger">
              <a-icon type="delete" />
            </a-button>
          </a-popover>
          <a-list-item-meta>
            <div slot="title">
              <TodoEditForm v-if="item.id === editMode.id && editMode.isEdit" />
              <div v-else>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </a-list-item-meta>
        </a-list-item>
        <a-button slot="footer" type="primary" block @click="showAddForm = true"
          >Добавить задачу</a-button
        >
      </a-list>
    </a-card>
    <a-modal v-model="showAddForm" title="Добавить задачу" @ok="showAddForm = false">
      <TodoForm/>
    </a-modal>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import {mapState, mapActions, mapMutations} from 'vuex'
import TodoEditForm from './TodoEditForm.vue'
import TodoForm from './TodoAddForm.vue'
import CustomSearchInput from '@/components/CustomSearchInput.vue'

export default Vue.extend({
  name: 'TodoList',
  components:{
    TodoEditForm,
    TodoForm,
    CustomSearchInput
  },
  data() {
    return {
      showTodo: false,
      showAddForm: false,
    };
  },
  computed: {
    ...mapState({
      editMode: state => state.todo.editMode,
      search: state => state.todo.search,
      todos: state => state.todo.todos,
      updateUsers: state => state.todo.updateUsers,
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
  watch:{
    updateUsers(arr){
      this.setUsers(arr)
    }
  },
  methods: {
    ...mapMutations({
      showEditForm: 'todo/showEditForm',
      setUsers: 'user/setUsers',
    }),
    ...mapActions({
      setSearchQuery: 'todo/setSearchQuery',
      getTodos: 'todo/getTodos',
      delTodo: 'todo/delTodo'
    }),
    showModal() {
      this.showTodo = true;
    }
  },
  mounted(){
    this.getTodos()
  },
});
</script>