import React from "react";
import styles from "./index.module.css";
import { Link, json } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";

export default function MoreCard(props) {

  const [num, setNum] = useState(1)

  const [info, setInfo] = useState([]);
  const location = useLocation();
  const id = window.location.search.slice(1);


  const card = useSelector(state => state)


  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setInfo(data.data.attributes);
        props.setShow(false);
      } catch (error) {
        console.log(error);
      }
    };

    props.setShow(true);
    fetchData();
  }, []);

  useEffect(() => {

  }, [info]);


  function add(){
    if(!info.num){
      info.num = Number(num)
    }
    dispatch({type: "ADD", payload: info})

    let copy = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

    console.log(copy)

    if(copy.length){
      copy.map((el)=>{
        if(el.id == info.id){
            el.num += Number(num)
          }
        return el
      })
    }else{
      copy.push(info)
    }
    // copy.push(info)
    localStorage.setItem("cart", JSON.stringify(copy))
  }


  return (
    <>
      {!props.show && (
        <div className="container">
          <div className={styles.card__wrapper}>
            <div className={styles.card__link}>
              <Link style={{ color: "#394E6A", textDecoration: "none" }} to="/">
                Home
              </Link>
              <Link
                style={{ color: "#394E6A", textDecoration: "none" }}
                to="/product"
              >
                Products
              </Link>
            </div>
            <div className={styles.main__card}>
              <div className={styles.img}>
                <img src={info.image} />
              </div>
              <div className={styles.text}>
                <h2>{info.title}</h2>
                <h3>{info.company}</h3>
                <h4>${info.price}</h4>
                <p>{info.description}</p>
                <div className={styles.inputs}>
                  <select value={num} onChange={(e)=> {setNum(e.target.value)}}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>
                <button onClick={add} className={styles.add}>ADD TO BAG</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
