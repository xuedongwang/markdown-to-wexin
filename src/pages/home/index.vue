<template>
  <div class="container">
    <page-header/>
    <!-- Article Info display start  -->
    <!-- <el-row>
      <el-col :span="24">
        <div class="doc-title-wrapper">
          <div class="lebel">Document Name</div>
          <el-input v-model="docTitle" class="doc-title" placeholder=""></el-input>
        </div>
      </el-col>
    </el-row> -->
    <!-- Article Info display end  -->
    <main class="main">
      <div class="editor-wrapper">
        <div class="markdown-editor">
          <div class="editor-header">
            <div class="part-name">markdown</div>
          </div>
          <div class="editor-body">
            <!-- <div class="row-number">
              <div class="num" v-for="n of lineCount" :key="n">{{n}}</div>
            </div> -->
            <el-input
              class="markdown-input"
              type="textarea"
              placeholder="请输入内容"
              v-model="markdownInputValue">
            </el-input>
          </div>
        </div>
        <div class="markdown-preview">
          <div class="preview-header">
            <div class="part-name">preview</div>
            <div class="control">
              <el-button type="primary" size="small" class="copy-btn" data-clipboard-action="cut" data-clipboard-target="#preview" @click="handleCopy">复制</el-button>
              <!-- <el-button type="primary" size="small" @click="handleCopy">复制1</el-button> -->
            </div>
          </div>
          <div class="preview-body" id="preview-body">
            <div class="markdown-body" id="preview" v-html="marked"></div>
          </div>
        </div>
      </div>
    </main>
    <!-- <footer class="footer">
      footer
    </footer> -->
  </div>
</template>
<script>
import juice from 'juice';
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
      docTitle: '',
      markdownInputValue: ''
    };
  },
  computed: {
    marked () {
      return marked(this.markdownInputValue);
    },
    lineCount () {
      return this.markdownInputValue.split(/\n/).length
    }
  },
  mounted () {
    this.initClipboard();
  },
  methods: {
    handleCopy () {
      if (!this.markdownInputValue.trim().length) {
        this.$message({
          type: 'error',
          message: '请输入内容'
        });
        return;
      }
      this.$message({
        type: 'warning',
        message: '复制区域已选择，请使用 Ctrl + C 进行复制'
      });
    },
    // handleCopy () {
    //   const previewEl = document.getElementById('preview-body');
    //   const basicStyle = element.innerText;
    //   const result = juice.inlineContent(
    //     previewEl.innerHTML,
    //     basicStyle,
    //     {
    //       inlinePseudoElements: true
    //     }
    //   );
    //   console.log('result', element.innerHTML);
    // },
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
  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
  /* customer style */
  & /deep/ {
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
      font-size: 18px;
      font-weight: bold;
      color: #00CA9D;
    }
    :not(pre) {
      code {
        /* color: #c7254e;
        background-color: #f9f2f4; */
      }
    }
  }
}

.doc-title-wrapper {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  .lebel {
    font-size: 12px;
    letter-spacing: 1px;
    color: #a0aabf;
    text-transform: uppercase;
  }
  .doc-title {
    margin-top: 14px;
  }
}
.editor-wrapper {
  display: flex;
  height: calc(100vh - 61px);
  .markdown-editor {
    width: 50%;
    .editor-header {
      display: flex;
      align-items: center;
      padding: 0 20px;
      font-size: 12px;
      letter-spacing: 1px;
      height: 42px;
      color: #a0aabf;
      text-transform: uppercase;
      border-bottom: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
    }
    .editor-body {
      display: flex;
      height: calc(100% - 43px);
      overflow: scroll;
      position: relative;
      border-right: 1px solid #e8e8e8;
      .row-number {
        width: 40px;
        text-align: center;
        font-size: 14px;
        line-height: 2;
        color: #A0AABF;
        background: #f5f7fa;
      }
      .markdown-input {
        & /deep/ .el-textarea__inner {
          height: 100% !important;
          padding: 10px;
          border: 0;
          border-radius: 0;
          resize: none;
          font-size: 14px;
          line-height: 2;
        }
      }
    }
  }
  .markdown-preview {
    width: 50%;
    .preview-header {
      display: flex;
      align-items: center;
      padding: 0 20px;
      justify-content: space-between;
      height: 42px;
      font-size: 12px;
      letter-spacing: 1px;
      color: #a0aabf;
      text-transform: uppercase;
      border-bottom: 1px solid #e8e8e8;
    }
    .preview-body {
      padding: 10px;
      height: calc(100% - 43px);
      overflow: scroll;
    }
  }
}
</style>
