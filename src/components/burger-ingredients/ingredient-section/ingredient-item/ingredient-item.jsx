import React from 'react';
import ingredientItemStyles from './ingredient-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../../modal/modal';
import { dataPropTypes } from '../../../utils/prop-types';
import ModalIngredientDetails from '../../../modal/modal-ingredient-details/modal-ingredient-details';

export default function IngredientItem(props) {
  const [showModal, setShowModal] = React.useState(false);
  const onItemClick = () => setShowModal(true);
  const { ingredientCard, ingredientDescription } = ingredientItemStyles;
  const { image, name, price } = props;

  return (
    <>
      <figure
        className={ingredientCard}
        name='ingredientItem'
        onClick={onItemClick}
      >
        <img src={image} alt={name} />
        <p className={ingredientDescription}>
          <span className='text text_type_digits-default mr-2'>{price}</span>
          <CurrencyIcon type='primary' />
        </p>
        <p className={`${ingredientDescription} text text_type_main-small`}>
          {name}
        </p>
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
