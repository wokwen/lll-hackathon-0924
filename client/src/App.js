import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { text } from './dummy_text';

function generateRandomColor() {
  const colors = ['red', 'blue', 'green', 'black', 'grey', 'brown', 'yellow', 'orange', 'indigo', 'violet'];
  const randomInd = Math.floor(Math.random() * colors.length);
  return colors[randomInd];
}

function App() {
  const [message, setMessage] = useState('Hey there');
  const [clickedText, setClickedText] = useState('');
  const initialPhrases = ['Welcome', 'To', 'This', 'New', 'Mental', 'Health', 'Game', ';)']
  const [phrases, setPhrases] = useState(initialPhrases);

  useEffect(() => {
    fetch('http://localhost:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concern: 'I feel hungry' }),
    })
      .then(response => response.json())
      .then(data => {
        setMessage(data.response);
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const handleButtonClick = (btnText) => {
    setClickedText(btnText);  // Update the clicked text
    console.log('Button clicked:', btnText);  // Log the clicked text
    // You can also send `btnText` to the backend if needed.
  };

  function generatePhrases() {
    fetch('http://localhost:8080/api/phrases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concern: 'I feel hungry'}),
    })
      .then(response => response.json())
      .then(data => {
        const phrasesArray = data.response.split('\n').filter(phrase => phrase.trim() !== '');
        setPhrases(phrasesArray);
        console.log(data.response);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App">
      <div className="container">
        {phrases.map((txt, ind) => (
          <Button key={ind} text={txt} color={generateRandomColor()} />
        ))}
      </div>
      {/* <div className='generate' onClick={generatePhrases}> */}
        <button id='generate' onClick={generatePhrases}>Play</button>
      {/* </div> */}
      <div className="response">
        Psychologist response: {message}  
      </div>
    </div>
  );
}

export default App;
