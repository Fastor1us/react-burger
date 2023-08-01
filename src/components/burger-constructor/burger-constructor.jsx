import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function BurgerConstructor(props) {
  const bunData = props.data.find((i) => i.type === 'bun');
  const sauceData = props.data.filter((i) => i.type === 'sauce');
  const mainData = props.data.filter((i) => i.type === 'main');
  const totalPrice = props.data
    .map((i) => i.price)
    .reduce((acc, curr) => acc + curr);

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
            text={bunData.name}
            price={bunData.price}
            thumbnail={bunData.image}
          />
        </li>
        <ol className={burgerTopping}>
          {[sauceData, mainData].map((arr) => {
            return arr.map((item) => {
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
            });
          })}
        </ol>
        <li className='ml-8 mb-10'>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={bunData.name}
            price={bunData.price}
            thumbnail={bunData.image}
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
        <Button htmlType='button' type='primary' size='medium'>
          Оформить заказ
        </Button>
      </section>
    </section>
  );
}

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
