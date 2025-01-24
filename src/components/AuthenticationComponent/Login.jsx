// import React from 'react';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import googleSVG from "../../assets/google.svg";
import { normalAxios } from "../../Hooks/useNormalAxios";
// import PropTypes from 'prop-types';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState();
  const [emailValid, setEmailValid] = useState(false);
  const { loginWithGoogle, loginUser, logoutUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailInputChanges = (e) => {
    setemail(e.target.value);
    setEmailValid(e.target.checkValidity());
  };

  const handleGoogleLoginBtn = async () => {
    try {
      let result = await loginWithGoogle();
      setUser(result.user)
      const res = await normalAxios.post("/addUser", {
        image:result.user.photoURL,
        name:result.user.displayName,
        email: result.user.email,
        role: "student",
      });
      // if (res?.data?.insertedId) {
      //   logoutUser();
      //   toast.success(
      //     `You have successfully registered. Now, please login again!`
      //   );
      // } else {
      //   navigate("/");
      //   toast.success(`Login successful! Welcome, ${result.user.displayName}!`);
      // }
      navigate("/");
      toast.success(`Login successful! Welcome, ${result.user.displayName}!`);
    } catch (error) {
      toast.error(error.message ? error.message : error.code);
    }
  };

  const LoginOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((userCredential) => {
        navigate("/");
        toast.success(
          `Login successful! Welcome, ${userCredential.user.displayName}!`
        );
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };
  return (
    <section className="mt-16">
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-sm">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <form onSubmit={LoginOnSubmit} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="">Email</span>
              </label>
              <input
                onChange={handleEmailInputChanges}
                type="email"
                name="email"
                id="email"
                className="input input-ghost input-bordered"
                value={email}
                required
              />
            </div>

            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input input-ghost input-bordered"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-ghost btn-circle btn-sm  absolute right-4 top-[3.2rem]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoIosEye className="text-[20px]" />
                ) : (
                  <IoIosEyeOff className="text-[20px]" />
                )}
              </button>

              <Link
                to={"/forgot-password"}
                state={{ email }}
                className="-alt link link-hover hover:scale-100 hover:font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <div className="mt-6">
              <button className="formSubmitBtn">Login</button>
            </div>
            <span className="text-center mt-4">
              Do not have an account?{" "}
              <Link
                to={"/register"}
                className="link link-hover text-custom-primary hover:font-bold "
              >
                {" "}
                <b>Register now</b>{" "}
              </Link>
            </span>
          </form>

          <h3 className="text-center text-custom-half-primary">or</h3>
          <button
            onClick={handleGoogleLoginBtn}
            className="btn btn-ghost border text-white"
          >
            <img src={googleSVG} alt="" className="w-[1rem]" />
            Login with Google
          </button>
        </div>
      </div>
    </section>
  );
};

// Login.propTypes = {

// };

export default Login;
