import React from 'react';
import { dataPropTypes } from '../../utils/prop-types';
import modalIngredientStyles from './modal-ingredient-details.module.css';

export default function ModalIngredientDetails(props) {
  return (
    <React.Fragment>
      <img
        src={props.image}
        alt={props.name}
        className={modalIngredientStyles.ingredientImage}
      />
      <h3 className='text text_type_main-medium mt-4'>{props.name}</h3>
      <ol className={modalIngredientStyles.modalList}>
        <li className={modalIngredientStyles.ingredientListProperties}>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_main-small`}
          >
            Калории, ккал
          </p>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_digits-default`}
          >
            {props.calories}
          </p>
        </li>
        <li className={modalIngredientStyles.ingredientListProperties}>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_main-small`}
          >
            Белки, г
          </p>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_digits-default`}
          >
            {props.proteins}
          </p>
        </li>
        <li className={modalIngredientStyles.ingredientListProperties}>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_main-small`}
          >
            Жиры, г
          </p>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_digits-default`}
          >
            {props.fat}
          </p>
        </li>
        <li className={modalIngredientStyles.ingredientListProperties}>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_main-small`}
          >
            Углеводы, г
          </p>
          <p
            className={`${modalIngredientStyles.ingredientProperties} text text_type_digits-default`}
          >
            {props.carbohydrates}
          </p>
        </li>
      </ol>
    </React.Fragment>
  );
}

ModalIngredientDetails.propTypes = dataPropTypes.isRequired;
