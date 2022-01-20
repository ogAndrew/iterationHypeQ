import React, { useState } from "react";

function Card({ title, category, duration, priority, url, id, handleUpdate, handleDelete }) {
  const [card, setCard] = useState([false]);
  // const [mediaInput, setMediaInput] = useState({
    //   title: "", 
    //   category: "", 
    //   duration: "", 
    //   priority: "", 
    //   url: ""
    // })

  // editMode, setEditMode

  // card of jsx
    // an input form


  // displayCard
  // editCard

  // handleSubmit
  

  return(
    <div className="card">
      <div className="title-button-div">
       <h3>{title}</h3>  
       <div className="edit-del">
         <button onClick={() => handleUpdate(id)} id="edit-btn"><i className="fas fa-edit"></i></button> 
         <button onClick={() => handleDelete(id)} id="del-btn"><i className="fas fa-trash-alt"></i></button>
         </div>
       </div>
      <p>category: {category}</p>
      <p>duration: {duration} mins</p>
      <p>priority: {priority}</p>
      <p>url: {url}</p>
    </div>
  )
};

export default Card;