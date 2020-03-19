import React, { Component } from 'react';
import { Row, Col, Container } from 'reactstrap';
export class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
        this.fetchData = this.fetchData.bind(this);
    }
    async componentDidMount() {
        await this.fetchData();
    }
    async fetchData() {
        var data = {
            first: 1,
            last: 9
        }
        await fetch('contentRequests/getBooksInRange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => this.setState({ books: result }));
    }

    render() {
        if (this.state.books !== null || this.state.books !== undefined) {
            var bookTitles = this.state.books.map((b) => <div><b>{b.bookTitle} ({b.publishYear})</b></div>);
            var bookAuthors = this.state.books.map((a) => <div>{a.authorName}</div>);
            var bookDescription = this.state.books.map((d) => <div>{d.description}</div>);
            var books = [];
            for (var i = 0; i < this.state.books.length; i++) {
                books.push(
                    <Col key={'book_' + i} md={4}>
                        {bookTitles[i]}
                        {bookAuthors[i]}
                        {bookDescription[i]}
                    </Col>);
            }
            return (
                <Container>
                    <h1>Каталог книг</h1>
                    <Row>
                        {books}
                    </Row>
                </Container>
            );
        }
        return null;
    }
}
