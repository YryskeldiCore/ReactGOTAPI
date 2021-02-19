import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';

export default class HouseItem extends Component {
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
                itemId={this.props.housesId}
                getData={this.gotService.getHouse}>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='overlord' label='Overlord'/>
                    <Field field='ancestralWeapons' label='AncestralWeapons'/>
                </ItemDetails>
        )
    }
}