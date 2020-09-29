import React, { Component } from 'react';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS, alterNode, makeTableRenderer } from 'react-native-render-html-table-bridge';
import WebView from 'react-native-webview'

const config = {
    WebViewComponent: WebView
};
 
const renderers = {
  table: makeTableRenderer(config)
};
 
const htmlConfig = {
  alterNode,
  renderers,
  ignoredTags: IGNORED_TAGS
};

class HTMLViewer extends React.Component {
    
    render() {
        const { html } = this.props
        return (
            <HTML html={html} {...htmlConfig} />
        )
    }
}

export default HTMLViewer;