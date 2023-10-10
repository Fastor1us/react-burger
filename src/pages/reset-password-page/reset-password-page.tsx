import React, { useEffect } from 'react';
import { useDispatch } from '../../utils/hooks/hooks';

import { useForm } from '../../utils/hooks/use-form';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './reset-password-page.module.css'

import { passwordResetThunk } from '../../store/thunks/userThunk';


export default function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm({ password: '', codeFromEmail: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(passwordResetThunk({ password: values.password, token: values.codeFromEmail },
      (to: string) => navigate(to)));
  }

  useEffect(() => {
    !location.state?.cameFromForgotPasswordPage && navigate('/forgot-password');
  }, []);

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Восстановление пароля
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type='password'
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          value={values.password}
          extraClass="mb-6"
        />
        <FormInput
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.codeFromEmail}
          extraClass="mb-6"
        />
        <FormErrorInterface />
        <SubmitButton size="medium" extraClass='mb-20'>
          Сохранить
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
