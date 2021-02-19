import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';

export default class BookItem extends Component {
    gotService = new gotService();

    state = {
        error: false
    }

    render(){
        if(this.state.error){
            return <ErrorMsg/>
        }

        return(
            <ItemDetails
                itemId={this.props.bookId}
                getData={this.gotService.getBook}
                >
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Published'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        )
    }
}
