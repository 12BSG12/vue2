<template>
  <a-form v-bind="formItemLayout" :form="form" class="form" @submit="handleSubmit">
    <a-form-item>
      <a-range-picker
        v-decorator="[
          'range-picker',
          {
            initialValue: [editMode.dataStart, editMode.dataEnd],
            rules: [{ type: 'array', required: true, message: 'Please select time!' }],
          },
        ]"
      />
    </a-form-item>
    <div class="formBtn">
      <a-button type="primary" html-type="submit">Сохранить</a-button>
      <a-button style="margin-left: 30px" type="primary" @click="closeEditTodoForm"
        >Отмена</a-button
      >
    </div>
  </a-form>
</template>

<script lang="js">
import { isMoment } from 'moment';
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex'

export default Vue.extend({
  name: 'UserEditTodoForm',
  data() {
    return {
      formItemLayout: {
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      },
      rangeConfig: {

      },
      form: this.$form.createForm(this, { name: 'time_related_controls' }),
    };
  },
  computed:{
    ...mapState({
      editMode: state => state.user.editModeTodo,
    }),
  },
  methods:{
    ...mapMutations({
      closeEditTodoForm: 'user/closeEditTodoForm'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }
        const rangeValue = fieldsValue['range-picker'];
        console.log(fieldsValue);
        const values = {
          ...fieldsValue,
          'range-picker': isMoment(rangeValue[0]) ? [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]: rangeValue,
        };
        console.log('Received values of form: ', values);
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
