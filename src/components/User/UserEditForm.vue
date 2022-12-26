<template>
  <a-form :form="form" class="form" @submit="handleSubmit">
    <a-form-item label="ФИО">
      <a-input
        v-decorator="[
          'fio',
          {
            initialValue: this.editMode.inputValue,
            rules: [{ required: true, message: 'Введите ФИО!' }],
          },
        ]"
      />
    </a-form-item>
    <a-form-item label="Должность" has-feedback>
      <a-select
        v-decorator="[
          'select',
          {
            initialValue: this.editMode.selectValue,
            rules: [{ required: true, message: 'Please select your todo!' }],
          },
        ]"
      >
        <a-select-option v-for="job in jobs" :value="job.name" :key="job.id">{{job.name}}</a-select-option>
      </a-select>
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
  name: 'UserEditForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'validate_other' }),
    };
  },
  computed:{
    ...mapState({
      editMode: state => state.user.editMode,
      jobs: state => state.job.jobs,
    }),
  },
  methods:{
    ...mapMutations({
      closeEditForm: 'user/closeEditForm',
    }),
    ...mapActions({
      updateUser: 'user/updateUser'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.updateUser(values)
        }
      });
    },
  }
});
</script>

<style scoped>
.form .ant-form-item {
  margin: 0;
  max-width: 200px;
}
.formBtn {
  margin-top: 10px;
}
</style>
