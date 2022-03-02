import 'amis/lib/themes/default.css';
import 'amis/lib/themes/ang.css';
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/sdk.css';
import 'amis-editor/dist/style.css';
import { Editor } from "amis-editor";
import { Layout, Switch, render as renderAmis } from 'amis';
import React from 'react';
import './PageEditor.css'
import PageShow from './PageShow';

// 页面编辑器

class PageEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPreview: false,
      isMobile: false,
      theme: 'ang',
      schema: {}
    }
  }

  onChange(value) {
    this.setState({
      schema: value
    });
  }

  handleChangePreview(value) {
    this.setState({
      isPreview: value
    })
  }

  renderHeader() {
    return (
      <div>
        预览：
        <Switch
          value={this.state.isPreview}
          onChange={this.handleChangePreview.bind(this)}
        />
      </div>
    )
  }

  render() {
    const { theme, isMobile, isPreview, schema } = this.state;
    return (
      <Layout header={this.renderHeader()} headerFixed={false}>
        {isPreview ?
          <PageShow amisJson={schema} /> :
          <Editor
            id="editorName"
            theme={theme}
            className="is-fixed"
            preview={false}
            isMobile={isMobile}
            onChange={this.onChange.bind(this)}
            value={schema}
          >
          </Editor>
        }
      </Layout>
    );
  }
}

export default PageEditor;
