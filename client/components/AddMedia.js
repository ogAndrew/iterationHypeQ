
import React, {useState} from "react"

function AddMedia(){

    const [mediaInput, setMediaInput] = useState({
        title: "", 
        category: "", 
        duration: "", 
        priority: "", 
        url: "google.com"
    })

    function handleChange(e){
        
        const {name, value} = e.target;
       
       setMediaInput(prevState=>{
           
         return {
           ...prevState, 
           [name]:value
         }
       })
    }

    function handleAdd(e){
      e.preventDefault();
     alert(mediaInput.title)
    
     const {title, category, duration, priority, url} = mediaInput; 
     let userMedia = {
       title: title, 
       category: category, 
       duration: duration, 
       priority: priority, 
       url: url

     }
   
    
     function resetFields(){
        setMediaInput({
            title: "", 
            category: "", 
            duration: "", 
            priority: "", 
            url: ""
        })
     }

    fetch("http://localhost:4000/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userMedia),
      })
        .then((response) => {
          alert("we sent your data to backend")
         resetFields();
        })
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
                onChange={handleChange} 
               />
                
               

                <select
            className="cat-time"
            name="category"
            value={mediaInput.category}
            onChange={handleChange} 
          >
            <option value="">Category </option>
            <option value="movie">Movie</option>
            <option value="show">Show</option>
            <option value="podcast">Podcast</option>
            <option value="video">Video</option>
          </select>


          <select
            className="cat-time"
            name="duration"
            value={mediaInput.duration}
            onChange={handleChange} 
            
          >
            <option value="">Duration </option>
            <option value="15">15 mins</option>
            <option value="30">30 mins</option>
            <option value="45">45 mins</option>
            <option value="60">60 mins</option>
            <option value="90">90 mins</option>
            <option value="120">120 mins</option>
            <option value="unlimited">unlimited</option>
          </select>

         


          <select
            className="cat-time"
            name="priority"
            value={mediaInput.priority}
            onChange={handleChange} 
          >
            <option value="">Priority </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
           
          </select>

              

          <input
                type="text"
                name="url"
                placeholder="Enter media url.."
                value={mediaInput.url}
                onChange={handleChange} 
               />
               <button className="add-btn" onClick={handleAdd}> Add Media  </button>
           </form>
        </div>
    )
}

export default AddMedia