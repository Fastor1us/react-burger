import React, { useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from './ingredient-section/ingredient-section';
import styles from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';


export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = React.useState('Булки');

  const isLoading = useSelector(state => state.availableIngredients.isLoading);
  const isError = useSelector(state => state.availableIngredients.isError);
  const isSuccess = useSelector(state => state.availableIngredients.isSuccess);
  
  const tabsStatus = useSelector(state => state.activeTab);
  useEffect(() => {
    tabsStatus['Булки'] !== 0 && tabsStatus['Булки'] + 2 > tabsStatus['Соусы'] ? 
    setCurrentTab('Булки') : tabsStatus['Соусы'] > tabsStatus['Начинки'] ? 
    setCurrentTab('Соусы') : setCurrentTab('Начинки');
  }, [tabsStatus]);

  const { ingredientsMainBlock, ingredientsTab, ingredientsMenu } =
    styles;

  const onTabClick = (activeTab) => {
    setCurrentTab(activeTab);
    document
      .querySelector(`#${activeTab}`)
      .scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={ingredientsMainBlock}>
      <div className={ingredientsTab}>
        <Tab value='Булки' active={currentTab === 'Булки'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value='Соусы' active={currentTab === 'Соусы'} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value='Начинки' active={currentTab === 'Начинки'} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <section className={ingredientsMenu}>
        {isLoading && <p>Идёт загрузка...</p>}
        {isError && <p>Произошла ошибка</p>}
        {isSuccess && (
          <>
            <IngredientSection type='bun'>
              Булки
            </IngredientSection>
            <IngredientSection type='sauce'>
              Соусы
            </IngredientSection>
            <IngredientSection type='main'>
              Начинки
            </IngredientSection>
          </>
        )}
      </section>
    </section>
  );
}
