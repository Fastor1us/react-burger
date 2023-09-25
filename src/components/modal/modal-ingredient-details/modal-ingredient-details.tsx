import { useEffect, useState } from 'react';
import styles from './modal-ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../store/store';
import { TIngredientItem } from '../../../../interfaces/ingredient-item-type';


export default function ModalIngredientDetails() {
  const { id } = useParams();
  const data = useSelector((store: TRootState) => store.availableIngredients.data);
  const [ingredientData, setIngredientData] = useState<TIngredientItem | null>();

  useEffect(() => {
    setIngredientData(data.find((item) => {
      return item._id === id;
    }));
  }, [data]);

  return (
    <>{ingredientData && (<>
      <img
        src={ingredientData.image}
        alt={ingredientData.name}
        className={styles.ingredientImage}
      />
      <h3 className='text text_type_main-medium mt-4'>{ingredientData.name}</h3>
      <ol className={styles.modalList}>
        <li className={styles.ingredientListProperties}>
          <p
            className={`${styles.ingredientProperties} text text_type_main-small`}
          >
            Калории, ккал
          </p>
          <p
            className={`${styles.ingredientProperties} text text_type_digits-default`}
          >
            {ingredientData.calories}
          </p>
        </li>
        <li className={styles.ingredientListProperties}>
          <p
            className={`${styles.ingredientProperties} text text_type_main-small`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.ingredientProperties} text text_type_digits-default`}
          >
            {ingredientData.proteins}
          </p>
        </li>
        <li className={styles.ingredientListProperties}>
          <p
            className={`${styles.ingredientProperties} text text_type_main-small`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.ingredientProperties} text text_type_digits-default`}
          >
            {ingredientData.fat}
          </p>
        </li>
        <li className={styles.ingredientListProperties}>
          <p
            className={`${styles.ingredientProperties} text text_type_main-small`}
          >
            Углеводы, г
          </p>
          <p
            className={`${styles.ingredientProperties} text text_type_digits-default`}
          >
            {ingredientData.carbohydrates}
          </p>
        </li>
      </ol>
    </>)}</>
  );
}
