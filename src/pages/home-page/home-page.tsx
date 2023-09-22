import appStyles from './home-page.module.css';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';


export default function HomePage() {
  return (
    <>
      <h1 className={`${appStyles.mainTitle} text text_type_main-large mt-10 mb-5`}>
        Соберите бургер
      </h1>
      <DndProvider backend={HTML5Backend}>
        <section className={appStyles.mainContainer}>
          <BurgerIngredients />
          <BurgerConstructor />
        </section>
      </DndProvider>
    </>
  );
}
