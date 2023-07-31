import React from 'react';

import ingredientItemStyles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default class IngredientItem extends React.Component {
  render() {
    // console.log(this.props);
    return (
      <figure className={ingredientItemStyles.figure}>
        <img src={this.props.image} alt={this.props.name} />
        <p className={ingredientItemStyles.p}>
          <span className='text text_type_digits-default mr-2'>{`${this.props.price}`}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${ingredientItemStyles.p} text text_type_main-small`}>
          {this.props.name}
        </p>
      </figure>
    )
  }
}
