import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../utils/hooks/hooks';
import { useEffect } from 'react';

import { logoutFromUserAccThunk } from '../../store/thunks/userThunk';
import { wsInit, wsClose } from '../../store/slicers/wsSlicer';

import styles from './profile-layout.module.css';


export default function ProfileLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken')?.slice(7);
    dispatch(wsInit({ wsUrl: `wss://norma.nomoreparties.space/orders?token=${token}` }));
    return () => {
      dispatch(wsClose());
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
