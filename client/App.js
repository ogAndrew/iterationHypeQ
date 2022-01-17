import React, { useState, useEffect } from "react";
import Header from "./components/Header"
import List from "./components/List.js"

function App() {
    const [allMedia, setAllMedia] = useState([])

    // const allMedia = [
    //     { 
    //         media_id: 2,
    //         title: "silicon valley",
    //         category: "show",
    //         duration: 30,
    //         priority: 1,
    //         url: null,
    //         user_id: 1 
    //     },
    //     {
    //         media_id: 3,
    //         title: "queen's gambit",
    //         category: "show",
    //         duration: 30,
    //         priority: 1,
    //         url: null,
    //         user_id: 1
    //     },
    // ]
    useEffect(()=>{
        fetch('http://localhost:3000/api')
        .then (res => res.json)
        .then(data=>{
            setAllMedia(data)
        })
    },[])

   
    return (
    
        <div>
            {/* <Header /> */}
            <List allMedia={allMedia}/>  
        </div>
    
    )
};

export default App;
