import React, {useState} from "react"

const category = ['movie', 'show', 'podcast', 'video'];
const duration = [15, 30, 45, 60, 90, 120, 'unlimited'];
const priority = ['1', '2', '3'];

function AddMedia({ handleAdd }) {
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

  function handleSubmit(e) {
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

    handleAdd(userMedia);
    resetFields();
  }


  return(
    <div className="add-media-container">
        <h2>Add Media</h2>
        <form className="add-form" onSubmit={handleSubmit}>
          <input
            className="cat-time"
            type="text"
            name="title"
            placeholder="Media name"
            value={mediaInput.title}
            onChange={handleChange} />
            
          <select 
            className="cat-time"
            name="duration"
            value={mediaInput.duration}
            onChange={handleChange} >
              <option className="option">Display by Time</option>
              {duration.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>

          <select 
            className="cat-time"
            name="category"
            value={mediaInput.category}
            onChange={handleChange} >
              <option className="option">Category</option>
              {category.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>

          <select 
            className="cat-time"
            name="priority"
            value={mediaInput.priority}
            onChange={handleChange} >
              <option className="option">Priority</option>
              {priority.map(item =>
                <option className="option" key={item} value={item}>{item}</option>)}
          </select>
            
          <input
            className="cat-time" 
            type="text"
            name="url"
            placeholder="Media URL"
            value={mediaInput.url}
            onChange={handleChange} />
            
          <input type="submit" value="Add Media" className="add-btn" />
        </form>
    </div>
  );
};

export default AddMedia