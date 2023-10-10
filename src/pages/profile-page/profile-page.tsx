import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../utils/hooks/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from '../../utils/hooks/use-form';

import { FormInput, ActionButton, SubmitButton } from '../../components/wrapped-form-elements/wrapped-form-elements';
import FormErrorInterface from '../../components/form-error-interface/form-error-interface';

import styles from './profile-page.module.css';

import { patchUserDataThunk } from '../../store/thunks/userThunk';


export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInitDataChanged, setIsInitDataChanged] = useState(false);
  const { values, setValues, handleChange } = useForm({ name: '', email: '', password: '' });
  const userReduxData = useSelector(store => store.userAccData.user);

  useEffect(() => {
    (userReduxData.name || userReduxData.email) && setValues({
      ...values,
      name: userReduxData.name,
      email: userReduxData.email
    });
  }, [userReduxData]);

  useEffect(() => {
    setIsInitDataChanged(
      (values.password !== null && values.password.length !== 0) ||
      values.name !== userReduxData.name ||
      values.email !== userReduxData.email
    )
  }, [values, userReduxData]);

  const onCancelClick = () => {
    setValues({
      password: '',
      name: userReduxData.name,
      email: userReduxData.email
    });
  }

  type TNewUserData = {
    [key: string]: string;
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserData: TNewUserData = {}
    for (let key in userReduxData) {
      if (values[key].length > 0 && userReduxData[key] !== values[key]) {
        newUserData[key] = values[key];
      }
    }
    Object.keys(newUserData).length > 0 &&
      dispatch(patchUserDataThunk(
        localStorage.getItem('accessToken'),
        newUserData,
        (to: string) => navigate(to)
      ))
  }

  const { form, button, buttons } = styles;

  return (
    <form onSubmit={onSubmit} className={form}>
      <FormInput
        type='text'
        name='name'
        onChange={handleChange}
        icon={'EditIcon'}
        value={values.name}
        placeholder={'Имя'}
        extraClass="mb-2"
      />
      <FormInput
        type='email'
        name='email'
        onChange={handleChange}
        value={values.email}
        icon={'EditIcon'}
        extraClass="mb-2"
      />
      <FormInput
        type='password'
        name='password'
        onChange={handleChange}
        value={values.password}
        icon={'EditIcon'}
        extraClass="mb-4"
      />
      <FormErrorInterface />
      {isInitDataChanged && (
        <div className={buttons}>
          <ActionButton size="medium" extraClass={button} onClick={onCancelClick}>
            Отменить
          </ActionButton>
          <SubmitButton size="medium" extraClass={button}>
            Сохранить
          </SubmitButton>
        </div>
      )}
    </form>
  );
}
