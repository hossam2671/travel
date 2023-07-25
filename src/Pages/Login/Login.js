import React, { useState } from 'react'
import style from './Login.module.css'
import Logo from '../../assets/logo.svg'
import Vector from '../../assets/Group 39467.svg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from "axios";


function Login() {
  const [tap, setTap] = useState("signUp")
  const [hi, setHi] = useState(false)
  const [userType, setUserType] = useState('user'); // 'user' is the default value

  const [formValues, setFormValues] = useState({
    userType: "",
    name: "",
    email: "",
    pass: "",
    cv: null,
    license: null,
  });

  const handleInputChange = (event) => {
    const { id, value, type, name, files } = event.target;
    if (type === "file") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: files[0],
      }));
    } else if (name === "row-radio-buttons-group") {
      setUserType(value);
      setFormValues((prevValues) => ({
        ...prevValues,
        userType: value,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    }
  };


  const handleSubmit =  (event) => {
    console.log("test front")
    event.preventDefault();
    
    try {
      const userType = formValues.userType;
      const { name, email, pass, cv, license } = formValues;
      
      const formData = new FormData();
      formData.append("userType", userType);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", pass);
      
      if (cv) {
        formData.append("cv", cv); // Append the cv file to the formData if it exists
      }
      
      if (license) {
        formData.append("license", license); // Append the license file to the formData if it exists
      }

      console.log(formData)
      
      if (userType === "user") {
        console.log("jjjjj")
        const response = axios.post('http://localhost:5000/user/register', formData).then((res) => {
          console.log(response)
       console.log("kkkkkkkkkkk")   
       // console.log(res)
          
          if (res.data.status === 200) {
            console.log(res.data.data);
            localStorage.setItem("user", JSON.stringify(res.data.data._id));
          } else {
            console.log(res.data.message);
          }
        });
      } else if (userType === "tourGuide" || userType === "cameraOperator" || userType === "director") {
        const response =  axios.post('http://localhost:5000/technical/register', formData);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  


  return (
    <main className={`${hi === true ? style.signn : ""}`}>
      <div className={style["form__box"]}>
        <div className={style["inner-box"]}>
          <div className={style["forms-wrap"]}>
            {/*--------------------- Sign In Form-----------------------*/}
            <form className={style["sign-in-form"]} id="sign__in__form" >
              <div className={style["logo"]}>
                <img src={Logo} alt="" />
              </div>
              <div className={style["heading"]}>
                <h2>Welcome Back</h2>
                <h6>Not registred yet?</h6>
                <a className={style["toggle"]} onClick={() => {
                  hi ? setHi(false) : setHi(true)
                  setTap("signUp")
                }}>Sign up</a>
              </div>
              <div className={style["actual-form"]}>
                <div className={style["input-wrap"]}>
                  <input type="email" className={style["input-field"]} id="log__email" />
                  <label>Email</label>
                  <small />
                </div>
                <div className={style["input-wrap"]}>
                  <input type="password" className={style["input-field"]} id="log__pass" />
                  <label>Password</label>
                  <small />
                </div>
                <input type="submit" defaultValue="Login" className={style["sign-btn"]} />
                <p className={style["forgo"]}>
                  Forget your password?
                  <a onClick={() => {
                    hi ? setHi(false) : setHi(true)
                    setTap("forget")
                  }} >Click here</a>
                </p>
              </div>
            </form>
            {/*--------------------- Sign up Form-----------------------*/}
            {
              tap == "signUp" &&
              <form className={style["sign-up-form"]} id="sign__up__form" onSubmit={handleSubmit} enctype="multipart/form-data">
                <div className={style["logo sign__logo"]}>
                  <img src={Logo} alt="" />
                </div>
                <div className={style["heading"]}>
                  <h2>Get Started</h2>
                  <h6>Already have an account?</h6>
                  <a onClick={() => {
                    hi ? setHi(false) : setHi(true)
                    setTap("login")
                  }} className={style["toggle"]} id="signUp">Login</a>
                </div>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Sign Up as :</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={userType}
                    onChange={handleInputChange}
                  >
                    <div className={style['parent__div']}>
                      <div className={style['column__flex']}>

                        <FormControlLabel value="tourGuide" control={<Radio />} label="Tour Guide" />
                        <FormControlLabel value="cameraOperator" control={<Radio />} label="Camera Operator" />
                      </div>
                      <div className={style['column__flex']}>

                        <FormControlLabel value="director" control={<Radio />} label="Director" />
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <div className={style["actual-form sign__form"]}>
                  <div className={style["input-wrap"]}>
                    <input
                      type="text"
                      id="name"
                      className={style["input-field"]}
                      onChange={handleInputChange}
                    />
                    <label>Name</label>
                    {/* <small /> */}
                  </div>
                  <div className={style["input-wrap"]}>
                    <input
                      type="email"
                      id="email"
                      className={style["input-field"]}
                      onChange={handleInputChange}
                    />
                    <label>Email</label>
                    {/* <small /> */}
                  </div>
                  <div className={style["input-wrap"]}>
                    <input
                      type="password"
                      id="pass"
                      className={style["input-field"]}
                      onChange={handleInputChange}
                    />
                    <label>Password</label>
                    {/* <small /> */}
                  </div>
                  {userType === 'director' || userType === 'cameraOperator' || userType === 'tourGuide' ? (
                    <div className={style['files__input']}>
                      <div>
                        <label className={style['files__label']}>Upload CV</label>
                        <input
                          type="file"
                          id="cv"
                          className={style['file-input']}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className={style['files__label']}>Upload License</label>
                        <input
                          type="file"
                          id="license"
                          className={style['file-input']}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                  ) : null}


                  <input type="submit" className={style["sign-btn"]} />
                  <p className={style["text"]}>
                    By signing up, I agree to the
                    <a href="#">Terms of Services</a> and
                    <a href="#">Privacy Policy</a>
                  </p>
                </div>
              </form>
            }
            {/*--------------------- Forget Password Form-----------------------*/}
            {
              tap == "forget" &&
              <form className={style["sign-up-form"]} id="forgForm">
                <div className={style["logo logo__forg"]}>
                  <img src={Logo} alt="" />
                </div>
                <div className={style["heading heading__forg"]}>
                  <h2>Welcome Back</h2>
                </div>
                <div className={style["input-wrap"]}>
                  <input type="password" className={style["input-field"]} id="new__pass" />
                  <label>Password</label>
                  <small />
                </div>
                <div className={style["input-wrap"]}>
                  <input type="password" className={style["input-field"]} id="confirm__pass" />
                  <label>Confirm Password</label>
                  <small />
                </div>
                <input type="submit" defaultValue="Reset Password" className={style["sign-btnn"]} />
              </form>
            }
          </div>
          <div className={style["carousel"]}>
            <div className={style["carousel__welcome"]}>
              <h2>Welcome to</h2>
              <img src={Logo} alt="" className={style["carousel__logo"]} />
            </div>
            <div className={style["carousel__text"]}>
              <h1>Book your Tour Now!</h1>
            </div>
            <img src={Vector} alt="" className={style["carousel__vector"]} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

