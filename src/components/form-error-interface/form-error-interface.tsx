import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './form-error-interface.module.css'

import { TRootState } from '../../store/store';


export default function FormErrorInterface() {
  const err = useSelector((store: TRootState) => store.userAccData.error);
  const requestPending = useSelector((store: TRootState) => store.userAccData.request);
  // если произошла ошибка, то будет выведен текст. Тогда на время загрузки меняем его на '...'
  const [isErrorOccured, setIsErrorOccured] = useState(false);

  useEffect(() => {
    if (err) {
      setIsErrorOccured(true);
    }
  }, [err]);

  return err ?
    (<p className={`${styles.description} text text_type_main-small`}>
      {err}
    </p>) : (isErrorOccured && requestPending ? (
      <p className={`${styles.description} text text_type_main-small`}>
        ...
      </p>
    ) : null);
}
