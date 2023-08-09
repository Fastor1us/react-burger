import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import appStyles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from '../utils/dataContext';
import { TotalPriceContext } from '../utils/totalPriceContext';
import { OrderInfoContext } from '../utils/orderInfoContext';

export const API_URL = 'https://norma.nomoreparties.space/api';

export default function App() {
  React.useEffect(() => {
    fetch(`${API_URL}/ingredients`)
    .then((res) => res.json())
    .then((data) => {
      dispatchData({type: 'setData', data: data})
    })
    .catch((err) => console.log(err));
  }, []);
  
  const [data, dispatchData] = React.useReducer(dataReducer, []);
  const [totalPrice, dispatchTotalPrice] = React.useReducer(totalPriceReducer, 0);
  const [orderInfo, dispatchOrderInfo] = React.useReducer(orderInfoReducer, {});

  function dataReducer(state, action) {
    switch(action.type) {
      case 'setData':
        return action.data;
      default:
        throw new Error(action.type);
    }
  }

  function totalPriceReducer(state, action) {
    switch(action.type) {
      case 'getTotalPrice':
        return action.ingredients.map((i) => i.price).reduce((acc, curr) => acc + curr);
      default:
        throw new Error(action.type);
    }
  }

  function orderInfoReducer(state, action) {
    switch(action.type) {
      case 'setOrderInfo':
        return action.orderInfo;
      default:
        throw new Error(action.type);
    }
  }

  return (
    <>
      {data?.success ? (
        <DataContext.Provider value={{data, dispatchData}}>
          <TotalPriceContext.Provider value={{totalPrice, dispatchTotalPrice}}>
            <OrderInfoContext.Provider value={{orderInfo, dispatchOrderInfo}}>
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
            </OrderInfoContext.Provider>
          </TotalPriceContext.Provider>
        </DataContext.Provider>
      ) : <h1>При загрузке данных возникла ошибка!</h1>}
    </>
  );
}
