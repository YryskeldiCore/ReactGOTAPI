import React from 'react';
import withData from '../withData';
import gotService from '../../services/gotService';

const HouseList = ({data, renderItem, onItemSelected}) => {

    const renderItems = (arr) => {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);
            return (
                <li 
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }
    const listChars = renderItems(data);
    
    return (
        <ul className="item-list list-group">
            {listChars}  
        </ul>
    );
}
const {getAllHouses} = new gotService();
export default withData(HouseList, getAllHouses);