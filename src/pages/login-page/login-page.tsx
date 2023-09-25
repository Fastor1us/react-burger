import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '../../utils/hooks/use-form';

import { FormInput, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './login-page.module.css'

import { loginInToUserAccThunk } from '../../store/thunks/userThunk';


export default function LoginPage() {
  const dispatch: (dispatch: any) => void = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ email: 'fastorius@bk.ru', password: 'zxc123' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginInToUserAccThunk({ email: values.email, password: values.password },
      (to: string) => navigate(to)));
  }

  return (
    <section className={styles.container}>
      <h2 className="text text_type_main-medium mb-6">
        Вход
      </h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          type='email'
          onChange={handleChange}
          value={values.email}
          extraClass="mb-6"
        />
        <FormInput
          type='password'
          onChange={handleChange}
          value={values.password}
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
