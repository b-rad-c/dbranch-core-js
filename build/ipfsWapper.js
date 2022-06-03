import { newBlankArticle } from "./article";
import { formatArticle } from "./api"; //
// ipfs helper functions
//

const utf8decoder = new TextDecoder();
export async function loadFileFromIPFS(client, path) {
  let result = '';

  for await (const chunk of client.files.read(path)) {
    result += utf8decoder.decode(chunk);
  }

  return result;
}
export async function loadArticleFromIPFS(client, path, loadRecord) {
  let article = newBlankArticle(); // load article

  const data = await loadFileFromIPFS(client, path);
  Object.assign(article, JSON.parse(data)); // load record if specified

  if (loadRecord) {
    article.record = JSON.parse(await loadFileFromIPFS(client, path + '.json'));
    article = formatArticle(article);
  }

  return article;
}
export function formatPubSubMsg(response) {
  return {
    text: utf8decoder.decode(response.data)
  };
}
export async function listDir(client, path) {
  const names = [];

  for await (const f of client.files.ls(path)) {
    names.push(f.name);
  }

  return names;
}