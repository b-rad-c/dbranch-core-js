import { create } from 'ipfs-http-client'
import { Article } from './article';


export function testIPFSConnection(host) { return create(host).version() }

export async function loadArticleFromIPFS(client, path) {
    let result = ''
    let utf8decoder = new TextDecoder();
    for await (const chunk of client.files.read(path)) {
        result += utf8decoder.decode(chunk)
    }
    return Article.fromJSONString(result)
}