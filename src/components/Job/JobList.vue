<template>
  <div>
    <a-card title="Должность">
      <a-input-search
        slot="extra"
        placeholder="Поиск"
        :loading="false"
        enter-button
        :value="search"
        @input="setSearch"
      />
      <a-list item-layout="horizontal" :data-source="jobs">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-button
            slot="actions"
            size="small"
            @click="() => showEditForm(item.id)"
            :disabled="editMode.isEdit"
          >
            <a-icon type="edit" theme="twoTone" />
          </a-button>
          <a-popover slot="actions" title="Удалить должность?" trigger="hover">
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
    <a-modal
      :dialog-style="{ top: '20px' }"
      v-model="showTodo"
      title="Информация о задачах"
      @ok="this.showTodo = false"
    >
      <a-button> Добавить задачу </a-button>
      
    </a-modal>
    <a-modal v-model="showAddForm" title="Добавить пользователя" @ok="showAddForm = false">
      
    </a-modal>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex'

export default Vue.extend({
  name: 'JobList',
  components:{
  },
  data() {
    return {
      showTodo: false,
      showAddForm: false,
      todos: [],
    };
  },
  props: {
    jobs: [],
  },

  computed: {
    ...mapState({
      editMode: state => state.user.editMode,
      search: state => state.user.search
    })
  },

  methods: {
    ...mapMutations({
      showEditForm: 'user/showEditForm',
      setSearch: 'user/setSearch'
    }),
    showModal(task) {
      this.todos = task;
      this.showTodo = true;
    },

    delUser() {
    },
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
