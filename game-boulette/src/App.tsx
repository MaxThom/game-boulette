import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button" className="btn btn-primary">Primary</button>
          
        </a>
        <Button variant="contained">Default</Button>
      </header>
    </div>
  );
}

export default App;
