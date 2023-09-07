import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './forgot-password-page.module.css'

import { recoveryEmailSendThunk } from '../../store/thunks/userThunk';


export default function ForgotPasswordPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('fastorius@bk.ru');
  
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(recoveryEmailSendThunk(
      { email }, (to) => navigate(to, { state: {cameFromForgotPasswordPage: true}})));
  }

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type = 'email'
          onChange={e => setEmail(e.target.value)}
          value={email}
          isIcon={false}
          extraClass="mb-6"
        />
        <FormErrorInterface />
        <SubmitButton size="medium" extraClass='mb-20'>
          Восстановить
        </SubmitButton>
      </form>
      <p className='text text_type_main-small mb-4'>
        {'Вспомнили пароль? '}
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </p>
    </section>
  );
}
