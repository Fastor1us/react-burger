import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from './ingredient-section/ingredient-section';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export default class BurgerIngredients extends React.Component {
  state = { current: 'Булки'}

  setCurrent = (value) => {
    this.setState({ current: value });
    document.querySelector(`#${value}`).scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    return (
      Array.isArray(this.props.data) ? (
      <section className={burgerIngredientsStyles.section}>
        <div style={{ display: 'flex' }}>
          <Tab value='Булки' active={this.state.current === 'Булки'} onClick={this.setCurrent}>
            Булки
          </Tab>
          <Tab value='Соусы' active={this.state.current === 'Соусы'} onClick={this.setCurrent}>
            Соусы
          </Tab>
          <Tab value='Начинки' active={this.state.current === 'Начинки'} onClick={this.setCurrent}>
            Начинки
          </Tab>
        </div>
        <section className={burgerIngredientsStyles.ingredientsMenu}>
          <IngredientSection data={this.props.data} type='bun'>Булки</IngredientSection>
          <IngredientSection data={this.props.data} type='sauce'>Соусы</IngredientSection>
          <IngredientSection data={this.props.data} type='main'>Начинки</IngredientSection>
        </section>
      </section>
      ) : null
    )
  }
}
