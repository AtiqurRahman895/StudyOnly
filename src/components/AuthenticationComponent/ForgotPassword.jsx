import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email);
    const {sendResetEmail}=useContext(AuthContext)
    const navigate=useNavigate()

    // setEmail(location.state?)

    // useEffect(() => {
    //     if (location.state && location.state.email) {
    //         setEmail(location.state.email);
    //     }
    // }, [location.state]);

    const ResetPasswordOnSubmit = (e) => {
        e.preventDefault();
        const email=e.target.email.value
        sendResetEmail(email)
        .then(() => {
            e.target.reset()
            navigate("/login")
            toast.success(`Reset email has been sent to ${email}!`)
            window.open('https://mail.google.com', '_blank');


        }).catch((error) => {
            toast.error(error.message?error.message:error.code)

        });
    };

    return (
        <section className='mt-16'>
            <div className="container hero flex items-center justify-center">
                <div className="fromWrapper max-w-sm">
                    <h1 className="text-5xl font-bold">Forgot password?</h1>
                    <form onSubmit={ResetPasswordOnSubmit} className="card-body p-0">
                        <div className="form-control">
                            <label htmlFor='email' className="label">
                                <span className="">Email</span>
                            </label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="email"
                                id="email"
                                className="input input-ghost input-bordered"
                                value={email}
                                required
                            />
                        </div>

                        <div className="mt-6">
                            <button className="formSubmitBtn">
                                Reset Password
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
