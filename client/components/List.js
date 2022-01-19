import React, { useState, useEffect } from 'react';

import Card from './Card.js';
import AddMedia from "./AddMedia.js"

const timeOptions = ['Show All', 15, 30, 60, 120];
const categoryOptions = ['Show All', 'Shows', 'Movies', 'Podcasts', 'Videos'];

function List({ allMedia }) {
  let [list, setList] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    if (select === 'show all') setList(allMedia);
    else setList(allMedia.filter(obj => (obj.duration <= select) || (obj.category.toLowerCase() === select)));
  }, [select]);

  function filterComponents(priority) {
    const components = list.filter(obj => (obj.priority === priority)).map(obj => {
      return (
        <div className={priority === 1 ? 'first' : priority === 2 ? 'second' : 'third'}>
          <div key={obj.media_id}>
            <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id} />
          </div>
        </div>
      );
    });
    return components;
  };


  return (
    <div>
      <div className="list-cont">
        
        <div className="add-cont">
            <AddMedia />
        </div>

        <div className="flex-container ml"> 
          <h2>Media Items</h2>
          <div>
            <div>
              <div className="tabContainer">
                <select className="tab" id="time" onChange={e => setSelect(e.target.value)}>
                  <option className="option">Display by Time</option>
                  {timeOptions.map(item =>
                    <option className="option" key={item} value={item}>{item}</option>)}
                </select>
                <select className="tab" id="category" onChange={e => setSelect(e.target.value)}>
                  <option className="option">Display by Category</option>
                  {categoryOptions.map(item =>
                    <option className="option" key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>

            <div className="three-cols ml">
              <div>
                <h1>Priority 1</h1>
                  {filterComponents(1)}
              </div>
              <div>
                <h1>Priority 2</h1>
                  {filterComponents(2)}
              </div>
              <div>
                <h1>Priority 3</h1>
                  {filterComponents(3)}
              </div>
            </div>

          </div>
        </div> 
      </div>
    </div>
  )
};

export default List;
