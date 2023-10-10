import { useEffect } from 'react';

import styles from './feed-page.module.css';

import OrderFeedCard from '../../components/order-feed-card/order-feed-card';

import { useDispatch, useSelector } from '../../utils/hooks/hooks';

import { TWsOrderCard } from '../../../interfaces/ws-order-card';


export default function FeedPage() {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(store => store.ws);

  useEffect(() => {
    dispatch({ type: 'wsInit' });
    return () => {
      dispatch({ type: 'wsClose' });
    }
  }, []);

  return (
    <>
      {orders?.length > 0 && (<>
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
      </>) || <h2>Загрузка...</h2>}
    </>
  );
}
