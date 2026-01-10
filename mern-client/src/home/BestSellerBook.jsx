import React, {useState , useEffect} from "react";
import BookCards from "../component/BookCards";
const BestSellerBook = () =>{
    const [books , setBooks] = useState([]);
    useEffect(()=>{
    fetch("http://localhost:5000/all-books").then(res=>res.json()).then(data=>setBooks(data.slice(
        0,6
    )))
    },[])
    

    return(
           
            <div ><BookCards books={books} headline="Most Downloaded Resources"/>
            </div>
        
    )
}
export default BestSellerBook