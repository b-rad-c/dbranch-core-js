import { Article } from './article'; //
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
export async function loadArticleFromIPFS(client, path) {
  let result = '';

  for await (const chunk of client.files.read(path)) {
    result += utf8decoder.decode(chunk);
  }

  return Article.fromJSONString(result);
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