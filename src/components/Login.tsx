import { useRef, useState, ChangeEvent } from "react";
import Input from "./Input";
import googleLogo from "@/assets/google.png";

interface LoginProps {
    check?: boolean; 
}

const Login = ({ check = true }: LoginProps) => {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    }

    function handleGoogleLogin(){
        console.log("jiji")
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newErrors = { email: '', password: ''};
        let valid = true;
        
        if (formData.email.trim() === '') {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Invalid email format';
            valid = false;
        }
        if (formData.password.trim() === '') {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            // const error: any | undefined = await login(formData.email, formData.password);
            // if(error){
            //     alert('Login error: Invalid email or password');
            // }else{
            //     navigate('/');
            // }
            console.table(formData);
        }
    }

    return(
        <div
            className={`absolute flex flex-col justify-center items-center h-full top-0 left-0 w-1/2 transition-all duration-500 ${
                check ? "z-10" : "transform translate-x-full opacity-0 z-0"
            }`}
        >
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-xl">Login</h1>
                <button
                    className="my-4 p-2 border-2 rounded-full hover:shadow-lg"
                    onClick={handleGoogleLogin}
                >
                    <img src={googleLogo} alt="Google Logo" className="w-5 h-5"/>
                </button>
                <p className="text-sm mb-3 text-zinc-400">or use your email account:</p>
            </div>
            <form 
                ref={form} onSubmit={handleSubmit}
                className="bg-white flex flex-col items-center justify-center text-center px-8"
            >
                <Input
                    data={{
                        type: 'email',
                        name: 'email',
                        value: formData.email,
                    }}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <Input 
                    data={{ 
                        type: 'password', 
                        name: 'password', 
                        value: formData.password 
                    }} 
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                <a href="#" className="text-sm text-gray-700 mt-2">
                    Forgot your password?
                </a>
                <button className="bg-mainColor text-white font-bold py-2 px-6 mt-4 rounded-full">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;