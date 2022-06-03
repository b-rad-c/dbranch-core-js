import React from 'react'
import { Modal, Card, Stack, Row, Col } from 'react-bootstrap'
import ReactQuill from 'react-quill'

//
// react components
//

export function ArticleReader(props) {

    const meta = props.article.metadata
    const record = props.article.record

    const date_opts = { dateStyle: 'full', timeStyle: 'long' }

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
                        <Col className={valueClass}>{displayPublishDate(record, date_opts, '-')}</Col>
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
        <Modal show={props.show} onHide={props.closeArticle} onExited={props.onExited} dialogClassName='article-reader-modal'>
            <Modal.Body>
                <ArticleReader article={props.article} record={props.record} children={props.children} />
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
    
    const meta = props.article.metadata
    const record = props.article.record

    const clickHandler = (e) => {
        e.preventDefault()
        return props.onItemClick(record)
    }

    const date_opts = { dateStyle: 'medium', timeStyle: 'medium' }

    return (
        <Card className={cardClass} onClick={clickHandler}>
            <Card.Body>
                <Card.Subtitle className='article-index-item-title'>{meta.title}</Card.Subtitle>
                <Card.Subtitle className='article-index-item-subtitle'>{meta.sub_title}</Card.Subtitle>
                <Card.Text className='article-index-item-byline'>
                    {meta.type} by {meta.author} <br />
                    published: {displayPublishDate(record, date_opts, '-')}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

//
// helpers
//

export function newBlankArticle() {
    return {
        record: {
            name: 'Untitled Article.news',
            size: 0,
            cid: '',
            date_added: null,
            date_published: null,
            cardano_tx_hash: ''
        },
        metadata: {
            type: 'news',
            title: 'Untitled Article',
            sub_title: 'A great article waiting to be written!',
            author: 'Jonathan Doe'
        },
        contents: ''
    }
}

export function CardanoExplorerLink(transactionId) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId
    } else {
        // return 'https://explorer.cardano.org/en/transaction?id=' + transactionId
        return 'https://explorer.cardano-testnet.iohkdev.io/en/transaction?id=' + transactionId
    }
}

function displayPublishDate(record, date_opts, defaultString) {
    if(record.date_published) { 
        return new Intl.DateTimeFormat('en-US', date_opts).format(record.date_published)
    } else {
        return defaultString
    }
}