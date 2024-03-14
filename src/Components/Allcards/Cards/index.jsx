import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function Cardall({ data }) {
  const { id, attributes } = data;
  return (
    <div className={styles.container}>
      <Link style={{textDecoration: "none"}} className={styles.link} to={`/more?${id}`}>
        <div className={styles.card}>
          <img src={attributes.image} alt="" />
          <h3>{attributes.title}</h3>
          <p>${attributes.price}</p>
        </div>
      </Link>
    </div>
  );
}
