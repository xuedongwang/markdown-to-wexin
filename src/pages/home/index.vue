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
              <el-button type="primary" size="small" @click="handleOpenDrawer">设置样式</el-button>
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
    <vue-drawer :visible.sync="visible" placement="left" width="500px">
      <div slot="header">
        <div class="title">编辑样式</div>
      </div>
      <div slot="body">
        <div class="row">
          <h2 class="title">标题</h2>
          <div class="item">
            <div class="label">颜色</div>
            <div class="value">
              <el-color-picker v-model="config.title.color" size="small"></el-color-picker>
            </div>
          </div>
          <div class="item">
            <div class="label">字体大小</div>
            <div class="value">
              <el-slider
                v-model="config.title.fontSize"
                :min="10"
                :max="40"
                :step="1"
                show-stops>
              </el-slider>
            </div>
          </div>
          <div class="item">
            <div class="label">行高</div>
            <div class="value">
              <el-slider
                v-model="config.title.lineHeight"
                :min="1"
                :max="4"
                :step="0.01"
                show-stops>
              </el-slider>
            </div>
          </div>
        </div>

        <div class="row">
          <h2 class="title">文本</h2>
          <div class="item">
            <div class="label">颜色</div>
            <div class="value">
              <el-color-picker v-model="config.paragraph.color" size="small"></el-color-picker>
            </div>
          </div>
          <div class="item">
            <div class="label">字体大小</div>
            <div class="value">
              <el-slider
                v-model="config.paragraph.fontSize"
                :min="10"
                :max="40"
                :step="1"
                show-stops>
              </el-slider>
            </div>
          </div>
          <div class="item">
            <div class="label">行高</div>
            <div class="value">
              <el-slider
                v-model="config.paragraph.lineHeight"
                :min="1"
                :max="4"
                :step="0.01"
                show-stops>
              </el-slider>
            </div>
          </div>
        </div>

        <div class="row">
          <h2 class="title">链接</h2>
          <div class="item">
            <div class="label">颜色</div>
            <div class="value">
              <el-color-picker v-model="config.link.color" size="small"></el-color-picker>
            </div>
          </div>
          <div class="item">
            <div class="label">字体大小</div>
            <div class="value">
              <el-slider
                v-model="config.link.fontSize"
                :min="10"
                :max="40"
                :step="1"
                show-stops>
              </el-slider>
            </div>
          </div>
          <div class="item">
            <div class="label">行高</div>
            <div class="value">
              <el-slider
                v-model="config.link.lineHeight"
                :min="1"
                :max="4"
                :step="0.01"
                show-stops>
              </el-slider>
            </div>
          </div>
        </div>

        <div class="control">
          <el-button type="primary" size="small" @click="handleResetDefaultStyle">恢复默认</el-button>
        </div>

        <!-- <div class="row">
          <h2 class="title">代码主题</h2>
          <div class="item">
            <div class="value">
              <el-select v-model="config.codeStyle" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </div> -->
      </div>
    </vue-drawer>
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

const defaultStyleConfig = {
  title: {
    color: '#00CA9D',
    fontSize: 18,
    lineHeight: 1.25
  },
  paragraph: {
    color: '#24292e',
    fontSize: 15,
    lineHeight: 1.5
  },
  link: {
    color: '#0366d6',
    fontSize: 15,
    lineHeight: 1.5
  },
  codeStyle: 'solarizedlight'
};

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
      markdownInputValue: '',
      visible: false,
      config: {
        title: {
          color: '#00CA9D',
          fontSize: 18,
          lineHeight: 1.25
        },
        paragraph: {
          color: '#24292e',
          fontSize: 15,
          lineHeight: 1.5
        },
        link: {
          color: '#0366d6',
          fontSize: 15,
          lineHeight: 1.5
        },
        codeStyle: 'solarizedlight'
      },
      options: [{
        value: 'coy',
        label: 'coy'
      }, {
        value: 'dark',
        label: 'dark'
      }, {
        value: 'funky',
        label: 'funky'
      }, {
        value: 'okaidia',
        label: 'okaidia'
      }, {
        value: 'solarizedlight',
        label: 'solarizedlight'
      }, {
        value: 'twilight',
        label: 'twilight'
      }, {
        value: 'tomorrow',
        label: 'tomorrow'
      }, {
        value: 'default',
        label: 'default'
      }]
    };
  },
  computed: {
    marked () {
      return marked(this.markdownInputValue);
    }
  },
  mounted () {
    this.init();
    this.initClipboard();
  },
  methods: {
    handleResetDefaultStyle () {
      this.config = defaultStyleConfig;
    },
    handleOpenDrawer () {
      this.visible = true;
    },
    init () {
      const currentArticle = localStorage.getItem('currentArticle');
      const config = localStorage.getItem('userStyleConfig');
      if (currentArticle) {
        this.markdownInputValue = currentArticle;
      }
      if (config) {
        this.config = JSON.parse(config);
      }
    },
    initEvent () {
      const _this = this;
      document.addEventListener('paste', function (event) {
        var items = event.clipboardData && event.clipboardData.items;
        var file = null;
        if (items && items.length) {
          // 检索剪切板items
          for (var i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') !== -1) {
              file = items[i].getAsFile();
              break;
            }
          }
        }
        // 此时file就是剪切板中的图片文件
        /* eslint-disable */
        var reader = new FileReader();
        reader.onload = (event) => {
          _this.markdownInputValue += `asdasd`;
          document.body.innerHTML += '<img src="' + event.target.result + '" class="upload-image">';
        };
        reader.readAsDataURL(file);
      });
    },
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
      clipboard.on('success', () => {
        console.log('document.getSelection()', document.getSelection());
      });
      clipboard.on('error', (e) => {
        console.error('Action:', e.action);
      });
    },
    saveCurrentArticle (article) {
      localStorage.setItem('currentArticle', article);
      this.$store.commit('SAVE_CURRENT_ARTICLE', article);
    },
    setConfig (config) {
      localStorage.setItem('userStyleConfig', JSON.stringify(config));
      this.$store.commit('SAVE_STYLE_CONFIG', this.config);
    },
    setStyle (styleConfig) {
      const titleStyleEl = document.createElement('style');
      titleStyleEl.id = 'title-style';
      titleStyleEl.type = 'text/css'; 
      const titleStyle = `
        #preview [id^="header-"] {
          color: ${styleConfig.title.color};
          font-size: ${styleConfig.title.fontSize}px;
          line-height: ${styleConfig.title.lineHeight};
        }
        #preview p {
          color: ${styleConfig.paragraph.color};
          font-size: ${styleConfig.paragraph.fontSize}px;
          line-height: ${styleConfig.paragraph.lineHeight};
        }
        #preview a {
          color: ${styleConfig.link.color};
          font-size: ${styleConfig.link.fontSize}px;
          line-height: ${styleConfig.link.lineHeight};
        }
      `;
      // titleStyleEl.innerHTML += titleStyle;
      const textNode = document.createTextNode(titleStyle);
      titleStyleEl.appendChild(textNode); 
      document.head.appendChild(titleStyleEl);
    }
  },
  components: {
    PageHeader
  },
  watch: {
    markdownInputValue (newValue) {
      // localStorage.setItem('currentArticle', newValue);
      this.saveCurrentArticle(newValue);
    },
    config: {
      handler (newValue) {
        this.setStyle(newValue);
        this.setConfig(newValue);
      },
      deep: true
    }
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
      font-size: 14px;
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
