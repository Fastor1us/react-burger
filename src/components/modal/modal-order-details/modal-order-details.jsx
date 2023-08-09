import React from 'react';
import checkMarkImage from './../../../images/check-mark-image.png';
import modalOrderStyles from './modal-order-details.module.css'
import { DataContext } from '../../utils/dataContext';
import { API_URL } from '../../app/app';
import { OrderInfoContext } from '../../utils/orderInfoContext';


export default function ModalOrderDetails() {
  const { orderInfo, dispatchOrderInfo } = React.useContext(OrderInfoContext);
  const { data } = React.useContext(DataContext);
  const burgerBunID = data.data.find((i) => i.type === 'bun')._id;
  const burgerIngredientsIDs = data.data.filter((i) => (i.type === 'sauce' || i.type === 'main')).map(i=>i._id);

  React.useEffect(() => {
    fetch(
      `${API_URL}/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'ingredients': [burgerBunID, ...burgerIngredientsIDs],
        })
      })
      .then((res) => res.json())
      .then((data) => dispatchOrderInfo({type: 'setOrderInfo', orderInfo: data}))
      .catch((err) => console.log(err));
  }, []);

  return (<>
    {orderInfo?.success ? (
      <section className={modalOrderStyles.orderCard}>
        <h3 className='text text_type_digits-large'>{orderInfo.order.number}</h3>
        <p className='text text_type_main-medium mt-3'>идентификатор заказа</p>
        <img src={checkMarkImage} alt='галочка' className='mt-8' />
        <p className='text text_type_main-default mt-8'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
      </section>
    ) : <h2>Произошла ошибка! Обратитесь в поддержку</h2> }
  </>
  )
}
