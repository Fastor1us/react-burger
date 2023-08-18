import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { setData } from '../../store/slicers/dataSlicer';
import { dataAPI } from '../utils/api';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


export default function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError, isSuccess } = dataAPI.useFetchAllDataQuery();
  useEffect(() => {
    dispatch(setData({data, isLoading, isError, isSuccess}));
  }, [isLoading]);
  
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className={`${appStyles.mainTitle} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <DndProvider backend={HTML5Backend}>
          <section className={appStyles.mainContainer}>
            <BurgerIngredients />
            <BurgerConstructor />
          </section>
        </DndProvider>
      </main>
    </div>
  );
}
