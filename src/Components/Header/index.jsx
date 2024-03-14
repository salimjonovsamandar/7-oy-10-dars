import React from "react";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(props) {
  const { t, i18n } = useTranslation();

  const cardNum = useSelector((state) => state.cards);

  let sumNum = 0;
  cardNum.forEach((element) => {
    sumNum += element.num;
  });

  return (
    <div className="container">
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src="/logo.svg" />
          </div>
          <div className={styles.nav__bar}>
            <ul>
              <li>
                <NavLink to="/">
                  <button>{t("home")}</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about">
                  <button>{t("about")}</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/product">
                  <button>{t("productpage")}</button>
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart">
                  <button>{t("cart")}</button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
