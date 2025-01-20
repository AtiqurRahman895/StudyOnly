import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import googleSVG from "../../assets/google.svg";
import useHostImage from "../../Hooks/useHostImage";
import { FaRegUserCircle } from "react-icons/fa";
import { normalAxios } from "../../Hooks/useNormalAxios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { loginWithGoogle, logoutUser, creatUser, updateUserProfile, setUser } =
    useContext(AuthContext);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [image, setImage] = useState();

  const hostImage = useHostImage();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    hostImage(file, setImage);
  };

  const handlePasswordInputChanges = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,20}$/;
    if (!regex.test(e.target.value)) {
      e.target.classList.add("invalid");
      setPasswordError(true);
    } else {
      e.target.classList.remove("invalid");
      setPasswordError(false);
    }
  };

  // const handleGoogleLoginBtn=async()=>{
  //     try {
  //         const result=await loginWithGoogle()
  //         await normalAxios.post("/addUser",{email:result.user.email,role:"student"})
  //         navigate("/")
  //         toast.success(`Login successful! Welcome, ${result.user.displayName}!`)
  //     } catch (error) {
  //         toast.error(error.message?error.message:error.code)
  //     }
  // }

  const handleGoogleLoginBtn = async () => {
    try {
      let result = await loginWithGoogle();
      setUser(result.user)

      const res = await normalAxios.post("/addUser", {
        email: result.user.email,
        role: "student",
      });

      if (res?.data?.insertedId) {
        logoutUser();
        toast.success(
          `You have successfully registered. Now, please login again!`
        );
      } else {
        navigate("/");
        toast.success(`Login successful! Welcome, ${result.user.displayName}!`);
      }
    } catch (error) {
      toast.error(error.message ? error.message : error.code);
    }
  };

  // const handleGoogleLoginBtn=async()=>{
  //     try {
  //         let result=await loginWithGoogle()
  //         const res=await normalAxios.post("/addUser",{email:result.user.email,role:"student"})
  //         // console.log(res?.data?.insertedId)
  //         if(res?.data?.insertedId){
  //             toast.success("New user added. Welcome!");
  //         }
  //         navigate("/")
  //         toast.success(`Login successful! Welcome!`)

  //     } catch (error) {
  //         toast.error(error.message?error.message:error.code)
  //     }

  // }

  const CreatUserOnSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = image;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const role = e.target.role.value;

    if (passwordError) {
      e.target.password.focus();
      return;
    }

    try {
      await creatUser(email, password);
      toast.success("Your Registration successfull!");
      await updateUserProfile(name, photoURL);
      await normalAxios.post("/addUser", { email, role });
      logoutUser();
      navigate("/login");
    } catch (error) {
      toast.error(error.message ? error.message : error.code);
    }
  };
  return (
    <section className="mt-16">
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-lg">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <form onSubmit={CreatUserOnSubmit} className="card-body p-0">
            <div className="form-control ">
              <label htmlFor="name" className="label">
                <span className="">Name</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="input input-ghost input-bordered"
                minLength={3}
                required
              />
            </div>

            <div className="form-control flex flex-col items-center mt-3">
              <label
                htmlFor="image"
                className="label relative flex flex-col text-center w-fit"
              >
                <div className="">
                  {image ? (
                    <div className="bg-white max-w-12 xs:max-w-20 aspect-square rounded-full overflow-hidden">
                      <img src={image ? image : ""} alt="" className="" />
                    </div>
                  ) : (
                    <FaRegUserCircle className={`text-5xl xs:text-7xl`} />
                  )}

                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input absolute opacity-0 scale-0"
                  />
                </div>
                <span className="">
                  {image ? "1 Image File Chosen" : "Choose your Photo"}
                </span>
              </label>
              {/* <input type='text' name="photoURL" id="photoURL" className="input input-ghost input-bordered" /> */}
            </div>

            {/* <label htmlFor="pic" className="form-control">
                            <div className="label">
                                <span className="">profile picture</span>
                            </div>
                            <input type="file" name="pic" id="pic" className="file-input file-input-bordered" />
                        </label> */}

            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input input-ghost input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label htmlFor="password" className="label">
                <span className="">Password</span>
              </label>

              <input
                onChange={handlePasswordInputChanges}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input input-ghost input-bordered"
                value={password}
                required
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="btn btn-ghost btn-circle btn-sm absolute right-4 top-[3.2rem]"
              >
                {showPassword ? (
                  <IoIosEye className="text-[20px]" />
                ) : (
                  <IoIosEyeOff className="text-[20px]" />
                )}
              </button>

              {passwordError && (
                <label htmlFor="password" className="label">
                  <p className="-alt text-red-500">
                    Password must Be 6 to 20 characters long, Include at least
                    one digit (0-9), one lowercase letter (a-z), one uppercase
                    letter (A-Z) and one special character (@#$%^&*!)
                  </p>
                </label>
              )}
            </div>

            <div className="form-control flex-1">
              <label htmlFor="role" className="label w-fit">
                <span className="">Role</span>
              </label>
              <select
                defaultValue={""}
                name="role"
                id="role"
                className="select select-ghost select-bordered"
                required
              >
                <option value={""} disabled hidden>
                  Pick role
                </option>
                <option value={"student"}>Student</option>
                <option value={"tutor"}>Tutor</option>
              </select>
            </div>

            <div className="mt-6">
              <button className="formSubmitBtn">Submit</button>
            </div>

            <span className="text-center mt-4">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="link link-hover text-custom-primary hover:font-bold "
              >
                {" "}
                <b>Login now</b>{" "}
              </Link>
            </span>
          </form>

          <h3 className="text-center text-custom-half-primary">or</h3>
          <button
            onClick={handleGoogleLoginBtn}
            className="btn btn-ghost border text-white"
          >
            <img src={googleSVG} alt="" className="w-[1rem]" /> Login with
            Google
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
