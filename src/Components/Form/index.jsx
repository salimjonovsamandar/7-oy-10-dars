import React, { useState, useRef, useEffect, useMemo } from "react";
import styles from "./index.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import All from "../Allcards";
import { useTranslation } from 'react-i18next';

export default function Form(props) {
  const [info, setInfo] = useState([]);
  const productRef = useRef();
  const categoryRef = useRef();
  const companyRef = useRef();
  const idRef = useRef();
  const chekRef = useRef();
  const [inputValue, setInputValue] = useState(1000); 
  const { t, i18n } = useTranslation();

  // Quyida useMemo hookidan foydalanib ishlaydigan funksiya doimiy ravishda fetch orqali Apiga call qilmaydi 

  const getDataApi = useMemo(() => {
    return () => {
      fetch("https://strapi-store-server.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {setInfo(data.data), props.setShow(false)})
      .catch((err) => console.log(err));
    };
  }, []);

  useEffect(() => {
    props.setShow(true);
    getDataApi();
  }, [getDataApi, props.setShow]);

  async function search(e) {
    e.preventDefault();
    try {
        const response = await fetch(`https://strapi-store-server.onrender.com/api/products?search=${productRef.current.value}&category=${categoryRef.current.value}&company=${companyRef.current.value}&order=${idRef.current.value}&price=${inputValue}000`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setInfo(data.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    // console.log(info);
  }, [info]);

  function reset(){
    productRef.current.value = "";
    categoryRef.current.value = "all";
    companyRef.current.value = "all";
    idRef.current.value = "z-a";
    setInputValue(1000);
  }

  return (
    <>
    {!props.show && <div className={styles.container}>
      <div className={styles.form}>
        <form>
          <div className={styles.row}>
            <label>
              <p>{t("search")}</p>
              <input ref={productRef} type="text" className={styles.select} />
            </label>
            <label>
              <p categoryRef>{t("category")}</p>
              <select ref={categoryRef} className={styles.select}>
                <option value="all">{t("all")}</option>
                <option value="Tables">{t("tables")}</option>
                <option value="Chairs">{t("chairs")}</option>
                <option value="Kids">{t("kids")}</option>
                <option value="Sofas">{t("sofas")}</option>
                <option value="Beds">{t("beds")}</option>
              </select>
            </label>
            <label>
              <p>{t("company")}</p>
              <select ref={companyRef} className={styles.select}>
                <option value="all">{t("all")}</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </label>
            <label>
              <p>{t("sort")}</p>
              <select ref={idRef} className={styles.select}>
                <option value="z-a">z-a</option>
                <option value="high">{t("high")}</option>
                <option value="low">{t("low")}</option>
              </select>
            </label>
          </div>
          <div className={styles.row2}>
            <div className={styles.range}>
              <div className={styles.top__text}>
                <p>{t("price")}</p>
                <p>${inputValue}0.00</p>
              </div>
              <Box sx={{ width: 244 }}>
                <Slider
                  onChange={(_, value) => setInputValue(value)}
                  defaultValue={1000}
                  aria-label="Default"
                  valueLabe
                  Display="on"
                  step={1}
                  value={inputValue}
                  marks={false}
                  min={0}
                  max={100}
                />
              </Box>
              <div className={styles.bottom__text}>
                <p>0</p>
                <p>Max : $1,000.00</p>
              </div>
            </div>
            <div className={styles.free}>
              <p>{t("free")}</p>
              <div className={styles.check}>
                <Checkbox
                  ref={chekRef}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            </div>
            <button onClick={search} className={styles.search}>
            {t("searchBtn")}
            </button>
            <button onClick={(e) => {
              e.preventDefault();
              getDataApi();
              reset();
            }} className={styles.reset}>{t("reset")}</button>
          </div>
        </form>
      </div>
      <All filter={setInfo} data={info}></All>
    </div>}
    </>
  );
}
