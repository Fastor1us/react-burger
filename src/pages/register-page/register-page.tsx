import React from 'react';
import { useDispatch } from '../../utils/hooks/hooks';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../utils/hooks/use-form';

import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './register-page.module.css';

import { registerNewUserThunk } from '../../store/thunks/userThunk';


export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ name: 'OlegK', email: 'fastorius@bk.ru', password: 'qwerty' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerNewUserThunk({ email: values.email, password: values.password, name: values.name },
      (to: string) => navigate(to)));
  }

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Регистрация
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type='text'
          name={'name'}
          onChange={handleChange}
          value={values.name}
          placeholder="Имя"
          extraClass="mb-6"
        />
        <FormInput
          type='email'
          name='email'
          onChange={handleChange}
          value={values.email}
          extraClass="mb-6"
        />
        <FormInput
          type='password'
          name='password'
          onChange={handleChange}
          value={values.password}
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
