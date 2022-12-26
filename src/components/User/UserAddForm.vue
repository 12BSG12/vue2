<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
    <a-form-item label="ФИО">
      <a-input v-decorator="['fio', { rules: [{ required: true, message: 'Введите ФИО!' }] }]" />
    </a-form-item>
    <a-form-item label="Должность" has-feedback>
      <a-select
        v-decorator="[
          'job',
          {
            rules: [{ required: true, message: 'Please select your job!' }],
          },
        ]"
      >
        <a-select-option v-for="job in jobs" :value="job.name" :key="job.id">{{job.name}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit"> Submit </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="js">
import Vue from 'vue';
import {mapActions, mapState} from 'vuex'

export default Vue.extend({
  name: 'UserForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  computed:{
    ...mapState({
      jobs: state => state.job.jobs,
    }),
  },
  methods:{
    ...mapActions({
      createUser: 'user/createUser'
    }),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.createUser(values)
        }
      });
    },
  }
});
</script>

