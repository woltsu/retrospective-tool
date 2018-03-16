import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ExampleComponent from './components/ExampleComponent';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' render={() => <ExampleComponent />} />
        </div>
      </Router>
    );
  }
}

export default App;
