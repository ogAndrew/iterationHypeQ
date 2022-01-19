import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import List from './components/List.js';
import { fetchMedia } from './async.js';

function App() {
  const [allMedia, setAllMedia] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(async () => {
    const result = await fetchMedia();
    setAllMedia(result);
    setLoad(false)
  }, []);

  return (
    <div className="wrapper">
      <Header />
      {!load && <List allMedia={allMedia} />}
    </div>
  );
}

export default App;
