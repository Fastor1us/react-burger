import { useEffect } from 'react';
import { useDispatch } from './utils/hooks/hooks';
import { Routes, Route, useLocation } from 'react-router-dom';
import '@ya.praktikum/react-developer-burger-ui-components';

import Layout from './components/layout/layout';
import HomePage from './pages/home-page/home-page';
import IngredientsIdPage from './pages/ingredients-id/ingredients-id-page';
import ProfileLayout from './components/profile-layout/profile-layout';
import FeedPage from './pages/feed-page/feed-page';
import FeedIdPage from './pages/feed-id/feed-id-page';
import ProfilePage from './pages/profile-page/profile-page';
import OrderPage from './pages/order-page/order-page';
import LoginPage from './pages/login-page/login-page';
import RegisterPage from './pages/register-page/register-page';
import ForgotPasswordPage from './pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from './pages/reset-password-page/reset-password-page';
import Page404 from './pages/page-404/page-404';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route';

import { setAvailableIngredients } from './store/slicers/availableIngredientsSlicer';
import { burgerAPI } from './utils/api/burger-api';
import { getUserInfoThunk } from './store/thunks/userThunk';

import Modal from './components/modal/modal';
import ModalIngredientDetails from './components/modal/modal-ingredient-details/modal-ingredient-details';
import OrderDetail from './components/order-detail/order-detail';


export default function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const background = location.state && location.state.background;

  const { data, isLoading, isError, isSuccess } = burgerAPI.useFetchAllDataQuery(null);
  useEffect(() => {
    dispatch(setAvailableIngredients({ data, isLoading, isError, isSuccess }));
  }, [isLoading]);

  useEffect(() => {
    localStorage.getItem('accessToken') !== null &&
      dispatch(getUserInfoThunk());
  }, []);

  return (<>
    <Routes location={background || location}>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='/ingredients/:id' element={<IngredientsIdPage />} />
        <Route path='/feed' element={<FeedPage />} />
        <Route path='/feed/:id' element={<FeedIdPage />} />
        <Route path='/profile' element={<OnlyAuth component={<ProfileLayout />} />}>
          <Route index element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path='/profile/orders' element={<OnlyAuth component={<OrderPage />} />} />
        </Route>
        <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>

    {background && (
      <Routes>
        <Route path='/ingredients/:id' element={
          <Modal title='Детали ингредиента'>
            <ModalIngredientDetails />
          </Modal>
        } />
        <Route path='/feed/:id' element={
          <Modal title='Информация о заказе'>
            <OrderDetail />
          </Modal>
        } />
        <Route path='/profile/orders/:id' element={
          <Modal title='Информация о заказе'>
            <OrderDetail />
          </Modal>
        } />
      </Routes>
    )}
  </>);
}
