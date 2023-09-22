// import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import '@ya.praktikum/react-developer-burger-ui-components';

import Layout from './components/layout/layout';
import HomePage from './pages/home-page/home-page';
import IngredientsIdPage from './pages/ingredients-id/ingredients-id-page';
import ProfilePage from './pages/profile-page/profile-page';
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


export default function App() {
  const dispatch: (dispatch: any) => void = useDispatch();

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
        <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} />
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
      </Routes>
    )}
  </>);
}
