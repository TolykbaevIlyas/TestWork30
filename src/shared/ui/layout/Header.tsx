'use client'
import Link from 'next/link';
import React from 'react';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';

const Header = () => {
  const path = usePathname();

  return (
    <div className={styles.header}>
      <Link
        href="/"
        className={`${styles.link} ${path === '/' ? styles.active : ''}`}
      >
        Главная
      </Link>
      <Link
        href="/favorites"
        className={`${styles.link} ${path === '/favorites' ? styles.active : ''}`}
      >
        Избранные
      </Link>
      <Link
        href="/forecasr"
        className={`${styles.link} ${path === '/forecasr' ? styles.active : ''}`}
      >
        Погода на 5 дней
      </Link>
    </div>
  );
};

export default Header;
