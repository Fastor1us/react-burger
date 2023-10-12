import { useSelector } from '../../utils/hooks/hooks';

import styles from './order-page.module.css';

import OrderFeedCard from '../../components/order-feed-card/order-feed-card';

import { TWsOrderCard } from '../../../interfaces/ws-order-card';


export default function OrderPage() {
  const { orders } = useSelector(store => store.ws);

  return (
    <>
      <ol className={styles.orderFeed}>
        {orders && orders.slice(0).reverse().map((item: TWsOrderCard) => (
          <li key={item._id}>
            <OrderFeedCard  {...item} />
          </li>
        ))}
      </ol>
    </>
  );
}
