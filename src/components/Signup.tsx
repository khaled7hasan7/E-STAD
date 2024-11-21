import { useRef, useState, ChangeEvent } from "react";
import Input from "./Input";
import googleLogo from "@/assets/google.png";

interface LoginProps {
    check?: boolean; 
}

const Signup = ({ check = true }: LoginProps) => {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        username: '',
        phone: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: '',
        phone: '',
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

    function handleGoogleSignup(){

    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let valid = true;
        
        const newErrors = { username: '', phone: '', email: '', password: ''};
        if (formData.username.trim() === '') {
            newErrors.username = 'Username is required';
            valid = false;
        }
        if (formData.phone.trim() === '') {
            newErrors.phone = 'Phone number is required';
            valid = false;
        }else if(formData.phone.charAt(0) === '0' && formData.phone.charAt(1) == '5' && formData.phone.length == 10){
            newErrors.phone = 'Invalid phone number';
            valid = false;
        }
        if (formData.email.trim() === '') {
            newErrors.email = 'Phone number is required';
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
            console.table(formData);
        }
    }

    return(
        <div
            className={`absolute flex flex-col justify-center items-center top-0 left-0 w-1/2 h-full transition-all duration-500 ${
            !check ? "transform translate-x-full opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-xl">Create Account</h1>
                <button
                    className="my-3 p-2 border-2 rounded-full hover:shadow-lg"
                    onClick={handleGoogleSignup}
                >
                    <img src={googleLogo} alt="Google Logo" className="w-5 h-5"/>
                </button>
                <p className="text-sm mb-1 text-zinc-400">or use your email for registration:</p>
            </div>
            <form ref={form} onSubmit={handleSubmit}
                className="bg-white flex flex-col items-center justify-center text-center px-5"
            >
                <p className="capitalize text-left w-full font-bold">username</p>
                <Input
                    data={{
                        type: 'text',
                        name: 'username',
                        value: formData.username,
                    }}
                    onChange={handleChange}
                />
                {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

                <p className="capitalize text-left w-full font-bold">phone number</p>
                <Input 
                    data={{ 
                        type: 'text', 
                        name: 'phone', 
                        value: formData.phone,
                    }} 
                    onChange={handleChange}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

                <p className="capitalize text-left w-full font-bold">email</p>
                <Input
                    data={{
                        type: 'email',
                        name: 'email',
                        value: formData.email,
                    }}
                    onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                <p className="capitalize text-left w-full font-bold">password</p>

                <Input 
                    data={{ 
                        type: 'password', 
                        name: 'password', 
                        value: formData.password 
                    }} 
                    onChange={handleChange}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                <button className="bg-mainColor text-white font-bold py-2 px-6 mt-4 rounded-full">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Signup;