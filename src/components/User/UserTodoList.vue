<template>
  <a-list v-if="todos" item-layout="horizontal" :data-source="todos">
    <a-list-item slot="renderItem" slot-scope="todo">
      <a-card :title="todo.name" style="width: 500px">
        <img v-if="todo.pending" class="alertImg" slot="extra" src="@/assets/time.png" />
        <img v-if="todo.fulfilled" class="alertImg" slot="extra" src="@/assets/success.png" />
        <img v-if="todo.rejected" class="alertImg" slot="extra" src="@/assets/Failed.png" />
        <a-popover slot="actions" title="Завершить задачу?" trigger="hover">
          <div class="alertDel" slot="content">
            <a-button
              slot="content"
              size="small"
              @click="updateUserTodoStatus(todo)"
              :disabled="todo.fulfilled || todo.rejected"
              >Да</a-button
            >
          </div>
          <a-button size="small"><a-icon type="check-circle" theme="twoTone" /></a-button>
        </a-popover>
        <a-button
          slot="actions"
          size="small"
          @click="showEditTodoForm(todo)"
          :disabled="editModeTodo.isEdit || todo.fulfilled"
          ><a-icon type="edit" theme="twoTone"
        /></a-button>
        <a-popover slot="actions" title="Удалить задачу?" trigger="hover">
          <div class="alertDel" slot="content">
            <a-button slot="content" size="small" @click="delUserTodo(todo.id)">Да</a-button>
          </div>
          <a-button size="small" type="danger">
            <a-icon type="delete" />
          </a-button>
        </a-popover>
        <UserEditTodoForm v-if="todo.id === editModeTodo.id && editModeTodo.isEdit" />
        <div v-else>
          <p>Начало: {{ todo.start }}</p>
          <p>Конец: {{ todo.end }}</p>
        </div>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script lang="js">
import Vue from 'vue';
import UserEditTodoForm from './UserEditTodoForm.vue'
import {mapState, mapMutations, mapActions} from 'vuex'

export default Vue.extend({
  name: 'UserTodoList',
  components:{
    UserEditTodoForm
  },
  props:{
    todos: [],
  },
  computed:{
    ...mapState({
      editModeTodo: state => state.user.editModeTodo,
    }),
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if(!this.editModeTodo.isEdit){
        this.checkRejectUserTodoStatus()
      }
    }, 20000);
  },
  methods:{
    ...mapMutations({
      showEditTodoForm: 'user/showEditTodoForm',
    }),
    ...mapActions({
      delUserTodo: 'user/delUserTodo',
      updateUserTodoStatus: 'user/updateUserTodoStatus',
      checkRejectUserTodoStatus: 'user/checkRejectUserTodoStatus',
    }),
    clearSetInterval(){
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    }
  },
});
</script>

<style scoped>
.alertImg {
  width: 30px;
}
.alertDel {
  display: flex;
  justify-content: space-evenly;
}
</style>
