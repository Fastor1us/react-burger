import React, { useCallback, useEffect, useMemo }  from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalOrderDetails from '../modal/modal-order-details/modal-order-details';
import { useSelector } from 'react-redux';
import ChosenIngredient from './chosen-ingredient/chosen-ingredient';
import { useDispatch } from 'react-redux';
import { changeIngredientPosition } from '../../store/slicers/chosenIngredientsSlicer';
import { addIngredient } from '../../store/slicers/chosenIngredientsSlicer';
import { setOrderInfo } from '../../store/slicers/orderInfoSlicer';
import { useDrop } from 'react-dnd';
import { burgerAPI } from '../../utils/burger-api';
import { useNavigate } from 'react-router-dom';


export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const { bun, topping } = useSelector(state => state.chosenIngredients);

  useMemo(() => {
    setTotalPrice([bun, bun, ...topping].map((i) => i.price).reduce((acc, curr) => acc + curr) || 0);
  }, [bun, topping]);

  const [getOrderInfo, { data, isLoading, isSuccess }] = burgerAPI.endpoints.postOrderInfo.useMutation();
  useEffect(() => {
    isSuccess && dispatch(setOrderInfo({data, isLoading, isSuccess})) && setShowModal(true);
  }, [isSuccess]);

  const onOrderBtnClick = () => {
    (localStorage.getItem('accessToken') !== null &&
    getOrderInfo([bun, ...topping])) || navigate('/login')
  };

  const moveIngredient = useCallback((dragIndex, hoverIndex) => {
    dispatch(changeIngredientPosition({prevIndex: dragIndex, newIndex: hoverIndex}))
  }, []);

  const renderIngredient = useCallback((item, index, moveIngredient) => {
    return (
      <ChosenIngredient key={item.key} 
        data={item}  
        index={index}
        moveIngredient={moveIngredient}
      />
    )
  }, []);

  const [{ getItem }, dropRef] = useDrop({
    accept: 'newIngredient',
    drop(item) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      getItem: monitor.getItem(),
    })
  });

  const {
    constructor,
    choosenIngredientList,
    burgerTopping,
    submitSection,
    toppingTotalPrice,
  } = styles;

  return (
    <section>
      <section ref={dropRef} className={getItem && !('index' in getItem) ? constructor : ''}>
        <ol className={choosenIngredientList}>
          <li className='ml-8 mb-4'>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name || 'выберите булочку!'} (верх)`}
              price={bun.price || 0}
              thumbnail={`${bun.image || 'https://imgholder.ru/80x40&font=kelson'}`}
            />
          </li>
          <ol className={burgerTopping}>
            {topping.map((item, index) => renderIngredient(item, index, moveIngredient))}
          </ol>
          <li className='ml-8 mb-10'>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name || 'выберите булочку!'} (низ)`}
              price={bun.price || 0}
              thumbnail={`${bun.image || 'https://imgholder.ru/80x40&font=kelson'}`}
            />
          </li>
        </ol>
      </section>
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
          onClick={onOrderBtnClick}
          disabled={isLoading}
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
