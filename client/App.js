import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import List from './components/List.js';
import DurationDropdown from './components/DurationDropdown';


// const allMedia = [ { media_id: 2, title: "silicon valley", category: "show", duration: 30, priority: 1, url: null, user_id: 1 }, { media_id: 3, title: "queen's gambit" category: "show", duration: 30, priority: 1, url: null, user_id: 1 }, ]

function App() {

  const [allMedia, setAllMedia] = useState([]);

  // https://dmitripavlutin.com/react-useeffect-explanation/
  useEffect(() => {
    async function fetchMedia() {
      const response = await fetch('http://localhost:3000/api/');
      const fetchedMedia = await response.json(response);
      setAllMedia(fetchedMedia);
    }
    fetchMedia();
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      {/* <div className='tabContainer'><DurationDropdown /></div> */}
     
      <List allMedia={allMedia} />
    </div>
  );
}

export default App;
