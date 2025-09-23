import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>CLUBBEE - Minimal Test</h1>
      <p>This is a minimal version to test if the server works.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);