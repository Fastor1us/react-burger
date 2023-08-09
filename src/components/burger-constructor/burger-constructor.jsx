import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOrderDetails from '../modal/modal-order-details/modal-order-details';
import { DataContext } from '../utils/dataContext';
import { TotalPriceContext } from '../utils/totalPriceContext';


export default function BurgerConstructor() {
  const [showModal, setShowModal] = React.useState(false);
  const { data } = React.useContext(DataContext);
  const { totalPrice, dispatchTotalPrice } = React.useContext(TotalPriceContext);
  const burgerBun = data.data.find((i) => i.type === 'bun');
  const burgerIngredients = data.data.filter((i) => (i.type === 'sauce' || i.type === 'main'));
  dispatchTotalPrice({ type: 'getTotalPrice', ingredients: [burgerBun, burgerBun, ...burgerIngredients]});
  const onItemClick = () => setShowModal(true);

  const {
    choosenIngredientList,
    burgerTopping,
    toppingItem,
    submitSection,
    toppingTotalPrice,
  } = burgerConstructorStyles;

  return (
    <section>
      <ol className={choosenIngredientList}>
        <li className='ml-8 mb-4'>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${burgerBun.name} (верх)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </li>
        <ol className={burgerTopping}>
          {burgerIngredients.map((item) => {
              return (
                <li key={item._id} className={`${toppingItem} mb-4 mr-2`}>
                  <DragIcon type='primary' />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li>
              );
            })
          }
        </ol>
        <li className='ml-8 mb-10'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${burgerBun.name} (низ)`}
            price={burgerBun.price}
            thumbnail={burgerBun.image}
          />
        </li>
      </ol>
      <section className={submitSection}>
        <p className={toppingTotalPrice}>
          <span className='text text_type_digits-default mr-2'>
            {totalPrice}
          </span>
          <CurrencyIcon type='primary' />
        </p>
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={onItemClick}
        >
          Оформить заказ
        </Button>
      </section>
      {showModal && (
        <Modal setVisible={setShowModal} >
          <ModalOrderDetails />
        </Modal>
      )}
    </section>
  );
}
