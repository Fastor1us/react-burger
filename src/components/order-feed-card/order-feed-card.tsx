import styles from './order-feed-card.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks/hooks';
import { Price } from '../price';
import { Link, useLocation } from 'react-router-dom';

type TProps = {
  status: string;
  name: string;
  createdAt: string;
  number: number;
  ingredients: string[];
}


export default function OrderFeedCard({ status, name, createdAt, number, ingredients }: TProps) {
  const location = useLocation();
  const showStatus = true;
  const availableIngredients = useSelector(store => store.availableIngredients.data);

  return (
    <Link to={`${location.pathname}/${number}`} state={{ background: location }} className={styles.link}>
      <section className={`${styles.orderCard} mb-4`}>
        <section className={`${styles.cardHeader}`}>
          <p className='text text_type_digits-default'>
            {number}
          </p>
          <p className={`${styles.orderCreationDate} text text_type_main-default`}>
            <FormattedDate date={new Date(createdAt)} />
          </p>
        </section>
        <h3 className='text text_type_main-medium mt-6'>
          {name}
        </h3>
        {showStatus && (
          <div className='text text_type_main-default mt-2'>
            {status}
          </div>
        )}
        <div className={`${styles.ingredientsInfo} mt-6`}>
          <div className={styles.ingredientsImages}>
            {ingredients?.slice(0, 6).map((ingredientId, index) => (
              <div key={index} className={styles.ingredientsImageContainer} style={{ zIndex: 100 - index }}>
                <img className={styles.ingredientsImage}
                  style={{ transform: `translate(${index * -15}px)`, opacity: index === 5 ? .2 : 1 }}
                  src={availableIngredients.find(available => available._id === ingredientId)?.image}
                  alt={availableIngredients.find(available => available._id === ingredientId)?.name}
                />
                {index === 5 && (
                  <div className={`${styles.number} text text_type_digits-default`}>
                    +{ingredients.length - 5}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Price>
            {ingredients?.reduce((acc, ingredientId) => {
              return acc + (availableIngredients.find(available => available._id === ingredientId)?.price ?? 0);
            }, 0)}
          </Price>
        </div>
      </section>
    </Link>
  );
}
