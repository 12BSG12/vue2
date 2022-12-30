<template>
  <a-input-search
    slot="extra"
    placeholder="Поиск"
    :loading="false"
    enter-button
    @input="inputSearch"
  />
</template>

<script lang="js">
import Vue from 'vue';
import debounce from 'lodash/debounce';

export default Vue.extend({
  name: 'CustomSearchInput',
  model:{
    prop: 'value',
    event: 'input'
  },
  props:{
    debounceFunc:{
      type: Function,
      require: true
    }
  },
  methods:{
    debouncedSearch: debounce(function() {
      this.debounceFunc();
    }, 250),
    inputSearch(e){
      this.$emit('input', e.target.value)
      this.debouncedSearch();
    }
  }
});
</script>
