import * as React from 'react';
import axios from 'axios';
// import copy from 'copy-to-clipboard';

import { render as renderAmis, ToastComponent, AlertComponent } from 'amis';
import { alert, confirm } from 'amis/lib/components/Alert';
import { toast } from 'amis/lib/components/Toast';

// 页面渲染

class PageShow extends React.Component {
  render() {
    let amisScoped;
    let theme = 'cxd';
    let locale = 'zh-CN';

    // 请勿使用 React.StrictMode，目前还不支持
    return (
      <div className='page-show'>
        <ToastComponent
          theme={theme}
          key="toast"
          position={'top-right'}
          locale={locale}
        />
        <AlertComponent theme={theme} key="alert" locale={locale} />
        {renderAmis(
          {
            ...this.props.amisJson
          },
          {
            // props...
            // locale: 'en-US' // 请参考「多语言」的文档
            // scopeRef: (ref: any) => (amisScoped = ref)  // 功能和前面 SDK 的 amisScoped 一样
          },
          {
            // 下面三个接口必须实现
            fetcher: ({
              url, // 接口地址
              method, // 请求方法 get、post、put、delete
              data, // 请求数据
              responseType,
              config, // 其他配置
              headers // 请求头
            }) => {
              config = config || {};
              config.withCredentials = true;
              responseType && (config.responseType = responseType);
              //   config.changeOrigin = true;
              if (config.cancelExecutor) {
                config.cancelToken = new axios.CancelToken(
                  config.cancelExecutor
                );
              }

              config.headers = headers || {};

              if (method !== 'post' && method !== 'put' && method !== 'patch') {
                if (data) {
                  config.params = data;
                }

                return axios[method](url, config);
              } else if (data && data instanceof FormData) {
                config.headers = config.headers || {};
                config.headers['Content-Type'] = 'multipart/form-data';
              } else if (
                data &&
                typeof data !== 'string' &&
                !(data instanceof Blob) &&
                !(data instanceof ArrayBuffer)
              ) {
                data = JSON.stringify(data);
                config.headers = config.headers || {};
                config.headers['Content-Type'] = 'application/json';
              }

              return axios[method](url, data, config);
            },
            isCancel: (value) => axios.isCancel(value),
            // copy: content => {
            //   copy(content);
            //   toast.success('内容已复制到粘贴板');
            // },
            theme
          }
        )}
      </div>
    );
  }
}

export default PageShow;