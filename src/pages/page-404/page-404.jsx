import React from 'react';

import { Link } from 'react-router-dom';

import styles from './page-404.module.css'


export default function Page404 () {
  return (
    <>
      <h2 className={styles.title}>404</h2>
      <p className={styles.description}>
        О-упс! По данному адресу страница не найдена...
      </p>
      <Link to={-1} className={styles.backBtn}>
        Назад
      </Link>
    </>
  );
}
