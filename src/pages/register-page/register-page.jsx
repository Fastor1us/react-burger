import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './register-page.module.css';

import { registerNewUserThunk } from '../../store/thunks/userThunk';


export default function RegisterPage () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('OlegK');
  const [email, setEmail] = useState('fastorius@bk.ru');
  const [password, setPassword] = useState('qwerty');

  const onChange = (e, setter) => {
    setter(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerNewUserThunk({ email, password, name }, (to) => navigate(to)));
  }

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Регистрация
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type = 'text'
          onChange={(e) => onChange(e, setName)}
          value={name}
          name={'login'}
          placeholder="Имя"
          extraClass="mb-6"
        />
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
          Зарегистрироваться
        </SubmitButton>
      </form>
      <p className='text text_type_main-small mb-4'>
        {'Уже зарегистрированны? '}
        <Link to='/login' className={styles.link}>
          Войти
        </Link>
      </p>
    </section>
  );
}
