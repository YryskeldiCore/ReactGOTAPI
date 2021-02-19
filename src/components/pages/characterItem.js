import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';

export default class CharacterItem extends Component {
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
                itemId={this.props.characterId}
                getData={this.gotService.getCharacter}
                >
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
    }
}