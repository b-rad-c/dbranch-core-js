import React from 'react'
import { Modal } from 'react-bootstrap'
import ReactQuill from 'react-quill'


export class Article {
    constructor(type, title, subTitle, author, contents) {
        this.type = type ? type : 'news'
        this.title = title ? title : 'Untitled Article'
        this.subTitle = subTitle ? subTitle : 'Enter subtitle here...'
        this.author = author ? author : 'John Doe'
        this.contents = contents ? contents : ''
    }

    toJSON() {
        return {
            metadata: {
                type: this.type,
                title: this.title,
                subTitle: this.subTitle,
                author: this.author,
            },
            contents: this.contents
        }
    }

    toJSONString() {
        return JSON.stringify(this.toJSON())
    }

    static fromJSON(data) {
        return new Article(data.metadata.type, data.metadata.title, data.metadata.subTitle, data.metadata.author, data.contents)
    }

    static fromJSONString(jsonString) {
        return Article.fromJSON(JSON.parse(jsonString))
    }
}


export function ArticleReader(props) {
    return (
        <div className='article-reader-container'>
            <div className='article-reader-header'>
                <h1 className='article-reader-title'>{props.article.title}</h1>
                <h2 className='article-reader-subtitle'>{props.article.subTitle}</h2>
                <p className='article-reader-by-line'>
                    <em>{props.article.type}</em>
                    <br />
                    <em>written by:</em> {props.article.author}
                </p>
            </div>
            <ReactQuill 
                className='article-reader-body'
                theme={null}
                value={props.article.contents} 
                readOnly
                />
        </div>
    )
}


export function ArticleReaderModal(props) {
    
    const modalTitle = props.modalTitle ? props.modalTitle : 'Article Reader'
    
    return (
        <Modal show={props.show} onHide={props.closeArticle} dialogClassName='article-reader-modal'>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
            
                <ArticleReader article={props.article} />
            
            </Modal.Body>
      </Modal>
    )
}