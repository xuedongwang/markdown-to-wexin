<template>
  <div class="container">
    <page-header/>
    <main class="main">
      <button class="copy-btn" data-clipboard-action="cut" data-clipboard-target="#preview">copy</button>
      <div class="editor-wrapper">
        <div class="markdown-editor">
          <textarea v-model="markdownInputValue"></textarea>
        </div>
        <div class="markdown-preview">
          <div class="markdown-body" id="preview" v-html="marked"></div>
        </div>
      </div>
    </main>
    <footer class="footer">
      footer
    </footer>
  </div>
</template>
<script>
import PageHeader from '@/components/PageHeader';
import marked from 'marked';
import Clipboard from 'clipboard';
import Prism from '@/libs/prismjs';
import '@/libs/github-markdown-css';
import '@/libs/prismjs/themes/prism-solarizedlight.css';

marked.setOptions({
  baseUrl: null,
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'header-',
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
  langPrefix: 'language-',
  mangle: true,
  pedantic: false,
  renderer: new marked.Renderer(),
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tables: true,
  xhtml: false
});

export default {
  name: 'Home',
  data () {
    return {
      markdownInputValue: ''
    };
  },
  computed: {
    marked () {
      return marked(this.markdownInputValue);
    }
  },
  mounted () {
    this.initClipboard();
  },
  methods: {
    initClipboard () {
      const clipboard = new Clipboard('.copy-btn');
      console.dir(clipboard);
      clipboard.on('success', () => {
        console.log('document.getSelection()', document.getSelection());
      });
      clipboard.on('error', (e) => {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    }
  },
  components: {
    PageHeader
  }
};
</script>
<style lang="scss" scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
  /* customer style */
  p {
    font-size: 15px;
  }
  pre {
    font-size: 13px;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #1989fa;
  }
}
</style>
