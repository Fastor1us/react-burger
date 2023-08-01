import React from 'react';
import PropTypes from 'prop-types';
import ingredientItemStyles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientItem(props) {
  const { ingredientCard, ingredientDescription } = ingredientItemStyles;

  return (
    <figure className={ingredientCard}>
      <img src={props.image} alt={props.name} />
      <p className={ingredientDescription}>
        <span className='text text_type_digits-default mr-2'>
          {props.price}
        </span>
        <CurrencyIcon type='primary' />
      </p>
      <p className={`${ingredientDescription} text text_type_main-small`}>
        {props.name}
      </p>
    </figure>
  );
}

IngredientItem.propTypes = {
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
