import React from "react";
import styles from "./index.module.css";
import Cardall from "./Cards";
import { useTranslation } from 'react-i18next';

export default function All({ data }) {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.cards__header}>
          <p>{data.length} {t("product")}</p>
          <div className={styles.actions}>
            <div className={styles.top}>
              <img src="/top.svg" alt="Top Icon" />
            </div>
            <div className={styles.row}>
              <img src="/row.svg" alt="Row Icon" />
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          {data.map((el, index) => (
            <Cardall key={index} data={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
