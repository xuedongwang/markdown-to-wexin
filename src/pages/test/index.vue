<template>
  <div class="edtor-container">
    <header class="header">header</header>
    <div class="editor-wrapper">
      <el-input
        v-show="isEdit"
        class="textarea"
        type="textarea"
        placeholder="请输入内容"
        v-model="markdownInputValue"
      >
      </el-input>
      <div class="markdown-preview" v-show="!isEdit">
        <div class="markdown-body" id="preview" v-html="marked"></div>
      </div>
    </div>
    <aside class="aside">
      <div class="help" @click="handlePreviewMarkdown"></div>
    </aside>
  </div>
</template>
<script>
import marked from 'marked';
import Prism from '@/libs/prismjs';
import '@/libs/github-markdown-css';
import '@/libs/prismjs/themes/prism-okaidia.css';
const renderer = new marked.Renderer();
renderer.code = function(code, infostring, escaped) {
  var lang = (infostring || '').match(/\S*/)[0];
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre class="'+this.options.langPrefix+'"><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  return '<pre class="'+this.options.langPrefix+escape(lang, true)+'"><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n';
};
marked.setOptions({
  baseUrl: null,
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: 'header-',
  highlight: function (code, infostring, escaped) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
  langPrefix: 'language-',
  mangle: true,
  pedantic: false,
  renderer,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tables: true,
  xhtml: false
});
export default {
  name: 'Test',
  data () {
    return {
      isEdit: true,
      markdownInputValue: ''
    };
  },
  computed: {
    marked () {
      return marked(this.markdownInputValue);
    }
  },
  mounted () {
    this.initEditor();
  },
  methods: {
    initEditor () {},
    handlePreviewMarkdown () {
      this.isEdit = !this.isEdit;
    }
  }
};
</script>
<style lang="scss" scoped>
$pure-black: #000;
$main-black: #2f2f2f;
$tip: #888;
$help: #b2b2b2;
.edtor-container {
  background: rgb(248, 248, 248);
  .editor-wrapper {
    width: 793.733px;
    height: 1122.53px;
    padding: 100px 80px;
    margin-top: 0px;
    margin: 0 auto;
    background: rgb(255, 255, 255);
    position: relative;
    cursor: text;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.06);
    overflow: hidden;
    box-sizing: border-box;
    overflow: scroll;
    .textarea {
      width: 100%;
      height: 100%;
      /deep/ {
        textarea {
          width: 100%;
          height: 100%;
          border: 0;
          padding: 0;
          resize: none;
          font-size: 15px;
          word-spacing: 1.5px;
          line-height: 1.75;
          text-align: justify;
          color: $main-black;
        }
      }
    }
  }
  /* .markdown-preview {
    .markdown-body {
      font-family: 'PingFang SC', 'Lantinghei SC', 'Microsoft Yahei', 'Hiragino Sans GB', 'Microsoft Sans Serif', 'WenQuanYi Micro Hei', 'sans';
      & /deep/ {
        p,
        li,
        strong {
          color: $main-black;
          font-size: 15px;
          line-height: 1.75;
          word-spacing: 1.5px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-size: 18px;
          font-weight: bold;
          color: #00CA9D;
        }
      }
    }
  } */
  .aside {
    .help {
      position: fixed;
      bottom: 50px;
      right: 20px;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
      cursor: pointer;
      background-color: #fff;
    }
  }
}
</style>