import React from "react";
import styles from "./index.module.css";
import { useContext } from "react";
import { CardInfo } from "../../../App";
import { Link } from "react-router-dom";

export default function Card() {
  const info = useContext(CardInfo);
  return (
    <>
      {info.map((element, index) => {
        return (
          
          <Link key={index} style={{textDecoration: "none"}} to={`/more?${element.id}`}>
              <div className={styles.card}>
                <img src={element.attributes.image} alt="" />
                <h3>{element.attributes.title}</h3>
                <p>${element.attributes.price}</p>
              </div>
          </Link>
        );
      })}
    </>
  );
}
