import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useTelegram } from './hooks/useTelegram';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import {Route, Routes} from 'react-router-dom';
import Form from './components/Form/Form';
import './i18n/config';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {

  const {onToggleButton, tg} = useTelegram();

  const { t } = useTranslation();

  useEffect(() => {
      tg.ready();
  }, [])

  return (
      <div className="App">
        <Provider store={store}>
            <Header />
          <Routes>
              <Route index element={<ProductList />}/>
              <Route path={'form'} element={<Form />}/>
          </Routes>
        </Provider>
      </div>
  );
}

export default App;
