import React from "react";
import styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Cart() {
  const cardNum = useSelector((state) => state.cards);
  console.log(cardNum);

  let subTotal = 0;
  let orderTotal = 0;

  cardNum.forEach((element) => {
    subTotal = element.num * element.price;
  });
  cardNum.forEach((element) => {
    orderTotal += element.num * element.price;
  });

  console.log(subTotal);

  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.all}>
        <div className={styles.wrapper}>
          {cardNum.map((el, key) => {
            console.log(el);
            return (
              <>
                <div key={key} className={styles.card}>
                  <div className={styles.card__img}>
                    <img src={el.image} />
                  </div>
                  <div className={styles.card__img}>
                    <h2>{el.title}</h2>
                    <h2>{el.company}</h2>
                  </div>
                  <p>${el.price}</p>
                </div>
              </>
            );
          })}
        </div>
        {cardNum.length && (
          <>
            <div className={styles.cost}>
              <pre>Subtotal: ${subTotal}</pre>
              <pre>Shipping: $5</pre>
              <pre>Tax: $18</pre>
              <pre>OrderTotal: ${orderTotal}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
