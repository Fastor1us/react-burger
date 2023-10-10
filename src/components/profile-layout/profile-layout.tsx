import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks/hooks';
import { useEffect } from 'react';

import { logoutFromUserAccThunk } from '../../store/thunks/userThunk';

import styles from './profile-layout.module.css';


export default function ProfileLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: 'wsInit', payload:
      {
        wsUrl: 'wss://norma.nomoreparties.space/orders',
        token: localStorage.getItem('accessToken'),
      }
    });
    return () => {
      dispatch({ type: 'wsClose' });
    }
  }, []);

  const onLogoutBtnClick = () => {
    dispatch(logoutFromUserAccThunk((to) => navigate(to)));
  }

  const { container, navigation, NavLinkActive, menuLink } = styles;

  return (
    <section className={container}>
      <nav className={navigation}>
        <ol>
          <li className="text text_type_main-medium">
            <NavLink to='/profile' end className={
              ({ isActive }) => isActive ? `${menuLink} ${NavLinkActive}` : menuLink
            }>
              Профиль
            </NavLink>
          </li>
          <li className="text text_type_main-medium">
            <NavLink to='/profile/orders' className={
              ({ isActive }) => isActive ? `${menuLink} ${NavLinkActive}` : menuLink
            }>
              История заказов
            </NavLink>
          </li>
          <li className="text text_type_main-medium">
            <a onClick={onLogoutBtnClick} className={menuLink} style={{ cursor: 'pointer' }}>
              Выход
            </a>
          </li>
        </ol>
      </nav>
      <Outlet />
    </section>
  );
}
