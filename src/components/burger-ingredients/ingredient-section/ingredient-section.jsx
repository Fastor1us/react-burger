import React, { useCallback} from 'react';
import PropTypes from 'prop-types';
import ingredientsSectionStyles from './ingredient-section.module.css';
import IngredientItem from './ingredient-item/ingredient-item';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setTabState } from '../../../store/slicers/activeTabSlicer';


export default function IngredientSection(props) {
  const dispatch = useDispatch();
  const data = useSelector(store => store.data.data);

  const intersectionCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      const visiblePct = Math.floor(entry.intersectionRatio * 100);
      dispatch(setTabState({tab: props.children, visiblePct: visiblePct}));
    });
  }, [props.children]);

  useEffect(()=> {
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
      observer.observe(document.querySelector(`#${props.children}`));
  }, []);

  const arrCards = data
    .filter((card) => {
      return card.type === props.type;
    })
    .map((card) => {
      return card;
    });
  return (
    <>
      <section id={props.children}>
        <h2 className='text text_type_main-medium pt-10 mb-6'>
          {props.children}
        </h2>
        <ol className={ingredientsSectionStyles.sectionList}>
          {arrCards.map((card) => {
            return (
              <li className='mt-8' key={card._id}>
                <IngredientItem {...card} />
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

IngredientSection.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
