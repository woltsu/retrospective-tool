import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ExampleComponent from './components/ExampleComponent';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div style={containerStyle}>
            <Header />
            <Route exact path='/' render={() => <ExampleComponent />} />
          </div>
        </Router>
    );
  }
}

const containerStyle = {
  minHeight: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column'
}

export default App;
