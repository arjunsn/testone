import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.memes);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="cards">
        <h1>MEME WORLD</h1>
        {items.map(item => (
          <div className="card" key={item.id} onClick={() => {
            window.location.href = `${item.url}`;
          }}>
            <img src={item.url} alt="Meme" />
            <h4><b>{item.name}</b></h4>
          </div>
        ))}
      </div>
    );
  }
}


export default App;
