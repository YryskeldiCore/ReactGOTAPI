import React, { Component } from 'react';
import ErrorMsg from '../error';
import gotService from '../../services/gotService';
import {withRouter} from 'react-router-dom';
import CharacterList from '../Lists/characterList';

class CharactersPage extends Component {

    state = {
        selectedChar: 130,
        error: false
    }

    gotService = new gotService();
    


    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch(){
        this.setState({error: true})
    }

    render(){

        if(this.state.error){
            return <ErrorMsg/>
        }

        return (
            <CharacterList 
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
                }}
                getData={this.gotService.getAllCharacters}
                renderItem={({name, gender}) => `${name}(${gender})`}/>
        )
    }
}

export default withRouter(CharactersPage);