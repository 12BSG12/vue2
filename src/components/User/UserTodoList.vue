<template>
  <a-list v-if="todos" item-layout="horizontal" :data-source="todos">
    <a-list-item slot="renderItem" slot-scope="todo">
      <a-card :title="todo.name" style="width: 500px">
        <img class="alertImg" slot="extra" src="@/assets/success.png" />
        <img class="alertImg" slot="extra" src="@/assets/Failed.png" />
        <a-button slot="actions" size="small"
          ><a-icon type="check-circle" theme="twoTone"
        /></a-button>
        <a-button slot="actions" size="small"><a-icon type="edit" theme="twoTone" /></a-button>
        <a-popover slot="actions" title="Удалить задачу?" trigger="hover">
          <div class="alertDel" slot="content">
            <a-button slot="content" size="small" @click="delTodo">Да</a-button>
          </div>
          <a-button size="small" type="danger">
            <a-icon type="delete"/>
          </a-button>
        </a-popover>
        <p>Начало: {{ todo.start }}</p>
        <p>Конец: {{ todo.end }}</p>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script lang="js">
import Vue from 'vue';

export default Vue.extend({
  name: 'UserTodoList',

  props:{
    todos: []
  },
  methods:{
    delTodo() {
    },
  }
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