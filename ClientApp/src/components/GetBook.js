import React, { Component } from 'react';

export class GetBook extends Component {
    constructor(props) {
        super(props);
        this.state = {book : []};
        this.fetchData = this.fetchData.bind(this);
        this.showBookInfo = this.showBookInfo.bind(this);
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
       fetch('sendrequest/getbook/1')
            .then(response => response.json())
            .then(result => this.setState({ book: result }));
        
    }
    showBookInfo() {
        var newel = document.createElement("div");
        newel.innerHTML = "<h1>" + this.state.book.name + this.state.book.year + this.state.book.description;
        var mydiv = document.getElementById("kek");
        document.body.insertBefore(newel, mydiv);
    }

    render() {
        if (!this.state.book || !this.state.book.length)
            return null;
        return (
            <div>      
                {this.state.book[0]}
                <button className="btn btn-primary" id="kek">fetch</button>
            </div>
        );
    }

}
export default GetBook;