import React, { Component } from 'react';
import HouseList from '../Lists/houseList';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';

class HousesPage extends Component {
    gotService = new gotService();

    state = {
        selectedHouse: 15,
        error: false
    }

    onItemSelected = (id) =>{
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return <ErrorMsg/>
        }

        return(
            <HouseList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllHouses}
                renderItem={({name, region}) => `${name}(${region})`}/>
        )
    }
}

export default withRouter(HousesPage);