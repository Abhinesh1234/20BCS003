import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [numbers, setNumbers] = useState([]);

  const fetchNumbers = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urls = urlParams.getAll('url');

      const requests = urls.map(url => axios.get(url));
      const responses = await Promise.all(requests);

      const mergedNumbers = responses.reduce((merged, response) => {
        if (response.data && Array.isArray(response.data.numbers)) {
          merged = Array.from(new Set([...merged, ...response.data.numbers]));
        }
        return merged;
      }, []);
      const sortedNumbers = mergedNumbers.sort((a, b) => a - b);
      setNumbers(sortedNumbers);

      setNumbers(mergedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <h1>20BCS003 - Number Management</h1>
      <button onClick={fetchNumbers}>Fetch Numbers</button>
    <p>numbers= {numbers+ " "}</p>
      

        
      
    </div>
  );
}

export default App;
