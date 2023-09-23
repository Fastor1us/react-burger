import { useRef } from 'react';
import styles from './chosen-ingredient.module.css'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { removeIngredient } from '../../../store/slicers/chosenIngredientsSlicer';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { Identifier } from 'dnd-core';
import { TIngredientItem } from '../../../../interfaces/ingredient-item-type';


type TProps = {
  index: number;
  data: TIngredientItem;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void
}

export default function ChosenIngredient(props: TProps) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, dropRef] = useDrop<
    {
      ingredient: TIngredientItem;
      index: number;
    },
    unknown,
    { handlerId: Identifier | null }
  >({
    accept: 'ingredient',
    hover(item: any, monitor: any) {
      if (!ref.current) { return }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) { return }
      const hoverBoundingRect = (ref.current as HTMLElement).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }
      props.moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const index = props.index;
  const [{ isDragging }, dragRef] = useDrag({
    type: 'ingredient',
    item: () => {
      return { index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const onIngredientDelBtn = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const opacity = isDragging ? 0.5 : 1;
  dragRef(dropRef(ref));

  return (
    <li style={{ opacity }} ref={ref}
      className={`${styles.toppingItem} mb-4 mr-2`}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image}
        handleClose={() => { onIngredientDelBtn(props.index) }}
      />
    </li>
  );
}

