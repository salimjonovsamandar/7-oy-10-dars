import React from 'react'
import styles from "./index.module.css"
import Card from './Card'
import { useTranslation } from 'react-i18next';

export default function Featured() {
  const { t, i18n } = useTranslation();
  return (
    <div className="container">
    <div className={styles.wrapper}>
        <div className={styles.heading}>
            <h2>{t("fatured")}</h2>
        </div>
        <div className={styles.cards}>
            <Card></Card>
        </div>
    </div>
    </div>
  )
}
