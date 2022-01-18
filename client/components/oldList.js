import React, { useState } from 'react';
import Card from '../components/Card.js';
import AddMedia from "./AddMedia"

function List({ allMedia }) { 
  const components = allMedia.map(obj => {
    // line 8: every card requires a unique key, which can be assigned to the media_id since those keys are always unique
    return (
      <div key={obj.media_id}>
        <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id}/>
      </div>
    );
  });

  return ( 
    
      <div className="list-cont">
        <div className="add-cont">
          <AddMedia />
        </div>
      <div className="flex-container">
      <div className="ml">
       
        
        </div>
        {/* {components} */}
      </div>
    </div>
  );
}

export default List;
