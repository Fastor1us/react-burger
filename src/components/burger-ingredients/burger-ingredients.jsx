import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from './ingredient-section/ingredient-section';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки');

  const { ingredientsMainBlock, ingredientsTab, ingredientsMenu } =
    burgerIngredientsStyles;

  useEffect(() => {
    document
      .querySelector(`#${current}`)
      .scrollIntoView({ behavior: 'smooth' });
  }, [current]);

  return (
    <section className={ingredientsMainBlock}>
      <div className={ingredientsTab}>
        <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value='Начинки'
          active={current === 'Начинки'}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <section className={ingredientsMenu}>
        <IngredientSection data={props.data} type='bun'>
          Булки
        </IngredientSection>
        <IngredientSection data={props.data} type='sauce'>
          Соусы
        </IngredientSection>
        <IngredientSection data={props.data} type='main'>
          Начинки
        </IngredientSection>
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
