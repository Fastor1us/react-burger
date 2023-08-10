import React from 'react';
import checkMarkImage from './../../../images/check-mark-image.png';
import modalOrderStyles from './modal-order-details.module.css';
import PropTypes from 'prop-types';


export default function ModalOrderDetails(props) {
  return (<>
    {props.orderInfo?.success ? (
      <section className={modalOrderStyles.orderCard}>
        <h3 className='text text_type_digits-large'>{props.orderInfo.order.number}</h3>
        <p className='text text_type_main-medium mt-3'>идентификатор заказа</p>
        <img src={checkMarkImage} alt='галочка' className='mt-8' />
        <p className='text text_type_main-default mt-8'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
      </section>
    ) : <h2>Произошла ошибка! Обратитесь в поддержку</h2> }
  </>
  )
}

ModalOrderDetails.propTypes = {
  orderInfo: PropTypes.object.isRequired,
}
