import React from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/prop-types';
import ingredientsSectionStyles from './ingredient-section.module.css';
import IngredientItem from './ingredient-item/ingredient-item';

export default function IngredientSection(props) {
  const arrCards = props.data
  .filter((card) => {
    return card.type === props.type;
  })
  .map((card) => { return card });
  return (
    <>
      <section>
        <h2
          className='text text_type_main-medium pt-10 mb-6'
          id={props.children}
        >
          {props.children}
        </h2>
        <ol className={ingredientsSectionStyles.sectionList}>
            {arrCards.map( (card) => {
              return (
                <li className='mt-8' key={card._id}>
                  <IngredientItem
                    price={card.price}
                    name={card.name}
                    image={card.image}
                  />
                </li>
              )
            })}
        </ol>
      </section>
    </>
  );
}

IngredientSection.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
