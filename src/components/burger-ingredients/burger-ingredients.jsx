import React from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from './ingredient-section/ingredient-section';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export default function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState('Булки');

  const { ingredientsMainBlock, ingredientsTab, ingredientsMenu } =
    burgerIngredientsStyles;

  const onTabClick = (activeTab) => {
    setCurrent(activeTab);
    document
      .querySelector(`#${activeTab}`)
      .scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={ingredientsMainBlock}>
      <div className={ingredientsTab}>
        <Tab value='Булки' active={current === 'Булки'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value='Соусы' active={current === 'Соусы'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={current === 'Начинки'} onClick={onTabClick}>
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
