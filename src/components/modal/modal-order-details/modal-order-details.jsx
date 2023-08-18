import React from 'react';
import checkMarkImage from './../../../images/check-mark-image.png';
import modalOrderStyles from './modal-order-details.module.css';
import { useSelector } from 'react-redux';


export default function ModalOrderDetails() {
  const orderInfo = useSelector(state => state.orderInfo.data);

  return (<>
    {orderInfo?.success ? (
      <section className={modalOrderStyles.orderCard}>
        <h3 className='text text_type_digits-large'>
          {orderInfo.order.number}
        </h3>
        <p className='text text_type_main-medium mt-3'>
          идентификатор заказа
        </p>
        <img src={checkMarkImage} alt='галочка' className='mt-8' />
        <p className='text text_type_main-default mt-8'>
          Ваш заказ начали готовить
        </p>
        <p className='text text_type_main-default text_color_inactive mt-2'>
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
    ) : <h2>Произошла ошибка! Обратитесь в поддержку</h2> }
  </>
  )
}
