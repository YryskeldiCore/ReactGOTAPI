import React, { Component } from 'react';
import BookList from '../Lists/bookList';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class BooksPage extends Component{
    gotService = new gotService();


    state = {
        selectedBook: null,
        error: false
    }

    ComponentDidCatch(){
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }


    render(){
        if(this.state.error){
            return <ErrorMsg/>
        }

        return(
            <BookList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllBooks}
                renderItem={({name}) => `${name}`}/>
        )
    }
}

export default withRouter(BooksPage);