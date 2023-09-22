import { useCallback } from 'react';
import styles from './ingredient-section.module.css';
import IngredientItem from './ingredient-item/ingredient-item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setTabState } from '../../../store/slicers/activeTabSlicer';
import { TRootState } from '../../../store/store';
import { TBurgerIngridientTabs } from '../../../../interfaces/burger-ingredient-tabs-type';


export default function IngredientSection(props: { children: keyof TBurgerIngridientTabs; type: string; }) {
  const dispatch = useDispatch();
  const data = useSelector((store: TRootState) => store.availableIngredients.data);

  const intersectionCallback = useCallback((entries: { intersectionRatio: number }[]) => {
    entries.forEach((entry) => {
      const visiblePct = Math.floor(entry.intersectionRatio * 100);
      dispatch(setTabState({ tab: props.children, visiblePct: visiblePct }));
    });
  }, [props.children]);

  useEffect(() => {
    const threshold = [];
    for (let i = 0; i <= 1.0; i += 0.1) {
      threshold.push(i);
    }
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: threshold,
    };
    const observer = new IntersectionObserver(
      intersectionCallback,
      observerOptions,
    );
    const observeElement = document.querySelector(`#${props.children}`);
    if (observeElement) {
      observer.observe(observeElement);
    } else {
      console.error(`Observe element can't be found`);
    }

    return () => observer.disconnect();
  }, []);

  const arrCards = data
    .filter((card) => {
      return card.type === props.type;
    })
    .map((card) => {
      return card;
    });
  return (
    <section id={props.children}>
      <h2 className='text text_type_main-medium pt-10 mb-6'>
        {props.children}
      </h2>
      <ol className={styles.sectionList}>
        {arrCards.map((card) => {
          return (
            <li className='mt-8' key={card._id}>
              <IngredientItem {...card} />
            </li>
          );
        })}
      </ol>
    </section>
  );
}
