import React, { useState} from 'react';

function Card({ title, category, duration, priority, url, id, handleUpdate, handleDelete }) {
  const [mediaInput, setMediaInput] = useState({
    title: title, 
    category: category, 
    duration: duration, 
    priority: priority, 
    url: url
  })
  const [editMode, setEditMode] = useState(false);
 
  function handleChange(e) {    
    const {name, value} = e.target;   
    console.log("name", name)
    console.log("value", value) 
      setMediaInput(prevState => {    
        return {
          ...prevState, 
          [name]:value
        }
      });
    };

  // handleSubmit
  function handleSubmit() {

  }
  
  const editCard = () => {
    return (
      <form onSubmit={() => handleSubmit()}>
        <label>
          Title
          <br />
          <input onChange={handleChange}
            type="text" 
            name="title" 
            value={mediaInput.title} />          
        </label>
        <br />
        <label>
          Category
          <br />
          <input onChange={handleChange}
            type="text" 
            name="category" 
            value={mediaInput.category} />          
        </label>
        <br />
        <label>
          Duration
          <br />
          <input onChange={handleChange}
            type="text" 
            name="duration" 
            value={mediaInput.duration} />          
        </label>
        <br />
        <label>
          Priority
          <br />
          <input onChange={handleChange}
            type="text" 
            name="priority" 
            value={mediaInput.priority} />          
        </label>
        <br />
        <label>
          Url
          <br />
          <input onChange={handleChange}
            type="text" 
            name="url" 
            value={mediaInput.url} />          
        </label>
        <br />
        <input onClick={() => setEditMode(false)} type="submit" value="Cancel" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }

const displayCard = () => {
  return(
    <div className="card">
      <div className="title-button-div">
      <h3>{title}</h3>  
      <div className="edit-del">
        {/* onClick for each button edit button will invoke handleUpdate */}
        <button onClick={() => setEditMode(true)} id="edit-btn"><i class="fas fa-edit"></i></button> 
        <button onClick={() => handleDelete(id)} id="del-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
      <p>category: {category}</p>
      <p>duration: {duration} mins</p>
      <p>priority: {priority}</p>
      <p>url: {url}</p>
    </div>
  )};

  return (
    <div>
      {editMode === true ? editCard() : displayCard()}
    </div>
  )
}

export default Card;