import React from 'react';
import { Modal, Card, Stack, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill'; //
// react components
//

export function ArticleReader(props) {
  const meta = props.article.metadata;
  const record = props.article.record;
  const date_opts = {
    dateStyle: 'full',
    timeStyle: 'long'
  };
  const fieldClass = 'text-end col col-lg-2';
  const valueClass = '';
  return /*#__PURE__*/React.createElement("div", {
    className: "article-reader-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "article-reader-header"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "article-reader-title"
  }, meta.title), /*#__PURE__*/React.createElement("h2", {
    className: "article-reader-subtitle"
  }, meta.sub_title), /*#__PURE__*/React.createElement("div", {
    className: "article-reader-by-line"
  }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: fieldClass
  }, /*#__PURE__*/React.createElement("strong", null, "author"), " ::"), /*#__PURE__*/React.createElement(Col, {
    className: valueClass
  }, meta.author)), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: fieldClass
  }, /*#__PURE__*/React.createElement("strong", null, "published ::")), /*#__PURE__*/React.createElement(Col, {
    className: valueClass
  }, displayPublishDate(record, date_opts, '-'))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: fieldClass
  }, /*#__PURE__*/React.createElement("strong", null, "type ::")), /*#__PURE__*/React.createElement(Col, {
    className: valueClass
  }, meta.type)), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: fieldClass
  }, /*#__PURE__*/React.createElement("strong", null, "verify ::")), /*#__PURE__*/React.createElement(Col, {
    className: valueClass
  }, props.children)))), /*#__PURE__*/React.createElement(ReactQuill, {
    className: "article-reader-body",
    theme: null,
    value: props.article.contents,
    readOnly: true
  }));
}
export function ArticleReaderModal(props) {
  return /*#__PURE__*/React.createElement(Modal, {
    show: props.show,
    onHide: props.closeArticle,
    onExited: props.onExited,
    dialogClassName: "article-reader-modal"
  }, /*#__PURE__*/React.createElement(Modal.Body, null, /*#__PURE__*/React.createElement(ArticleReader, {
    article: props.article,
    record: props.record,
    children: props.children
  })));
}
export function ArticleIndex(props) {
  const articles = props.index.articles;
  return /*#__PURE__*/React.createElement(Stack, {
    className: "article-index",
    gap: props.gap ? props.gap : 0
  }, articles.map((article, index) => /*#__PURE__*/React.createElement(ArticleIndexItem, {
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
  const meta = props.article.metadata;
  const record = props.article.record;

  const clickHandler = e => {
    e.preventDefault();
    return props.onItemClick(record);
  };

  const date_opts = {
    dateStyle: 'medium',
    timeStyle: 'medium'
  };
  return /*#__PURE__*/React.createElement(Card, {
    className: cardClass,
    onClick: clickHandler
  }, /*#__PURE__*/React.createElement(Card.Body, null, /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-index-item-title"
  }, meta.title), /*#__PURE__*/React.createElement(Card.Subtitle, {
    className: "article-index-item-subtitle"
  }, meta.sub_title), /*#__PURE__*/React.createElement(Card.Text, {
    className: "article-index-item-byline"
  }, meta.type, " by ", meta.author, " ", /*#__PURE__*/React.createElement("br", null), "published: ", displayPublishDate(record, date_opts, '-'))));
} //
// helpers
//

export function newBlankArticle() {
  return {
    record: {
      name: 'Untitled Article.news',
      size: 0,
      cid: '',
      date_added: null,
      date_published: null,
      cardano_tx_hash: ''
    },
    metadata: {
      type: 'news',
      title: 'Untitled Article',
      sub_title: 'A great article waiting to be written!',
      author: 'Jonathan Doe'
    },
    contents: ''
  };
}
export function CardanoExplorerLink(transactionId) {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId;
  } else {
    // return 'https://explorer.cardano.org/en/transaction?id=' + transactionId
    return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId;
  }
}

function displayPublishDate(record, date_opts, defaultString) {
  if (record.date_published) {
    return new Intl.DateTimeFormat('en-US', date_opts).format(record.date_published);
  } else {
    return defaultString;
  }
}