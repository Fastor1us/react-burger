import React from 'react';
import styles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../../../utils/prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';


export default function IngredientItem(props) {
  const location = useLocation();

  const { bun: chosenBun, topping: chosenIngredients } = useSelector(state => state.chosenIngredients);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'newIngredient',
    item: props,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  let itemAmount = 0;
  if (props.type === 'bun' && props.name === chosenBun.name) {
    itemAmount = 2;
  } else {
    chosenIngredients.forEach( (item) => {
      if (props.name === item.name) {
        itemAmount += 1;
      }
    });
  }

  const { ingredientCard, ingredientDescription, ingredientAmount } = styles;
  const opacity = isDragging ? 0.5 : 1;

  return (
    <Link key={props._id} to={`/ingredients/${props._id}`} 
      state={{ background: location }} className={styles.link}
    >
      <figure ref={dragRef} style={{opacity}}
        className={ingredientCard}
        name={props.name}
      >
        <img src={props.image} alt={props.name} />
        <p className={ingredientDescription}>
          <span className='text text_type_digits-default mr-2'>{props.price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={`${ingredientDescription} text text_type_main-small`}>
          {props.name}
        </p>
        {itemAmount ? 
          (<div className={ingredientAmount}>
            <span className="text text_type_digits-default">{itemAmount}</span>
          </div>) 
          : null}
      </figure>
    </Link>
  );
}

IngredientItem.propTypes = dataPropTypes.isRequired;
