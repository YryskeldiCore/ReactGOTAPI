import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
// import PropTypes from 'prop-types';

const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span className="dynamicData">{item[field]}</span>
        </li>
    )
}

export {
    Field
};

function ItemDetails({itemId, getData,children}){

    const [item, updateItem] = useState({});
    const [loading , updateLoading] = useState(true);

    // state = {
    //     item: {},
    //     loading: true
    // }

    // static defaultProps = {
    //     itemId: 'asd'
    // }

    useEffect(() => {
        if(!itemId){
            return;
		}

        getData(itemId)
            .then((item, loading) => {
                updateItem(item)
                updateLoading(loading)
            })
    }, [])
    

    // componentDidMount(){
    //     this.updateItem();
    // }

    // componentDidUpdate(prevProps){
    //     if(this.props.itemId !== prevProps.itemId){
    //         this.updateItem();
    //     }
    // }

    if (!item){
        return <span>Please select a Character</span>
    }

    if(loading){
        return <Spinner/>
    }

    const {name} = item;
    
    return (
        <div className="char-details rounded">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {item})
                    })
                }
            </ul>
        </div>
    );
}

export default ItemDetails;
// ItemDetails.propTypes = {
//     itemId: PropTypes.number
// }

// ItemDetails.defaultProps = {
//     itemId: false
// }

// ItemDetails.propType = {
//     itemId: (props, propName, componentName) => {
//         const value = props[propName];

//         if(typeof value === 'number' && !isNaN(value)){
//             return null
//         }
//         return new TypeError (`${componentName} ${propName} isn't num`)
        
//     }
// }