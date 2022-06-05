import axios from "axios";
export function formatArticle(article) {
  article.record.date_added = new Date(article.record.date_added);
  article.record.date_published = new Date(article.record.date_published);
  return article;
}

function formatArticleIndex(index) {
  let curated = [];
  index.curated.forEach(article => {
    curated.push(formatArticle(article));
  });
  let published = [];
  index.published.forEach(article => {
    published.push(formatArticle(article));
  });
  return {
    curated: curated,
    published: published
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

  getArticleByCid(cid) {
    return new Promise((resolve, reject) => {
      axios.get(this.url_base + '/article/cid/' + cid).then(response => {
        resolve(response.data); // do not call formatArticle because this response will not have a record
      }).catch(error => {
        reject(error);
      });
    });
  }

}