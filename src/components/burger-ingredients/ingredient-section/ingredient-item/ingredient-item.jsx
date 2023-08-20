import React from 'react';
import ingredientItemStyles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../../modal/modal';
import { dataPropTypes } from '../../../utils/prop-types';
import ModalIngredientDetails from '../../../modal/modal-ingredient-details/modal-ingredient-details';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';


export default function IngredientItem(props) {
  const [showModal, setShowModal] = React.useState(false);

  const { bun: chosenBun, topping: chosenIngredients } = useSelector(state => state.chosenIngredients);
  const onItemClick = () => setShowModal(true);

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

  const { ingredientCard, ingredientDescription, ingredientAmount } = ingredientItemStyles;
  const opacity = isDragging ? 0.5 : 1;

  return (
    <>
      <figure ref={dragRef} style={{opacity}}
        className={ingredientCard}
        name={props.name}
        onClick={onItemClick}
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
      {showModal && (
        <Modal title='Детали ингредиента' setVisible={setShowModal}>
          <ModalIngredientDetails {...props} />
        </Modal>
      )}
    </>
  );
}

IngredientItem.propTypes = dataPropTypes.isRequired;
