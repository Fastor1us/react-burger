import { Link, useNavigate } from 'react-router-dom';

import styles from './page-404.module.css';

export default function Page404() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <h2 className={styles.title}>404</h2>
      <p className={styles.description}>
        О-упс! По данному адресу страница не найдена...
      </p>
      <button onClick={handleGoBack} className={styles.backBtn}>
        Назад
      </button>
    </>
  );
}
