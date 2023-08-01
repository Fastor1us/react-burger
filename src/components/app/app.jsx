import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import appStyles from './app.module.css';

import data from '../utils/data';
import chosenIngredientsData from '../utils/chosenIngredientsData';

export default function App() {
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1
          className={`${appStyles.mainTitle} text text_type_main-large mt-10 mb-5`}
        >
          Соберите бургер
        </h1>
        <section className={appStyles.mainContainer}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={chosenIngredientsData} />
        </section>
      </main>
    </div>
  );
}
