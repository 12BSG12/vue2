<template>
  <div>
    <a-card title="Задачи">
      <a-input-search
        slot="extra"
        placeholder="Поиск"
        :loading="false"
        enter-button
        v-model="query"
        @input="debouncedSearch"
      />
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
import debounce from 'lodash/debounce';
import TodoEditForm from './TodoEditForm.vue'
import TodoForm from './TodoAddForm.vue'

export default Vue.extend({
  name: 'TodoList',
  components:{
    TodoEditForm,
    TodoForm
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
      showEditForm: 'todo/showEditForm',
    }),
    ...mapActions({
      setSearchQuery: 'todo/setSearchQuery',
      getTodos: 'todo/getTodos',
      delTodo: 'todo/delTodo'
    }),
    showModal() {
      this.showTodo = true;
    },
    debouncedSearch: debounce(function() {
      this.getTodos();
    }, 250),
  },
  mounted(){
    this.getTodos()
  },
});
</script>