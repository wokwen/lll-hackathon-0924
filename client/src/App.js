import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';

function generateRandomColor() {
  const colors = ['red', 'blue', 'green', 'black', 'grey', 'brown', 'yellow', 'orange', 'indigo', 'violet'];
  const randomInd = Math.floor(Math.random() * colors.length);
  return colors[randomInd];
}

function App() {
  const [initPsyhcBot, setPsychBot] = useState('Responses from psychologist bot will be posted here!');
  const initialPhrases = ['Fatigued', 'Isolated', 'Stressed', 'Unstable', 'Disconnected', 'Overwhelmed', 'Worried', 'Malnourished']
  const [phrases, setPhrases] = useState(initialPhrases);

  // Fetch PsychBot response only when a concern is set (after a button is clicked)
  const fetchPsychBotResponse = (concern) => {
    fetch('http://localhost:8080/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ concern }),  // Use dynamic concern
    })
      .then(response => response.json())
      .then(data => {
        setPsychBot(data.response);
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  };


  const handleButtonClick = (btnText) => {
    console.log('Button clicked:', btnText);  
    setPsychBot(fetchPsychBotResponse(btnText));
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
        const phrasesArray = data.response.split('\n').filter(phrase => phrase.trim() !== '').map(text => text.replace(/^\d+\.\s*/, ''));
        setPhrases(phrasesArray);
        console.log(phrasesArray);
      })
      .catch(error => console.error('Error:', error));
  }

  return (
    <div className="App">
      <p>How do you feel?</p>
      <div className="container">
        {phrases.map((txt, ind) => (
          <Button key={ind} text={txt} color={generateRandomColor()} onClick={() => handleButtonClick(txt)}/>
        ))}
      </div>
      <button id='generate' onClick={generatePhrases}>Generate</button>
      <div className="response">
        <span id='psych-name'>PsychBot response: </span>{initPsyhcBot}  
      </div>
    </div>
  );
}

export default App;
