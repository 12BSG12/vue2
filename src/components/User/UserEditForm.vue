<template>
  <a-form :form="form"  class="form" @submit="handleSubmit">
    <a-form-item label="ФИО">
      <a-input v-decorator="['fio', { rules: [{ required: true, message: 'Введите ФИО!' }] }]" />
    </a-form-item>
    <a-form-item label="Должность" has-feedback >
      <a-select default-value="1">
        <a-select-option value="1">
          Option 1
        </a-select-option>
        <a-select-option value="2">
          Option 2
        </a-select-option>
        <a-select-option value="3">
          Option 3
        </a-select-option>
      </a-select>
    </a-form-item>
    <div class="formBtn">
      <a-button type="primary" html-type="submit">Обновить</a-button>
      <a-button style="margin-left: 20px" type="primary" @click="closeEditForm">Закрыть</a-button>
    </div>
  </a-form>
</template>

<script lang="js">
import Vue from 'vue';
import {mapState, mapMutations} from 'vuex'

export default Vue.extend({
  name: 'UserEditForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  computed: {
    ...mapState({
      editMode: state => state.user.editMode
    })
  },
  methods:{
    ...mapMutations({
      closeEditForm: 'user/closeEditForm'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
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
.formBtn{
  margin-top: 10px;
}
</style>
