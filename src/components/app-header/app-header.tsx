import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './app-header.module.css';

import { NavLink } from 'react-router-dom';


export default function AppHeader() {
  const { header, navPanel, navList, menuItem, menuLink, menuLogo, NavLinkActive } = styles;
  return (
    <>
      <header className={header}>
        <nav className={navPanel}>
          <ol className={navList}>
            <li className={menuItem}>
              <NavLink to='/' className={
                ({ isActive }) => isActive ? `${menuLink} ${NavLinkActive}` : menuLink
              }>
                <BurgerIcon type='primary' />
                <span className='text text_type_main-default'>Конструктор</span>
              </NavLink>
            </li>
            <li className={menuItem}>
              <NavLink to='/feed' className={
                ({ isActive }) => isActive ? `${menuLink} ${NavLinkActive}` : menuLink
              }>
                <ListIcon type='primary' />
                <span className='text text_type_main-default'>
                  Лента заказов
                </span>
              </NavLink>
            </li>
            <li className={menuLogo}>
              <NavLink to='/'>
                <Logo />
              </NavLink>
            </li>
            <li className={menuItem}>
              <NavLink to='/profile' className={
                ({ isActive }) => isActive ? `${menuLink} ${NavLinkActive}` : menuLink
              }>
                <ProfileIcon type='primary' />
                <span className='text text_type_main-default'>
                  Личный кабинет
                </span>
              </NavLink>
            </li>
          </ol>
        </nav>
      </header>
    </>
  );
}
