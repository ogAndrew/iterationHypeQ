import React, {useState} from "react"
import {addMediaToDb} from '../async.js';

const category = ['movie', 'show', 'podcast', 'video'];
const duration = [15, 30, 45, 60, 90, 120, 'unlimited'];
const priority = ['1', '2', '3'];

function AddMedia() {
  const [mediaInput, setMediaInput] = useState({
    title: "", 
    category: "", 
    duration: "", 
    priority: "", 
    url: ""
  })

  function handleChange(e) {    
    const {name, value} = e.target;    
      setMediaInput(prevState => {    
        return {
          ...prevState, 
          [name]:value
        }
      });
    };

  function handleAdd(e) {
    e.preventDefault();
    alert(mediaInput.title)
  
    const {title, category, duration, priority, url} = mediaInput; 
    const userMedia = {
      title, 
      category, 
      duration, 
      priority, 
      url
    };
   
    function resetFields() {
      setMediaInput({
        title: "", 
        category: "", 
        duration: "", 
        priority: "", 
        url: ""
      });
    };

    addMediaToDb(userMedia);
    resetFields();
    // callback to update parent state
  }


  return(
    <div>
        <h2>Add Media</h2>
        <form className="add-form">
          <input
            type="text"
            name="title"
            placeholder="Enter name.."
            value={mediaInput.title}
            onChange={handleChange} />
            
          <select 
            className="cat-time"
            name="duration"
            onChange={handleChange} >
              <option className="option">Display by Time</option>
              {duration.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>

          <select 
            className="cat-time"
            name="category"
            onChange={handleChange} >
              <option className="option">Category</option>
              {category.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>

          <select 
            className="cat-time"
            name="priority"
            onChange={handleChange} >
              <option className="option">Priority</option>
              {priority.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>
            
          <input
            type="text"
            name="url"
            placeholder="Enter media url.."
            value={mediaInput.url}
            onChange={handleChange} />
            
          <button className="add-btn" onClick={handleAdd}> Add Media  </button>
        </form>
    </div>
  );
};

export default AddMedia