import React from "react";

function Card({ title, category, duration, priority, url, id, handleUpdate, handleDelete }) {
  // const [mediaInput, setMediaInput] = useState({
  //   title: "", 
  //   category: "", 
  //   duration: "", 
  //   priority: "", 
  //   url: ""
  // })
  const [editMode, setEditMode] = useState([false]);

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
         {/* onClick for each button edit button will invoke handleUpdate */}
         <button onClick={() => handleUpdate(id)} id="edit-btn"><i class="fas fa-edit"></i></button> 
         <button onClick={() => handleDelete(id)} id="del-btn"><i class="fas fa-trash-alt"></i></button>
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