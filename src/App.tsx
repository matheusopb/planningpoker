import React from 'react';
import Rooms from './pages/Rooms';
import { Provider } from 'react-redux';

import store from './store';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          {'olá mundo'}
        </header>
        <Rooms />
      </div>
    </Provider>
  );
}

export default App;
