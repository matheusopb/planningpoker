import Rooms from './pages/Rooms';
import Header from './components/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Login />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
