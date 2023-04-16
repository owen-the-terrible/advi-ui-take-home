import { useState, useEffect, FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'


const SingleArticle: FC = () =>{
    // const location = useLocation();
    const {data} = useParams();
    const decodedData = data ? decodeURIComponent(data) : null;
    const newData = decodedData ? JSON.parse(decodedData) : null;
return(
    <div>
        {data?.toString()}
        
    </div>
)
}
export default SingleArticle