import { useSelector } from '../../utils/hooks/hooks';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Price } from '../price';
import styles from './order-detail.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { burgerAPI } from '../../utils/api/burger-api';
import { TWsOrderCard } from '../../../interfaces/ws-order-card';


export default function OrderDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const wsData = useSelector(store => store.ws);
  const [orderData, setOrderData] = useState<TWsOrderCard>();
  const { data } = burgerAPI.useFetchOrderInfoByOrderIdQuery(id);
  useEffect(() => {
    if (wsData.orders && wsData.isConnected) {
      wsData.orders.find((item: TWsOrderCard) => {
        if (item._id === id) {
          setOrderData(item);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (!orderData) {
      setOrderData(data?.orders[0]);
    }
  }, [data]);
  const availableIngredients = useSelector(store => store.availableIngredients.data);

  return (
    <>
      {orderData && (
        <section className={styles.orderCard}>
          <p className={`${styles.orderId} text text_type_digits-default mb-10`}>
            {`#${id}`}
          </p>
          <p className='text text_type_main-medium mb-3'>
            {orderData.name}
          </p>
          <p className='text text_type_main-default mb-15'>
            {orderData.status}
          </p>
          <p className='text text_type_main-medium mb-3'>
            Состав:
          </p>
          <div className={`${styles.orderFeed} mb-10`}>
            {Object.entries(orderData.ingredients?.reduce(
              (prevVal: { [key: string]: number }, ingredientId: string) => {
                prevVal[ingredientId] = !prevVal[ingredientId] ? 1 : prevVal[ingredientId] + 1;
                return prevVal;
              }, {})).map((item, index) => (
                <div key={index} className={`${styles.ingredientsImageContainer} mb-4`}>
                  <img
                    className={styles.ingredientsImage}
                    src={availableIngredients.find(available => available._id === item[0])?.image}
                    alt={availableIngredients.find(available => available._id === item[0])?.name}
                  />
                  <p className={`${styles.ingredientsName} text text_type_main-default ml-4`}>
                    {availableIngredients.find(available => available._id === item[0])?.name}
                  </p>
                  <span className={`${styles.priceSection} text text_type_digits-default`}>
                    {`${item[1]} x\u00A0`}
                    <Price>
                      {(availableIngredients.find(available => available._id === item[0])?.price ?? 0) * item[1]}
                    </Price>
                  </span>
                </div>
              ))}
          </div>
          <div className={`${styles.cardFooter} mb-8`}>
            <div className={styles.orderCreationDate}>
              <FormattedDate date={new Date(orderData.createdAt)} />
            </div>
            <Price>
              {orderData.ingredients.reduce((acc, ingredientId) => {
                return acc + (availableIngredients.find(available => available._id === ingredientId)?.price ?? 0);
              }, 0)}
            </Price>
          </div>
        </section >
      ) || 'Заказ с данным номером не найден'
      }
    </>
  );
}
