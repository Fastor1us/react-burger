import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../utils/dataContext';
import { getData } from '../utils/api';


export default function App() {
  React.useEffect(() => {
    getData()
      .then((data) => {
        if (data) {
          dispatchData({ type: 'setData', data: data });
        } else {
          console.log('ошибка получения данных!');
        }
      })
      .catch((err) => console.log(err));
  }, []);
  
  const [data, dispatchData] = React.useReducer(dataReducer, []);

  return (
    <>
      {data?.success ? (
        <DataContext.Provider value={{data, dispatchData}}>
          <div className={appStyles.page}>
            <AppHeader />
            <main className={appStyles.main}>
              <h1
                className={`${appStyles.mainTitle} text text_type_main-large mt-10 mb-5`}
              >
                Соберите бургер
              </h1>
              <section className={appStyles.mainContainer}>
                <BurgerIngredients data={data.data}/>
                <BurgerConstructor />
              </section>
            </main>
          </div>
        </DataContext.Provider>
      ) : <h1>При загрузке данных возникла ошибка!</h1>}
    </>
  );
}

function dataReducer(state, action) {
  switch(action.type) {
    case 'setData':
      return action.data;
    default:
      throw new Error(action.type);
  }
}
