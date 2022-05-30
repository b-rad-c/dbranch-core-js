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
                sub_title: this.subTitle,
                author: this.author,
            },
            contents: this.contents
        }
    }

    toJSONString() {
        return JSON.stringify(this.toJSON())
    }

    static fromJSON(data) {
        return new Article(data.metadata.type, data.metadata.title, data.metadata.sub_title, data.metadata.author, data.contents)
    }

    static fromJSONString(jsonString) {
        return Article.fromJSON(JSON.parse(jsonString))
    }
}

export function CardanoExplorerLink(transactionId) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId
    } else {
        return 'https://explorer.cardano.org/en/transaction?id=' + transactionId
    }
}

export function ArticleReader(props) {
    return (
        <div className='article-reader-container'>
            <div className='article-reader-header'>
                <h1 className='article-reader-title'>{props.article.title}</h1>
                <h2 className='article-reader-subtitle'>{props.article.subTitle}</h2>
                <p className='article-reader-by-line'>
                    <em>author:</em> {props.article.author}
                    <br />
                    <em>{props.article.type}</em>
                    <br />
                    {props.children}
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
    
    return (
        <Modal show={props.show} onHide={props.onHide} onExited={props.onExited} dialogClassName='article-reader-modal'>
            <Modal.Body>
                <ArticleReader article={props.article} children={props.children} />
            </Modal.Body>
      </Modal>
    )
}

export function ArticleIndex(props) {
    return (
        <Stack className='article-index' gap={props.gap ? props.gap : 0}>
            {
                props.index.map((article, index) => <ArticleIndexItem key={index} 
                                                                        theme={props.theme} 
                                                                        listIndex={index}
                                                                        onItemClick={props.onItemClick} 
                                                                        article={article} />)
            }
        </Stack>
    )
}

export function ArticleIndexItem(props) {
    const defaultClass = 'article-index-item' 
    const cardClass = props.theme ?  'article-index-item ' + props.theme : defaultClass
    const clickHandler = (e) => {
        e.preventDefault()
        return props.onItemClick(props.listIndex)
    }
    const meta = props.article.metadata
    return (
        <Card className={cardClass} onClick={clickHandler}>
            <Card.Body>
                <Card.Subtitle className='article-index-item-title'>{meta.title}</Card.Subtitle>
                <Card.Subtitle className='article-index-item-subtitle'>{meta.sub_title}</Card.Subtitle>
                <Card.Text className='article-index-item-byline'>
                    {meta.type} written by {meta.author}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}