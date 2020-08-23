import React, { Component } from 'react';
import {
    Spinner, Row, Col, Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { connect } from 'react-redux';
import getBooks from '../actions/ContentActions';
import { Link } from 'react-router-dom';

class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            isFetching: true
        }
        this.fetchData = this.fetchData.bind(this);
    }

    /* 
     Обращаемся к БД только однократно
     */
    async componentDidMount() {
        await this.fetchData();
        //if (this.props.books.length === 0) {
        //    await this.fetchData();
        //} else {
        //    this.setState({ isFetching: false });
        //}
    }

    async fetchData(page = 1) {        
        var data = {
            pageNumber: page
        }
        await fetch('contentRequests/getBooksInRange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => this.props.getBooks(result));
            this.setState({isFetching: false });
    }

    render() {
        console.log(this.props);
        if (this.state.isFetching) {
            return (
                <Spinner animation="grow" variant="dark" />
            );
        }

        if (this.props.books !== null || this.props.books !== undefined) {
            var books = this.props.books.map(({ bookId, bookTitle, publishYear, authorName, description }) => {
                return (
                    <div key={'book_' + bookId}>
                        <Card style={{ width: "20rem", height: "20rem", marginBottom: "1rem", marginRight: "1rem" }}>
                            <CardBody>
                                <CardTitle><Link to={{ pathname: '/book', state: { id: bookId } }}><b>{bookTitle}</b> ({publishYear})</Link></CardTitle>
                                <CardSubtitle style={{ paddingBottom: "1rem" }}>{authorName}</CardSubtitle>
                                <CardText style={{ height: "10rem" }}>{description}</CardText>
                                <Button>Подробнее</Button>
                            </CardBody>
                        </Card>
                    </div>
                );
            })

            return (
                <Container>
                    <h1>Каталог книг</h1>
                    <Row style={{ marginTop: "2rem" }}>
                        {books}
                    </Row>
                </Container>);
        }
    }
}

const mapStateToProps = state => {
    console.log('mapstatetoprops:');
    console.log(state);
    return {
        books: state.books.books
    }
}

export default connect(mapStateToProps, { getBooks })(Books);