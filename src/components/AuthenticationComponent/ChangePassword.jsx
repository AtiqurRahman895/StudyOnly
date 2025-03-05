import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const ChangePassword = () => {
  // const [showOldPassword, setShowOldPassword]=useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const { user, ChangePassword } = useContext(AuthContext);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordInputChanges = (e) => {
    setPassword(e.target.value);
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{6,20}$/;
    if (!regex.test(e.target.value)) {
      e.target.classList.add("invalidInput");
      setPasswordError(true);
    } else {
      e.target.classList.remove("invalidInput");
      setPasswordError(false);
    }
  };

  const CreatUserOnSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    // const oldPassword=e.target.oldPassword.value

    // if(oldPassword===user.password){
    //     // have to use becrypt to compare Oldpassword with user.reloadUserInfo.passwordHash
    //     toast.error("Incorrect old password!")
    //     e.target.oldPassword.focus()
    //     return
    // }

    if (passwordError) {
      e.target.password.focus();
      return;
    }

    ChangePassword(password)
      .then(() => {
        e.target.reset();
        navigate("/");
        toast.success("Password changed successfully!");
      })
      .catch((error) => {
        toast.error(error.message ? error.message : error.code);
      });
  };
  return (
    <section className="mt-16">
      <div className="container hero flex items-center justify-center">
        <div className="fromWrapper max-w-sm">
          <h1 className="text-5xl font-bold">Change Password!</h1>
          <form onSubmit={CreatUserOnSubmit} className="card-body p-0">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="">Email</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input disabled:!border-[#ffffff4d] disabled:!text-[#ffffff4d]"
                value={user.email}
                disabled
                
              />
            </div>

            {/* <div className="form-control relative">
                            <label htmlFor="oldPassword" className="label">
                                <span className="">Old Password</span>
                            </label>

                            <input type={showOldPassword?"text":"password"} name="oldPassword" id="oldPassword" className="input input-bordered" required />

                            <button onClick={()=>setShowOldPassword(!showOldPassword)} type="button" className="btn btn-circle btn-sm absolute right-4 top-[3.2rem]">
                                {showOldPassword?<IoIosEye className="text-[20px]" />:<IoIosEyeOff className="text-[20px]" />}
                            </button>

                        </div> */}

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
                className="btn btn-ghost btn-circle btn-sm  absolute right-4 top-[3.2rem]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoIosEye className="text-[20px]" />
                ) : (
                  <IoIosEyeOff className="text-[20px]" />
                )}
              </button>

              {passwordError && (
                <label htmlFor="password" className="label">
                  <p className=" text-red-400">
                    Password must Be 6 to 20 characters long, Include at least
                    one digit (0-9), one lowercase letter (a-z), one uppercase
                    letter (A-Z) and one special character (@#$%^&*!)
                  </p>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="formSubmitBtn">Change</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChangePassword;
