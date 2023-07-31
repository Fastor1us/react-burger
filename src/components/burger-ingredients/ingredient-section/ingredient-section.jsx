import React from 'react';
import ingredientsSectionStyles from './ingredient-section.module.css';
import IngredientItem from './ingredient-item/ingredient-item'; 

export default class IngredientSection extends React.Component {
  render() {
    return (
      <section>
        <h2 className='text text_type_main-medium pt-10 mb-6' id={this.props.children}>{this.props.children}</h2>
          <ol className={ingredientsSectionStyles.ol}>
            {this.props.data.filter( (card) => {
              return card.type === this.props.type
            }).map( (card) => {
              return <li className='mt-8' key={card._id}>
                <IngredientItem price={card.price} name={card.name} image={card.image}/>
              </li>
            })}
          </ol>
      </section>
    )
  }
}
