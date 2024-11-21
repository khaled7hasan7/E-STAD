import { useRef, useState, ChangeEvent } from "react";
import Input from "./Input";


interface LoginProps {
    check?: boolean; // Optional prop
}

const Signup = ({ check = true }: LoginProps) => {
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

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let valid = true;
        
        const newErrors = { email: '', password: ''};
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
            className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-500 ${
            !check ? "transform translate-x-full opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
            <form className="bg-white flex flex-col items-center justify-center text-center p-8 h-full">
            <h1 className="font-bold text-xl">Create Account</h1>
            <input
                type="text"
                placeholder="Name"
                className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
            />
            <input
                type="email"
                placeholder="Email"
                className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
            />
            <input
                type="password"
                placeholder="Password"
                className="bg-gray-200 border-none py-2 px-3 mt-2 w-full"
            />
            <button className="bg-green-900 text-white font-bold py-2 px-6 mt-4 rounded-full">
                Sign Up
            </button>
            </form>
        </div>
    );
}

export default Signup;