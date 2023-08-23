import React, { useState, useEffect } from 'react'
import $ from 'jquery';
import style from './Tours.module.css'
import Vector from '../../assets/Vector.svg'
import Vector1 from '../../assets/Vector (1).svg'
import logo from '../../assets/logo.png'
import United_Kingdom from '../../assets/United Kingdom (GB).png'
import egypt from "../../assets/Egypt (EG).png"
// import Map from '../../assets/Map.png'
import SearchMap from '../../assets/Search.png'
import LocationOne from '../../assets/Doc.svg'
import LocationTwo from '../../assets/Doctor.svg'
import BtnOne from '../../assets/btn.svg'
import BtnTwo from '../../assets/btn (1).svg'
import BtnThree from '../../assets/btn (2).svg'
import Chat from '../../assets/chat.svg'
import TourCardImage from '../../assets/image3.png'
import logo1 from "../../assets/logo (1).png"
import facebook from "../../assets/Facebook.svg"
import twitter from "../../assets/Twitter.svg"
import youtube from "../../assets/YouTube.svg"
import linked from "../../assets/LinkedIn.svg"
import instagram from "../../assets/Instagram.svg"
import frame97 from '../../assets/Frame 39497.png'
import frame98 from '../../assets/Frame 39498.png'
import axios from 'axios';
import Card from '../Card/Card';
import Map from '../Home/Map'
import SuccessandErrorModals from '../SuccessandErorrModals/SuccessandErrorModals';
function Tours() {
  const [tours, setTours] = useState([])
  const [filteredTours, setFilteresTours] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can adjust the number of items per page
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentTours = filteredTours?.slice(firstIndex, lastIndex);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState([]);
  const [address, setAddress] = useState("")

  const totalPages = Math.ceil(filteredTours?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [menu, setMenu] = useState(false)
  const [lang, setLang] = useState("english")
  const handleFirstClick = () => {
    if ($('.second').hasClass('on') && $('.tumbler').hasClass('on')) {
      $('.second').removeClass('on');
      $('.tumbler').removeClass('on');
      $('.first').addClass('on');
    }
    return false;
  };

  const handleSecondClick = () => {
    if ($('.first').hasClass('on')) {
      $('.first').removeClass('on');
      $('.second').addClass('on');
      $('.tumbler').addClass('on');
    }
    return false;
  };

  const handleTumblerClick = () => {
    if ($('.tumbler').hasClass('on') && $('.second').hasClass('on')) {
      $('.tumbler').removeClass('on');
      $('.second').removeClass('on');
      $('.first').addClass('on');
    } else {
      $('.tumbler').addClass('on');
      $('.first').removeClass('on');
      $('.second').addClass('on');
    }
    return false;
  };

  useEffect(() => {
    $('.first').click(handleFirstClick);
    $('.second').click(handleSecondClick);
    $('.tumbler').click(handleTumblerClick);
    axios.get("http://localhost:5000/admin//allTours").then((res) => {
      console.log(res.data.data)
      setTours(res.data.data)
      setFilteresTours(res.data.data)
    })
  }, []);
  useEffect(() => {
    axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
      .then(res => {
        setData(res.data);
        console.log(res.data)
        let countries = [...new Set(res.data.map(item => item.country))];
        countries.sort();
        setCountry(countries);
        console.log(countries)
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
      <nav>
        <div className={style["container"]}>
          <div className={style["nav__content"]}>
            <div className={style["nav__right"]}>
              <div className={style["nav__logo"]}>
                <img src={logo} alt="logo" />
              </div>
              <div className={style["nav__search"]}>
                <input type="text" placeholder="Tour name or location..." />
              </div>
              <ul className={style["nav__links"]}>
                <li><a>Home</a></li>
                <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                </li>
                <li><a href="#">Our Mission</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className={style["menu"]}>
              <i onClick={() => {
                if (menu == false) {
                  setMenu(true)
                  console.log(true)
                }
                else {
                  setMenu(false)
                  console.log(false)
                }

              }} className="fas fa-bars" />
              {
                menu == true &&
                <div className={style["drobdown"]}>
                  <ul className={style["nav__link"]} id="drobDown">
                    <li><a href="#">Home</a></li>
                    <li className={style["active"]}><a>Tours <img src={Vector} alt='' /></a>
                    </li>
                    <li><a href="#">Our Mission</a></li>
                    <li><a href="#">Contact Us</a></li>
                  </ul>
                </div>
              }
            </div>
            <div className={style["nav__left"]}>
              <div className={style["nav__langs"]}>
                {
                  lang == "english" &&
                  <a><img src={United_Kingdom} alt='' /> English</a>
                }
                {
                  lang == "arabic" &&
                  <a href="#"><img src={egypt} alt='' /> العربية</a>
                }
                {
                  lang == "italiano" &&
                  <a href="#"><img src={United_Kingdom} alt='' /> Italiano</a>
                }
                <ul>
                  <li onClick={() => {
                    setLang("english")
                  }}><a href="#"><img src={United_Kingdom} alt='' /> English</a></li>
                  <li onClick={() => {
                    setLang("arabic")
                  }}><a href="#"><img src={egypt} alt='' /> العربية</a></li>
                  <li onClick={() => {
                    setLang("italiano")
                  }}><a href="#"><img src={United_Kingdom} alt='' /> Italiano</a></li>
                </ul>
              </div>
              <div className={style["nav__join"]}>
                <a href="#">Join Us Now</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={style["path"]}>
        <div className={style["container"]}>
          <div className={style["path__content"]}>
            <h3>Home</h3>
            <img src={Vector1} alt='' />
            <h3>Tours</h3>
          </div>
        </div>
      </div>

      <section className={style["search__bar__section"]}>
        <div className={style["container"]}>
          <div className={style["search__bar__bk"]}>
            <div className={style["search__bar__items"]}>

              <div className={style["btn__info"]}>

                <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  setFilteresTours(tours.filter(tour => tour.address === e.target.value))
                  setAddress(e.target.value)
                }}>
                  <option value={0} disabled>Select country</option>
                  {country?.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className={style["btn__info"]}>

                <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  setFilteresTours(tours.filter(tour => tour.city === e.target.value))

                }}>
                  <option value={0} disabled>Select city</option>
                  {data?.filter(item => item.country === address)
                    .map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
              </div>
              <div className={style["btn__info"]}>

                <i className="fa-solid fa-location-dot " id={style["myicon"]} style={{
                  color: "rgb(6, 12, 19)",
                  "fontSize": "20px",
                  "right": "30px",
                  "position": "absolute",
                  "top": "50%",
                  "transform": "translateY(-50%)",
                }} />
                <select defaultValue={0} onChange={(e) => {
                  if (e.target.value === "english") {
                    setFilteresTours(tours?.filter(tour => tour.englishTourGuide))
                    setCurrentPage(1)
                  }
                  if (e.target.value === "arabic")
                    setFilteresTours(tours?.filter(tour => tour.arabicTourGuide))
                  setCurrentPage(1)
                  if (e.target.value === "italian") {
                    setFilteresTours(tours?.filter(tour => tour.italianTourGuide))
                    setCurrentPage(1)
                  }
                }}>
                  <option value={0}>Select language</option>
                  <option value={"arabic"}>arabic</option>
                  <option value={"english"}>english</option>
                  <option value={"italian"}>italian</option>
                </select>
              </div>
              <div className={style["live__now__search"]}>
                <a className={style["tumbler"]}>.</a>
                <a className={style["second"]}>Live Now Only</a>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={style["tours__map__section"]}>
        <div className={style["container"]}>
          <h2>Map View</h2>
          <Map tours={filteredTours} />
        </div>
      </section>

      <section className={style["list__view__section"]}>
        <div className={style["container"]}>
          <h2>List View</h2>
          <div className={style["list__view__cards"]}>
            {currentTours?.map((item) => {
              return <Card key={item._id} data={item} />
            })}

          </div>
          {/* Pagination */}
          <div className={style["pagination"]}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? style["active"] : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>

        </div>
      </section>

      <footer>
        <div className={style["container"]}>
          <div className={style["footer__content"]}>
            <ul>
              <li><img src={logo1} alt='' /></li>
              <li>Lorem ipsum dolor sit amet consectetur adipiscing elit aliquam mauris sed ma</li>
              <li className={style["links"]}>
                <a href="#"><img src={facebook} alt='' /></a>
                <a href="#"><img src={twitter} alt='' /></a>
                <a href="#"><img src={instagram} alt='' /></a>
                <a href="#"><img src={linked} alt='' /></a>
                <a href="#"><img src={youtube} alt='' /></a>
              </li>
            </ul>
            <ul>
              <li>Website</li>
              <li>Tours</li>
              <li>Pricing</li>
              <li>Our Mission</li>
              <li>Contact Us</li>
            </ul>
            <ul>
              <li>Company</li>
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
            <ul>
              <li>Support</li>
              <li>Getting started</li>
              <li>Help center</li>
              <li>Report a bug</li>
              <li>Chat support</li>
            </ul>
            <ul>
              <li>Downloads</li>
              <li><img src={frame97} alt='' /></li>
              <li><img src={frame98} alt='' /></li>
            </ul>
          </div>
          <div className={style["footer__footer"]}>
            <h4>Copyright © 2023 LVW.</h4>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Tours;