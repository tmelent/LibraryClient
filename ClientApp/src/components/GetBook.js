import React, { Component } from 'react';
import { Spinner } from 'reactstrap';

export class GetBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            book: {}
        }
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        await this.fetchData();        
    }   
    
    async fetchData() {        
        
        var response = await fetch('contentRequests/getBookById/' + this.props.location.state.id,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }            
        })
        var result = await response.json();      
        this.setState({ isFetching: false, book: result });
    }   

    render() {
        if (this.state.isFetching) {
            return (
                <Spinner animation="grow" variant="dark" />
            );
        }
        var book = this.state.book;
        return (
            <div>      
                <h3><b>{book.bookTitle}</b> (<i>{book.publishYear}</i>)</h3>
                <p>{book.authorName}</p>
                <p>{book.description}</p>              
            </div>
        );
    }
}
export default GetBook;