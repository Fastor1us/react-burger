import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import appStyles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

import chosenIngredientsData from '../utils/chosenIngredientsData';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export default function App() {
  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {(data?.success && (
        <div className={appStyles.page}>
          <AppHeader />
          <main className={appStyles.main}>
            <h1
              className={`${appStyles.mainTitle} text text_type_main-large mt-10 mb-5`}
            >
              Соберите бургер
            </h1>
            <section className={appStyles.mainContainer}>
              <BurgerIngredients data={data.data} />
              <BurgerConstructor data={chosenIngredientsData} />
            </section>
          </main>
        </div>
      )) || <h1>При загрузке данных возникла ошибка!</h1>}
    </>
  );
}
