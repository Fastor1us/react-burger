import { useState, useCallback, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import ModalNewOrderDetails from '../modal/modal-new-order-details/modal-new-order-details';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import ChosenIngredient from './chosen-ingredient/chosen-ingredient';
import { changeIngredientPosition } from '../../store/slicers/chosenIngredientsSlicer';
import { resetChosenIngredientStore } from '../../store/slicers/chosenIngredientsSlicer';
import { addIngredient } from '../../store/slicers/chosenIngredientsSlicer';
import { setOrderInfo } from '../../store/slicers/orderInfoSlicer';
import { useDrop } from 'react-dnd';
import { burgerAPI } from '../../utils/api/burger-api';
import { useNavigate } from 'react-router-dom';
import { TIngredientItem } from '../../../interfaces/ingredient-item-type';


export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { bun, topping } = useSelector(store => store.chosenIngredients);

  useMemo(() => {
    setTotalPrice([bun, bun, ...topping].map((i) => i.price).reduce((acc, curr) => acc + curr) || 0);
  }, [bun, topping]);

  const [getOrderInfo, { data, isLoading, isSuccess, isError }] = burgerAPI.endpoints.postOrderInfo.useMutation();
  useEffect(() => {
    if (isSuccess && showLoadingModal && !isError) {
      dispatch(setOrderInfo({ data, isLoading, isSuccess }));
      dispatch(resetChosenIngredientStore());
      setShowModal(true);
    }
  }, [isSuccess]);

  const onOrderBtnClick = () => {
    if (localStorage.getItem('accessToken') !== null) {
      setShowLoadingModal(true);
      getOrderInfo([bun, ...topping]);
    } else {
      navigate('/login');
    }
  };

  const moveIngredient = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(changeIngredientPosition({ prevIndex: dragIndex, newIndex: hoverIndex }))
  }, []);

  const renderIngredient = useCallback((item: TIngredientItem, index: number, moveIngredient: (dragIndex: number, hoverIndex: number) => void) => {
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
    drop(item: TIngredientItem) {
      dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      getItem: monitor.getItem(),
    })
  });

  const {
    burgerConstructor,
    choosenIngredientList,
    burgerTopping,
    submitSection,
    toppingTotalPrice,
  } = styles;

  return (
    <section>
      <section ref={dropRef} className={getItem && !('index' in getItem) ? burgerConstructor : ''}>
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
            {topping.map((item, index: number) => renderIngredient(item, index, moveIngredient))}
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
          disabled={bun.price === 0 || (isLoading ? (isLoading && showLoadingModal) : false)}
        >
          Оформить заказ
        </Button>
      </section>
      {isLoading && showLoadingModal && (
        <Modal setVisible={setShowLoadingModal}>
          <h1>{(isLoading && 'Идет оформление заказа...') ||
            (isError && 'При оформлении заказа произошла ошибка')}</h1>
        </Modal>
      )}
      {showModal && (
        <Modal setVisible={setShowModal}>
          <ModalNewOrderDetails />
        </Modal>
      )}
    </section>
  );
}
