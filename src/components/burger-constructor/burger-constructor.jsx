import React from 'react';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './burger-constructor.module.css';
import { CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default class BurgerConstructor extends React.Component {
  bunData = this.props.data.find(i => i.type === 'bun');
  sauceData = this.props.data.filter(i => i.type === 'sauce');
  mainData = this.props.data.filter(i => i.type === 'main');
  totalPrice = this.props.data.map(i=>i.price).reduce((acc, curr) => acc + curr);

  render() {
    return (
      Array.isArray(this.props.data) ? (
      <section>
        <ol className={burgerConstructor.ol}>
          <li className='ml-8 mb-4'>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={this.bunData.name}
              price={this.bunData.price}
              thumbnail={this.bunData.image}
            />
          </li>
          <ol className={`${burgerConstructor.ol} ${burgerConstructor.scrollbar}`}>
            {[this.sauceData, this.mainData].map( (arr) => {
              return arr.map( (item) => {
                return (
                <li key={item._id} className='mb-4 mr-2' style={{display: 'flex', alignItems: 'center', gap: 8}}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </li> );
              });
            })}
          </ol>
          <li className='ml-8 mb-10'>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={this.bunData.name}
              price={this.bunData.price}
              thumbnail={this.bunData.image}
            />
          </li>
        </ol>
        <section style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p className={burgerConstructor.p}>
            <span className='text text_type_digits-default mr-2'>{this.totalPrice}</span>
            <CurrencyIcon type="primary" />
          </p>
          <Button htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </section>
      </section>
      ) : null
    )
  }
}
