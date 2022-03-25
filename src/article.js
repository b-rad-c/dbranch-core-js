import React from 'react'
import { Modal, Card, Stack } from 'react-bootstrap'
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

export function ArticleList(props) {
    return (
        <Stack className='article-list' gap={props.gap ? props.gap : 0}>
            {
                props.articles.map((article, index) => <ArticleListItem key={index} 
                                                                        theme={props.theme} 
                                                                        listIndex={index}
                                                                        onItemClick={props.onItemClick} 
                                                                        article={article} />)
            }
        </Stack>
    )
}

export function ArticleListItem(props) {
    const defaultClass = 'article-list-item' 
    const cardClass = props.theme ?  'article-list-item ' + props.theme : defaultClass
    const clickHandler = (e) => {
        e.preventDefault()
        return props.onItemClick(props.listIndex)
    }
    return (
        <Card className={cardClass} onClick={clickHandler}>
            <Card.Body>
                <Card.Subtitle className='article-list-item-title'>{props.article.title}</Card.Subtitle>
                <Card.Subtitle className='article-list-item-subtitle'>{props.article.subTitle}</Card.Subtitle>
                <Card.Text className='article-list-item-byline'>
                    {props.article.type} written by {props.article.author}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}