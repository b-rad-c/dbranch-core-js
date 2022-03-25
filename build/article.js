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
        subTitle: this.subTitle,
        author: this.author
      },
      contents: this.contents
    };
  }

  toJSONString() {
    return JSON.stringify(this.toJSON());
  }

  static fromJSON(data) {
    return new Article(data.metadata.type, data.metadata.title, data.metadata.subTitle, data.metadata.author, data.contents);
  }

  static fromJSONString(jsonString) {
    return Article.fromJSON(JSON.parse(jsonString));
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
  }, /*#__PURE__*/React.createElement("em", null, props.article.type), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "written by:"), " ", props.article.author)), /*#__PURE__*/React.createElement(ReactQuill, {
    className: "article-reader-body",
    theme: null,
    value: props.article.contents,
    readOnly: true
  }));
}
export function ArticleReaderModal(props) {
  const modalTitle = props.modalTitle ? props.modalTitle : 'Article Reader';
  return /*#__PURE__*/React.createElement(Modal, {
    show: props.show,
    onHide: props.closeArticle,
    dialogClassName: "article-reader-modal"
  }, /*#__PURE__*/React.createElement(Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/React.createElement(Modal.Title, null, modalTitle)), /*#__PURE__*/React.createElement(Modal.Body, null, /*#__PURE__*/React.createElement(ArticleReader, {
    article: props.article
  })));
}
export function ArticleList(props) {
  return /*#__PURE__*/React.createElement(Stack, {
    className: "article-list",
    gap: props.gap ? props.gap : 0
  }, props.articles.map((article, index) => /*#__PURE__*/React.createElement(ArticleListItem, {
    key: index,
    theme: props.theme,
    listIndex: index,
    onItemClick: props.onItemClick,
    article: article
  })));
}
export function ArticleListItem(props) {
  const defaultClass = 'article-list-item';
  const cardClass = props.theme ? 'article-list-item ' + props.theme : defaultClass;

  const clickHandler = e => {
    e.preventDefault();
    return props.onItemClick(props.listIndex);
  };

  return /*#__PURE__*/React.createElement(Card, {
    className: cardClass,
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-list-item-title"
  }, props.article.title), /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-list-item-subtitle"
  }, props.article.subTitle), /*#__PURE__*/React.createElement(Card.Text, {
    className: "article-list-item-byline"
  }, props.article.type, " written by ", props.article.author)));
}