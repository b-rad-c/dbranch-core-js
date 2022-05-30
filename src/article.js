import React from 'react'
import { Modal, Card, Stack, Row, Col } from 'react-bootstrap'
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

    const meta = props.article.metadata
    const record = props.article.record

    const date_opts = { dateStyle: 'full', timeStyle: 'long' }
    const date_published = new Intl.DateTimeFormat('en-US', date_opts).format(record.date_published)

    const fieldClass = 'text-end col col-lg-2'
    const valueClass = ''
    return (
        <div className='article-reader-container'>
            <div className='article-reader-header'>
                <h1 className='article-reader-title'>{meta.title}</h1>
                <h2 className='article-reader-subtitle'>{meta.sub_title}</h2>
                <div className='article-reader-by-line'>
                    <Row>
                        <Col className={fieldClass}><strong>author</strong> ::</Col>
                        <Col className={valueClass}>{meta.author}</Col>
                    </Row>
                    <Row>
                        <Col className={fieldClass}><strong>published ::</strong></Col>
                        <Col className={valueClass}>{date_published}</Col>
                    </Row>
                    <Row>
                        <Col className={fieldClass}><strong>type ::</strong></Col>
                        <Col className={valueClass}>{meta.type}</Col>
                    </Row>
                    <Row>
                        <Col className={fieldClass}><strong>verify ::</strong></Col>
                        <Col className={valueClass}>{props.children}</Col>
                    </Row>
                    
                </div>
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
    const articles = props.index.articles
    
    return (
        <Stack className='article-index' gap={props.gap ? props.gap : 0}>
            {
                articles.map((article, index) => <ArticleIndexItem key={index} 
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
    const record = props.article.record

    const date_opts = { dateStyle: 'medium', timeStyle: 'medium' }
    const date_published = new Intl.DateTimeFormat('en-US', date_opts).format(record.date_published)

    return (
        <Card className={cardClass} onClick={clickHandler}>
            <Card.Body>
                <Card.Subtitle className='article-index-item-title'>{meta.title}</Card.Subtitle>
                <Card.Subtitle className='article-index-item-subtitle'>{meta.sub_title}</Card.Subtitle>
                <Card.Text className='article-index-item-byline'>
                    {meta.type} by {meta.author} <br />
                    published: {date_published}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}