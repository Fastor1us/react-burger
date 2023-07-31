import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export default class AppHeader extends React.Component {
  render() {
    const { header, nav, ol, li, a} = appHeaderStyles;
    return(
      <React.Fragment>
        <header className={header}>
          <nav className={nav}>
            <ol className={ol}>
              <li className={li}>
                <a href='##' className={a}>
                  <BurgerIcon/><span className="text text_type_main-default">Конструктор</span>
                </a>
              </li>
              <li className={li}>
                <a href='##' className={a}>
                  <ListIcon/><span className="text text_type_main-default">Лента заказов</span>
                </a>
              </li>
              <li style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                <a href='##'>
                  <Logo />
                </a>
              </li>
              <li className={li} style={{marginLeft:'auto'}}>
                <a href='##' className={a}>
                  <ProfileIcon/><span className="text text_type_main-default">Личный кабинет</span>
                </a>
              </li>
            </ol>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}
