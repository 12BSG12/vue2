<template>
  <a-form v-bind="formItemLayout" :form="form" class="form" @submit="handleSubmit">
    <a-form-item has-feedback >
      <a-select  v-decorator="['select', selectConfig]" placeholder="Please select a todo">
        <a-select-option v-for="todo in todos" :value="todo.name" :key="todo.id">{{todo.name}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-range-picker v-decorator="['range-picker', rangeConfig]" />
    </a-form-item>
    <div class="formBtn">
      <a-button type="primary" html-type="submit">Добавить</a-button>
      <a-button style="margin-left: 60px" type="primary" @click="closeAddTodoForm">Отмена</a-button>
    </div>
  </a-form>
</template>

<script lang="js">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'UserAddTodoForm',
  props: {
    closeAddTodoForm: {
      type: Function,
      require: true
    }
  },
  data() {  
    return {
      formItemLayout: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      },
      selectConfig: {
        rules: [{ required: true, message: 'Please select your todo!' }] 
      },
      rangeConfig: {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
      },
      form: this.$form.createForm(this, { name: 'validate_other' }),
    };
  },
  computed:{
    ...mapState({
      todos: state => state.todo.todos,
    }),
  },
  methods:{
    ...mapActions({
      createUserTodo: 'user/createUserTodo'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const rangeValue = fieldsValue['range-picker'];

        const values = {
          ...fieldsValue,
          'range-picker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };
        console.log('Received values of form: ', values);
        this.createUserTodo(values)
        this.closeAddTodoForm()
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
