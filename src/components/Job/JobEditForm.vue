<template>
  <a-form :form="form" class="form" @submit="handleSubmit">
    <a-form-item label="Должность">
      <a-input
        v-decorator="[
          'job',
          {
            initialValue: this.editMode.value,
            rules: [{ required: true, message: 'Введите должность!' }],
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
import {mapState, mapMutations} from 'vuex'

export default Vue.extend({
  name: 'jobEditForm',
  data() {
    return {
      form: this.$form.createForm(this, { name: 'validate_other' }),
    };
  },
  computed:{
    ...mapState({
      editMode: state => state.job.editMode,
    }),
  },
  methods:{
    ...mapMutations({
      closeEditForm: 'job/closeEditForm'
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
.formBtn {
  margin-top: 10px;
}
</style>
