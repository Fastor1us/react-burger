import React from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/prop-types';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOrderDetails from '../modal/modal-order-details/modal-order-details';

export default function BurgerConstructor(props) {
  const [showModal, setShowModal] = React.useState(false);
  const bunData = props.data.find((i) => i.type === 'bun');
  const sauceData = props.data.filter((i) => i.type === 'sauce');
  const mainData = props.data.filter((i) => i.type === 'main');
  const totalPrice =
    props.data.map((i) => i.price).reduce((acc, curr) => acc + curr) +
    bunData.price;
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
        <Modal setVisible={setShowModal}>
          <ModalOrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
