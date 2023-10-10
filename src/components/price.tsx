import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export function Price({ children, extraClasses }: { children: number; extraClasses?: string }) {
  return (
    <>
      <div style={{ display: 'flex' }} className={extraClasses ?? ''}>
        <span className='text text_type_digits-default mr-2'>
          {children}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </>
  );
}
