import React, {useState, useEffect} from 'react';
import Spinner from '../spinner';

const withData = (View, getData) => {
    return function(props){

        const [data, setData] = useState()

        useEffect(() => {
            getData()
                .then((data) => {
                    setData(data)
                })
        })

        if(!data){
            return <Spinner/>
        }

        return(
            <View {...props} data={data}/>
        )
    }
}
export default withData;




