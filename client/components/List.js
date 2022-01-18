import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Card from '../components/Card.js';
import AddMedia from "./AddMedia"

const timeOptions = ['show all', 15, 30, 60, 120];
const categoryOptions = ['show all', 'show', 'movie', 'podcast', 'video'];

function List({ allMedia }) {
  let [list, setList] = useState([]);
  const [select, setSelect] = useState([]);

  useEffect(() => {
    if (select === 'show all') setList(allMedia);
    else setList(allMedia.filter(obj => (obj.duration <= select) || (obj.category.toLowerCase() === select)));
  }, [select]);

  const handleDelete = (media_id) => {
    const allCards = list.filter(obj => media_id !== media_id);
    setList(allCards);
    navigate('/');
  }

  const components = list.map(obj => {
    return (
      <div key={obj.media_id}>
        <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id} />
      </div>
    );
  });

  // <div>
  //   <button onClick={() => handleDelete(media_id)}>delete</button>
  // </div>

  const firstComponents = list.filter(obj => (obj.priority === 1)).map(obj => {
    return (
      <div className="first">
        {/* <div>
          <button onClick={() => handleDelete(media_id)}>delete</button>
        </div> */}
        <div key={obj.media_id}>
          <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id}
          />
        </div>

      </div>
    );
  });

  const secondComponents = list.filter(obj => (obj.priority === 2)).map(obj => {
    return (
      <div key={obj.media_id} className='second'>
        <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id} />
      </div>
    );
  });

  const thirdComponents = list.filter(obj => (obj.priority === 3)).map(obj => {
    return (
      <div key={obj.media_id} className='third'>
        <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id} />
      </div>
    );
  });

  return (
    <div>

<div className="list-cont">

        <div className="add-cont">
          <AddMedia />
        </div>
 <div className="flex-container ml"> 
      <h2>Media Items</h2>
      
      <div >


      <div className="tabContainer">
        <select id="time" onChange={e => setSelect(e.target.value)} className="tab">
          <option className="option">display by time</option>
          {timeOptions.map(item =>
            <option className="option" key={item} value={item}>{item}</option>)}
        </select>
        <select id="category" onChange={e => setSelect(e.target.value)} className="tab">
          <option className="option">display by category</option>
          {categoryOptions.map(item =>
            <option className="option" key={item} value={item}>{item}</option>)}
        </select>

        
      </div>

      <div className="three-cols ml">
        <div><h1>Priority 1</h1>{firstComponents}</div>
        <div><h1>Priority 2</h1>{secondComponents}</div>
        <div><h1>Priority 3</h1>{thirdComponents}</div>

        </div>
      </div>
    </div>

    </div>
    </div>
  )
}

export default List;
