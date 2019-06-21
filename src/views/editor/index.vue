<template>
  <div class="editor">
    <div class="code">
      <div class="title">
        <h3>代码编辑器</h3>
        <div class="btns">
          <i-button size="small" type="warning" style="margin-right:10px" @click="reset">重置</i-button>
          <i-button size="small" type="success" style="margin-right:10px" @click="run">运行</i-button>
        </div>

      </div>
      <tabs value="html" class="tabs">
        <tab-pane label="HTML" name="html">
          <div class="html-editor" ref="html-editor"></div>
        </tab-pane>
        <tab-pane label="JS" name="js">
          <div class="js-editor" ref="js-editor"></div>
        </tab-pane>
      </tabs>
    </div>
    <div class="pre-view" ref="preView"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import * as axios from 'axios'
const name = 'Editor'
import { Button, Tabs, TabPane } from 'iview'
export default {
  name,
  components: {
    IButton: Button,
    Tabs,
    TabPane
  },
  data() {
    return {
      splitVal: 0.4,
      htmlEditor: null,
      jsEditor: null,
      exampleHtml: '',
      previewHtml: '',
      htmlStr: '',
      jsStr: ''
    }
  },
  methods: {
    initEditor() {
      let config = {
        theme: 'vs-dark',
        formatOnPaste: true,
        fontSize: 14,
        scrollbar: {
          verticalScrollbarSize: 2
        }
      }
      this.htmlEditor = monaco.editor.create(this.$refs['html-editor'], {
        value: this.htmlStr,
        language: 'html',
        ...config
      })
      this.jsEditor = monaco.editor.create(this.$refs['js-editor'], {
        value: this.jsStr,
        language: 'javascript',
        ...config
      })
      this.loadPreview()
    },

    reset() {
      if (this.exampleHtml) {
        let index = this.exampleHtml.indexOf('<script>')
        this.htmlStr = this.exampleHtml.substr(0, index)
        this.jsStr = this.exampleHtml.substr(index).replace(/<\/?script>\n/g, '')
        this.htmlEditor.setValue(this.htmlStr)
        this.jsEditor.setValue(this.jsStr)
        this.loadPreview()
      }
    },
    run() {
      this.htmlStr = this.htmlEditor.getValue()
      this.jsStr = this.jsEditor.getValue()
      this.loadPreview()
    },
    loadPreview() {
      let iFrame = this.createIFrame()
      iFrame.contentWindow['Cesium'] = window.Cesium
      let iframeDocument = iFrame.contentWindow.document
      iframeDocument.open()
      let content = this.htmlStr + '<script>' + this.jsStr + '<' + '/script>'
      iframeDocument.write(this.previewHtml.replace('<bodyhtml/>', content))
      iframeDocument.close()
      iframeDocument.addEventListener('load', function() {
        // mapHeight()
      })
      //mapHeight()
    },
    getExamplePage() {
      return axios.get('/pages/01_TDT.html')
    },
    getPreviewPage() {
      return axios.get('/pages/preview.html')
    },
    createIFrame() {
      var preViewPane = this.$refs['preView']
      preViewPane.innerHTML = ''
      var iframe = document.createElement('iframe')
      iframe.setAttribute('id', 'innerPage')
      iframe.setAttribute('name', 'innerPage')

      preViewPane.append(iframe)
      return iframe
    }
  },
  mounted() {
    this.splitVal = 0.4
    axios.all([this.getExamplePage(), this.getPreviewPage()]).then(
      axios.spread((example, preview) => {
        this.exampleHtml = example.data
        this.previewHtml = preview.data
        if (this.exampleHtml && this.previewHtml) {
          let index = this.exampleHtml.indexOf('<script>')
          this.htmlStr = this.exampleHtml.substr(0, index)
          this.jsStr = this.exampleHtml.substr(index).replace(/<\/?script>\n/g, '')
          this.initEditor()
        }
      })
    )
  }
}
</script>

<style lang="scss">
.editor {
  .ivu-tabs-bar {
    margin-bottom: 1px;
  }
}
</style>


<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 100%;
  display: flex;
  .code {
    width: 600px;
    height: 100%;
    border-right: 1px solid #cecece;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h3 {
        margin-left: 5px;
        color: #cecece;
      }
      .btns {
        text-align: right;
        padding-top: 5px;
      }
    }
    .tabs {
      width: 100%;
      height: calc(100% - 30px);
    }
    .html-editor,
    .js-editor {
      width: 600px;
      height: 820px;
    }
  }
  .pre-view {
    width: calc(100% - 600px);
    height: 100%;
    overflow: hidden;
  }
}
</style>
