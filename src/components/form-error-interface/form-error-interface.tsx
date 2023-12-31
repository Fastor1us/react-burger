import { useEffect, useState } from 'react';
import { useSelector } from '../../utils/hooks/hooks';

import styles from './form-error-interface.module.css'


export default function FormErrorInterface() {
  const err = useSelector(store => store.userAccData.error);
  const requestPending = useSelector(store => store.userAccData.request);
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
