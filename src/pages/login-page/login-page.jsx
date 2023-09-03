import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './login-page.module.css'

import { loginInToUserAccThunk } from '../../store/thunks/userThunk';


export default function LoginPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('fastorius@bk.ru');
  const [password, setPassword] = useState('zxc123');

  const onChange = (e, setter) => {
    setter(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginInToUserAccThunk({ email, password }, (to) => navigate(to)));
  }

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Вход
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type = 'email'
          onChange={(e) => onChange(e, setEmail)}
          value={email}
          extraClass="mb-6"
        />
        <FormInput
          type = 'password'
          onChange={(e) => onChange(e, setPassword)}
          value={password}
          extraClass="mb-6"
        />
        <FormErrorInterface />
        <SubmitButton size="medium" extraClass='mb-20'>
          Войти
        </SubmitButton>
      </form> 
      <p className='text text_type_main-small mb-4'>
        {'Вы - новый пользователь? '}
        <Link to='/register' className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className='text text_type_main-small'>
        {'Забыли пароль? '}
        <Link to='/forgot-password' className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </section>
  );
}
