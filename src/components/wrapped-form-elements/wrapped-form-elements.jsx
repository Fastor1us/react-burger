import React from 'react';
import { useSelector } from 'react-redux';
// import { forwardRef } from 'react';
import PropTypes from 'prop-types';


import { Button,
         EmailInput,
         PasswordInput,
         Input
       } from '@ya.praktikum/react-developer-burger-ui-components';


export const SubmitButton = WrapperFormElement(
  ({children, ...props}) => {
    return (
      <Button htmlType='submit' type='primary' {...props}>
        {children}
      </Button>
    )
  }
);

export const ActionButton = WrapperFormElement(
  ({children, ...props}) => {
    return (
      <Button htmlType='button' type='primary' {...props}>
        {children}
      </Button>
    )
  }
);

export const FormInput = WrapperFormElement(
  ({...props}) => {
    switch (props.type) {
      case 'email':
        return (
          <EmailInput
            name={'email'}
            placeholder='E-mail'
            {...props}
          />
        )
      case 'password':
        
        return (
          <PasswordInput
            name={'password'}
            icon={props.icon || 'ShowIcon'}
            {...props}
          />
        )
      case 'text':
        return (
          <Input
            {...props}
          />
        )
      default:
        return (<></>)
    }
  }
);


// HOC
function WrapperFormElement (Component) {
  return function WrappedComponent(props) {
    const requestPending = useSelector(store => store.userAccData.request);
    return <Component {...props} disabled={requestPending} />
  }
}

WrapperFormElement.propTypes = {
  Component: PropTypes.element.isRequired,
}
