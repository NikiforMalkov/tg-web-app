import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import {Route, Routes} from 'react-router-dom';
import Form from './components/Form/Form';

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
      tg.ready();
  }, [])

  return (
      <div className="App">
          <Header />
          <Routes>
              <Route index element={<ProductList />}/>
              <Route path={'form'} element={<Form />}/>
          </Routes>
      </div>
  );
}

export default App;
