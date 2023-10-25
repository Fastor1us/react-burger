import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';

import styles from './feed-page.module.css';

import OrderFeedCard from '../../components/order-feed-card/order-feed-card';

import { TWsOrderCard } from '../../../interfaces/ws-order-card';

import { wsInit, wsClose } from '../../store/slicers/wsSlicer';


export default function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday, isConnected } = useSelector(store => store.ws);

  useEffect(() => {
    dispatch(wsInit({ wsUrl: 'wss://norma.nomoreparties.space/orders/all' }))
    return () => {
      dispatch(wsClose());
    }
  }, []);

  return (
    <>
      {isConnected && orders?.length > 0 && (<>
        <h1 className={`${styles.feedPageTitle} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        <section className={styles.mainContainer}>
          <ol className={styles.orderFeed}>
            {orders && orders.map((item: TWsOrderCard) => (
              <li key={item._id}>
                <OrderFeedCard  {...item} />
              </li>
            ))}
          </ol>
          <section className={styles.ordersInfo}>
            <section className={`${styles.ordersStatus} mb-25`}>
              <div>
                <div className='text text_type_main-medium mb-6'>
                  Готовы:
                </div>
                <ol className={styles.ordersStatusList}>
                  {orders && orders
                    .filter((item: TWsOrderCard) => item.status === 'done')
                    .map((item: TWsOrderCard) => (
                      <li key={item._id} className={`${styles.ordersDoneNumber} text text_type_digits-default`}>
                        {item.number}
                      </li>
                    ))}
                </ol>
              </div>
              <div className='ml-15'>
                <div className='text text_type_main-medium mb-6'>
                  В работе:
                </div>
                <ol className={styles.ordersStatusList}>
                  {orders && orders
                    .filter((item: TWsOrderCard) => item.status === 'pending' || item.status === 'created')
                    .map((item: TWsOrderCard) => (
                      <li key={item._id} className='text text_type_digits-default'>
                        {item.number}
                      </li>
                    ))}
                </ol>
              </div>
            </section>
            <p className='text text_type_main-medium'>
              Выполнено за всё время:
            </p>
            <p className='text text_type_digits-large mb-25'>
              {total}
            </p>
            <p className='text text_type_main-medium'>
              Выполнено за сегодня:
            </p>
            <p className='text text_type_digits-large'>
              {totalToday}
            </p>
          </section>
        </section>
      </>) || <h2 className='text text_type_main-medium mt-10'>Загрузка...</h2>}
    </>
  );
}
