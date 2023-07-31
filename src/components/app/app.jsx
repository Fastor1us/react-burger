import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import appStyles from './app.module.css';

import data from '../utils/data';
import chosenIngredientsData from '../utils/chosenIngredientsData';

export default class App extends React.Component {
  render() {
    return (
      <div className={appStyles.page}>
        <AppHeader />
        <main className={appStyles.main}>
          <h1 className='text text_type_main-large mt-10 mb-5' style={{width:'100%'}}>Соберите бургер</h1>
          <section style={{display: 'flex', gap: 40,}}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={chosenIngredientsData}/>
          </section>
        </main>
      </div>
    )
  }
}
