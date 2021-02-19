import React, {useState, useEffect} from 'react';
import './randomChar.css';
import Spinner from '../spinner/spinner';
import Error from '../error/error';

function RandomChar({getData}) { //Using Hooks

    const [char, onUpdateCharState] = useState({});
    const [loading, updateLoading] = useState(true);
    const [error, updateError] = useState(false);

    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }

    useEffect(() => {
        updateChar();
        let timerId = setInterval(updateChar, 2000);
        return () => {
            clearInterval(timerId);
        }
    }, [])

    // function onUpdateCharState (char){
    //     this.setState({char, loading: false})
    // }

    // onError = () => {
    //     this.setState({
    //         error: true,
    //         loading: false
    //     })
    // }

    const updateChar = () => {
        const id = Math.floor(Math.random() * 125 + 14);
        getData(id)
            .then((char, loading) => {
                onUpdateCharState(char);
                updateLoading(loading);
            })
            .catch(updateError(error))
    }

    // const {char, loading, error} = this.state;

    const errorMes = error ? <Error/>: null;
    const spinner = loading ? <Spinner/>: null;
    const content = !(loading ||error) ? <View char={char}/> : null;

    return (
        <div className="random-block rounded">
            {errorMes}
            {spinner}
            {content}
        </div>
    );
}

const View = ({char:{name,gender,born,died,culture}}) => {
    return(
        <>
            <h4>Random Character:{name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender</span>
                    <span className="dynamicData">{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span className="dynamicData">{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span className="dynamicData">{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span className="dynamicData">{culture}</span>
                </li>
            </ul>
        </>
    )
}

export default RandomChar;