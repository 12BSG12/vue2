<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="Задача">
      <a-input v-decorator="['todo', { rules: [{ required: true, message: 'Введите задачу!' }] }]" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="js">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'TodoForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods:{
    ...mapActions({
      createTodo: 'todo/createTodo'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.createTodo(values)
        }
      });
    },
  }
});
</script>

