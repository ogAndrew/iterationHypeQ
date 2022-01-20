import React, { useState, useEffect } from 'react';

import Card from './Card.js';
import AddMedia from "./AddMedia.js"
import { updateMedia, fetchMedia, deleteMedia, addMediaToDb } from '../async.js';

const timeOptions = ['Show All', 15, 30, 45, 60, 90, 120, 'unlimited'];
const categoryOptions = ['Show All', 'show', 'movie', 'podcast', 'video', 'book'];

function List() {
  const [list, setList] = useState([]);
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [load, setLoad] = useState(true);

  useEffect(async () => {
    const allMedia = await fetchMedia();

    if (select === 'Show All') {
      setList(allMedia);
    } else {
      setList(filterList(allMedia));
    }
    setLoad(false)
  }, [select]);

  async function handleAdd(mediaInput) {
    const { category } = mediaInput;
    const res = await addMediaToDb(mediaInput);
    if (res.id) {
      setList([res, ...list]);
      setSelect(category);
      setCategory(category);
      setTime('');
    }
  }

  async function handleUpdate(id, input) {
    const res = await updateMedia(id, input);
    const { duration, category } = input;
    const updatedList = list.filter(item => item.id !== id);
    if (res.id) {
      setCategory(category);
      setSelect(category);
      setTime('');
      setList([res, ...updatedList]);
    }

  };
    // invoke updateMedia(id);

  async function handleDelete(id) {
    const results = await deleteMedia(id)
    if (results) {
      const updatedData = await fetchMedia();
      setList(updatedData);
    } 
  };

  function handleChange(value) {
    setSelect(value)
    if (categoryOptions.includes(value)) {
      setCategory(value);
      setTime('');
    } else {
      setCategory('');
      setTime(value);
    }
  }

  function filterList(mediaList) {
    if (!mediaList) return;

    return mediaList.filter(obj => {
      if (obj.duration === 'unlimited' && select === 'unlimited') {
        return obj;
      }
      return obj.duration === select || obj.category === select;
    });
  }

  function filterComponents(priority) {
    const components = list.filter(obj => (obj.priority === priority)).map(obj => {
      return (
        <div key={obj.id} className={priority === 1 ? 'first' : priority === 2 ? 'second' : 'third'}>
          <Card 
            id={obj.id} 
            title={obj.title} 
            category={obj.category} 
            duration={obj.duration} 
            priority={obj.priority} 
            url={obj.url} 
            handleUpdate={handleUpdate} 
            handleDelete={handleDelete}
          />
        </div>
      );
    });
    return components;
  };

  





  return (
    <div>
      <div className="list-cont">
        
        <div className="add-cont">
            <AddMedia handleAdd={handleAdd} />
        </div>

        <div className="flex-container ml"> 
          <h2>Media Items</h2>
          <div>
            <div>
              <div className="tabContainer">
                <select 
                  className="tab" 
                  id="time"
                  value={time}
                  onChange={e => handleChange(e.target.value)}>
                  <option className="option">Display by Time</option>
                  {timeOptions.map(item =>
                    <option className="option" key={item} value={item}>{item}</option>)}
                </select>
                <select 
                  className="tab" 
                  id="category"
                  value={category}
                  onChange={e => handleChange(e.target.value)}>
                  <option className="option">Display by Category</option>
                  {categoryOptions.map(item =>
                    <option className="option" key={item} value={item}>{item}</option>)}
                </select>
              </div>
            </div>

            <div className="three-cols ml">
              <div>
                <h1>Priority 1</h1>
                  {!load && filterComponents("1")}
              </div>
              <div>
                <h1>Priority 2</h1>
                  {!load && filterComponents("2")}
              </div>
              <div>
                <h1>Priority 3</h1>
                  {!load && filterComponents("3")}
              </div>
            </div>
            
          </div>
        </div> 
      </div>
    </div>
  )
};

export default List;