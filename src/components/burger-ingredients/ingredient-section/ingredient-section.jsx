import React from 'react';
import PropTypes from 'prop-types';
import ingredientsSectionStyles from './ingredient-section.module.css';
import IngredientItem from './ingredient-item/ingredient-item';

export default function IngredientSection(props) {
  return (
    <>
      {console.log(props)}
      <section>
        <h2
          className='text text_type_main-medium pt-10 mb-6'
          id={props.children}
        >
          {props.children}
        </h2>
        <ol className={ingredientsSectionStyles.sectionList}>
          {props.data
            .filter((card) => {
              return card.type === props.type;
            })
            .map((card) => {
              return (
                <li className='mt-8' key={card._id}>
                  <IngredientItem
                    price={card.price}
                    name={card.name}
                    image={card.image}
                  />
                </li>
              );
            })}
        </ol>
      </section>
    </>
  );
}

const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

IngredientSection.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(dataPropTypes).isRequired,
};
