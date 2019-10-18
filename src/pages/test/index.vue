<template>
  <div class="test">
    <div id="editor" ref="editor"></div>
  </div>
</template>
<script>
import Muya from 'muya';
console.log('Muya', Muya);
export default {
  name: 'Test',
  mounted () {
    this.initEditor();
  },
  methods: {
    initEditor () {
      const container = this.$refs.editor;
      const muya = new Muya(container);
      console.log('muya', muya);
    }
  }
};
</script>
<style lang="scss" scoped>

</style>