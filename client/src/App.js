import './App.css';
import { Button } from './components/Button';
import { text } from './dummy_text';

function generateRandomColor() {
  const colors = ['red', 'blue', 'green', 'black', 'grey', 'brown', 'yellow', 'orange', 'indigo', 'violet'];
  const randomInd = Math.floor(Math.random() * colors.length);
  return colors[randomInd];
}

function App() {
  return (
    <div className="App">
      <div className="container">
        {text.map((txt, ind) => (
            <Button key={ind} text={"Hey"} color={generateRandomColor()}/>
        ))}
    </div>
    <div className="response">
      
    </div>
    </div>
  );
}

export default App;
