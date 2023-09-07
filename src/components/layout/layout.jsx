import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './layout.module.css'

import AppHeader from '../app-header/app-header';


export default function Layout () {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
