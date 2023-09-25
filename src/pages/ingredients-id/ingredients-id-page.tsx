import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredients-id-page.module.css'
import ModalIngredientDetails from '../../components/modal/modal-ingredient-details/modal-ingredient-details';
import Page404 from '../page-404/page-404';
import { TRootState } from '../../store/store';
import { TIngredientItem } from '../../../interfaces/ingredient-item-type';


export default function IngredientsIdPage() {
  const { id } = useParams();
  const data = useSelector((store: TRootState) => store.availableIngredients.data);
  const [ingredientData, setIngredientData] = useState<TIngredientItem | null>();

  useEffect(() => {
    setIngredientData(data.find((item) => {
      return item._id === id;
    }));
  }, [data]);

  return (
    <>
      {ingredientData && Object.keys(ingredientData).length > 1 && (
        <section className={styles.card}>
          <ModalIngredientDetails {...ingredientData} />
        </section>
      )}
      {data?.length > 0 && !ingredientData && (
        <Page404 />
      )}
    </>
  );
}
