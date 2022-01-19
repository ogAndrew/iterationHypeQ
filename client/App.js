import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import List from './components/List.js';
import { fetchMedia } from './async.js';

function App() {
  //dummy data
  // const allMedia = [ { media_id: 456, title: "silicon valley", category: "show", duration: 120, priority: 3, url: null, user_id: 1 }, { media_id: 5, title: "silicon valley", category: "show", duration: 60, priority: 2, url: null, user_id: 1 }, { media_id: 2, title: "silicon valley", category: "show", duration: 30, priority: 1, url: null, user_id: 1 }, { media_id: 3, title: "queen's gambit", category: "show", duration: 30, priority: 1, url: null, user_id: 1 }, ]
  const [allMedia, setAllMedia] = useState([]);

  useEffect(async () => {
    const result = await fetchMedia();
    setAllMedia(result);
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <List allMedia={allMedia} />
    </div>
  );
}

export default App;
