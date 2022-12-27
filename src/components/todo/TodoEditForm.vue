<template>
  <a-form :form="form" class="form" @submit="handleSubmit">
    <a-form-item label="Задача">
      <a-input
        v-decorator="[
          'todo',
          {
            initialValue: this.editMode.value,
            rules: [{ required: true, message: 'Введите задачу!' }],
          },
        ]"
      />
    </a-form-item>
    <div class="formBtn">
      <a-button type="primary" html-type="submit">Сохранить</a-button>
      <a-button style="margin-left: 20px" type="primary" @click="closeEditForm">Отмена</a-button>
    </div>
  </a-form>
</template>

<script lang="js">
import Vue from 'vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default Vue.extend({
  name: 'TodoEditForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'validate_other' }),
    };
  },
  computed:{
    ...mapState({
      editMode: state => state.todo.editMode,
      users: state => state.user.users
    }),
  },
  methods:{
    ...mapMutations({
      closeEditForm: 'todo/closeEditForm'
    }),
    ...mapActions({
      updateTodo: 'todo/updateTodo'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.updateTodo({values, users: this.users})
        }
      });
    },
  }
});
</script>

<style scoped>
.form .ant-form-item {
  margin: 0;
}
.formBtn {
  margin-top: 10px;
}
</style>
