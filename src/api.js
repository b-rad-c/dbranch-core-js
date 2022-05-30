import axios from "axios"

class dBranchAPI {
    constructor(host) {
      this.host = host
      if (this.host.endsWith('/')) {
        this.url_base = this.host + 'api/v0'
      }else{
        this.url_base = this.host + '/api/v0'
      }
    }

    async get_article_index() {
        return await axios.get(this.url_base + '/article/index')
    }

    async get_article(name) {
        return await axios.get(this.url_base + '/article/' + name)
    }
  }