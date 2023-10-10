import { useSelector } from '../../utils/hooks/hooks';

import {
  Button,
  EmailInput,
  PasswordInput,
  Input
} from '@ya.praktikum/react-developer-burger-ui-components';


type WrappedComponentProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  [key: string]: any;
};
// HOC
const WrapperFormElement = (Component: React.ComponentType<WrappedComponentProps>) => {
  return function WrappedComponent(props: WrappedComponentProps) {
    const requestPending = useSelector(store => store.userAccData.request);
    return <Component {...props} disabled={requestPending} />
  }
}

export const SubmitButton = WrapperFormElement(
  ({ children, ...props }) => {
    return (
      <Button htmlType='submit' type='primary' {...props}>
        {children}
      </Button>
    )
  }
);

export const ActionButton = WrapperFormElement(
  ({ children, ...props }) => {
    return (
      <Button htmlType='button' type='primary' {...props}>
        {children}
      </Button>
    )
  }
);

export const FormInput = WrapperFormElement(
  ({ ...props }) => {
    switch (props.type) {
      case 'email':
        return (
          <EmailInput
            name={'email'}
            placeholder='E-mail'
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
        )
      case 'password':

        return (
          <PasswordInput
            name={'password'}
            icon={props.icon || 'ShowIcon'}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
        )
      case 'text':
        return (
          <Input
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
        )
      default:
        return (<></>)
    }
  }
);
