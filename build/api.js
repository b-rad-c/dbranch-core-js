import axios from "axios";

function formatArticle(article) {
  article.record.date_added = new Date(article.record.date_added);
  article.record.date_published = new Date(article.record.date_published);
  return article;
}

function formatArticleIndex(index) {
  let articles = [];
  index.articles.forEach(article => {
    articles.push(formatArticle(article));
  });
  return {
    articles: articles
  };
}

export class dBranchAPI {
  constructor(host) {
    this.host = host;

    if (this.host.endsWith('/')) {
      this.url_base = this.host + 'api/v0';
    } else {
      this.url_base = this.host + '/api/v0';
    }
  }

  getArticleIndex() {
    return new Promise((resolve, reject) => {
      axios.get(this.url_base + '/article/index').then(response => {
        resolve(formatArticleIndex(response.data));
      }).catch(error => {
        reject(error);
      });
    });
  }

  getArticle(name) {
    return new Promise((resolve, reject) => {
      axios.get(this.url_base + '/article/' + name).then(response => {
        resolve(formatArticle(response.data));
      }).catch(error => {
        reject(error);
      });
    });
  }

}