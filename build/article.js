import React from 'react';
import { Modal, Card, Stack } from 'react-bootstrap';
import ReactQuill from 'react-quill';
export class Article {
  constructor(type, title, subTitle, author, contents) {
    this.type = type ? type : 'news';
    this.title = title ? title : 'Untitled Article';
    this.subTitle = subTitle ? subTitle : 'Enter subtitle here...';
    this.author = author ? author : 'John Doe';
    this.contents = contents ? contents : '';
  }

  toJSON() {
    return {
      metadata: {
        type: this.type,
        title: this.title,
        sub_title: this.subTitle,
        author: this.author
      },
      contents: this.contents
    };
  }

  toJSONString() {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(data) {
    return new Article(data.metadata.type, data.metadata.title, data.metadata.sub_title, data.metadata.author, data.contents);
  }

  static fromJSONString(jsonString) {
    return Article.fromJSON(JSON.parse(jsonString));
  }

}
export function CardanoExplorerLink(transactionId) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId;
  } else {
    return 'https://explorer.cardano.org/en/transaction?id=' + transactionId;
  }
}
export function ArticleReader(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "article-reader-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article-reader-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "article-reader-title"
  }, props.article.title), /*#__PURE__*/React.createElement("h2", {
    className: "article-reader-subtitle"
  }, props.article.subTitle), /*#__PURE__*/React.createElement("p", {
    className: "article-reader-by-line"
  }, /*#__PURE__*/React.createElement("em", null, "author:"), " ", props.article.author, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, props.article.type), /*#__PURE__*/React.createElement("br", null), props.children)), /*#__PURE__*/React.createElement(ReactQuill, {
    className: "article-reader-body",
    theme: null,
    value: props.article.contents,
    readOnly: true
  }));
}
export function ArticleReaderModal(props) {
  return /*#__PURE__*/React.createElement(Modal, {
    show: props.show,
    onHide: props.onHide,
    onExited: props.onExited,
    dialogClassName: "article-reader-modal"
  }, /*#__PURE__*/React.createElement(Modal.Body, null, /*#__PURE__*/React.createElement(ArticleReader, {
    article: props.article,
    children: props.children
  })));
}
export function ArticleIndex(props) {
  return /*#__PURE__*/React.createElement(Stack, {
    className: "article-index",
    gap: props.gap ? props.gap : 0
  }, props.index.map((article, index) => /*#__PURE__*/React.createElement(ArticleIndexItem, {
    key: index,
    theme: props.theme,
    listIndex: index,
    onItemClick: props.onItemClick,
    article: article
  })));
}
export function ArticleIndexItem(props) {
  const defaultClass = 'article-index-item';
  const cardClass = props.theme ? 'article-index-item ' + props.theme : defaultClass;

  const clickHandler = e => {
    e.preventDefault();
    return props.onItemClick(props.listIndex);
  };

  const meta = props.article.metadata;
  return /*#__PURE__*/React.createElement(Card, {
    className: cardClass,
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-index-item-title"
  }, meta.title), /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-index-item-subtitle"
  }, meta.sub_title), /*#__PURE__*/React.createElement(Card.Text, {
    className: "article-index-item-byline"
  }, meta.type, " written by ", meta.author)));
}