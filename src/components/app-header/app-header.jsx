import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

export default function AppHeader() {
  const { header, navPanel, navList, menuItem, menuLink, menuLogo } =
    appHeaderStyles;
  return (
    <React.Fragment>
      <header className={header}>
        <nav className={navPanel}>
          <ol className={navList}>
            <li className={menuItem}>
              <a href='##' className={menuLink}>
                <BurgerIcon />
                <span className='text text_type_main-default'>Конструктор</span>
              </a>
            </li>
            <li className={menuItem}>
              <a href='##' className={menuLink}>
                <ListIcon />
                <span className='text text_type_main-default'>
                  Лента заказов
                </span>
              </a>
            </li>
            <li className={menuLogo}>
              <a href='##'>
                <Logo />
              </a>
            </li>
            <li className={menuItem}>
              <a href='##' className={menuLink}>
                <ProfileIcon />
                <span className='text text_type_main-default'>
                  Личный кабинет
                </span>
              </a>
            </li>
          </ol>
        </nav>
      </header>
    </React.Fragment>
  );
}
