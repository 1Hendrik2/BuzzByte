import { CircleUserRound } from "lucide-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type LoginFormsInputs = {
    email: string;
    token: string;
};

const translations = {
    en: {
        login: "Login",
        email: "E-mail",
        emailPlaceholder: "Enter e-mail...",
        token: "Token",
        tokenPlaceholder: "Enter token...",
        acquire: "To acquire the token please click",
        here: "here",
    },
    de: {
        login: "Anmelden",
        email: "E-Mail",
        emailPlaceholder: "E-Mail eingeben...",
        token: "Token",
        tokenPlaceholder: "Token eingeben...",
        acquire: "Um das Token zu erhalten, klicken Sie bitte",
        here: "hier",
    },
    fr: {
        login: "Connexion",
        email: "E-mail",
        emailPlaceholder: "Entrez l'e-mail...",
        token: "Jeton",
        tokenPlaceholder: "Entrez le jeton...",
        acquire: "Pour obtenir le jeton, veuillez cliquer",
        here: "ici",
    }
};

const validation = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required*'),
    token: Yup.string().required("Token is required*")
});

const LoginPage = () => {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
    const [language, setLanguage] = useState("en");
    const [login, setLogin] = useState("en");
    const [email, setEmail] = useState("en");
    const [emailPlaceholder, setEmailPlaceholder] = useState("en");
    const [token, setToken] = useState("en");
    const [tokenPlaceholder, setTokenPlaceholder] = useState("en");
    const [acquire, setAcquire] = useState("en");
    const [here, setHere] = useState("en");

    useEffect(() => {
        const storedLanguage = sessionStorage.getItem("language");
        setLogin((translations[language as keyof typeof translations] as { login: string } | undefined)?.login || "");
        setEmail((translations[language as keyof typeof translations] as { email: string } | undefined)?.email || "");
        setEmailPlaceholder((translations[language as keyof typeof translations] as { emailPlaceholder: string} | undefined)?.emailPlaceholder || "");
        setToken((translations[language as keyof typeof translations] as { token: string} | undefined)?.token || "");
        setTokenPlaceholder((translations[language as keyof typeof translations] as { tokenPlaceholder: string} | undefined)?.tokenPlaceholder || "");
        setAcquire((translations[language as keyof typeof translations] as { acquire: string} | undefined)?.acquire || "");
        setHere((translations[language as keyof typeof translations] as { here: string} | undefined)?.here || "");
        if (storedLanguage && translations.hasOwnProperty(storedLanguage)) {
            setLanguage(storedLanguage);
        }
    }, [language]);

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.email, form.token);
    };

    return (
        <div className="flex justify-center items-center h-96">
            <div className="w-96 p-6 shadow-xl bg-white rounded-md">
                <h1 className="text-3xl flex items-baseline justify-center font-semibold"><CircleUserRound />{login}</h1>
                <hr className="mt-3" />
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="mt-3">
                        <label className="block text-base mb-2">{email}</label>
                        <input type="email" id="email" className="border w-full text-base px-2 py-1 foucus:outline-none focus:ring-0 focus:border-gray-600" placeholder={emailPlaceholder} {...register("email")} />
                        {errors.email ? <p>{errors.email.message}</p> : ""}
                    </div>
                    <div className="mt-3">
                        <label className="block text-base mb-2">{token}</label>
                        <input type="text" id="token" className="border w-full text-base px-2 py-1 foucus:outline-none focus:ring-0 focus:border-gray-600" placeholder={tokenPlaceholder} {...register("token")} />
                        {errors.token ? <p>{errors.token.message}</p> : ""}
                    </div>
                    <div className="mt-3">
                        <p>{acquire} <a href="https://newsapi.org/register" className="underline">{here}</a></p>
                    </div>
                    <div className="mt-5">
                        <button type="submit" className="border-2 border-indigo-950 bg-indigo-950 text-white py-1 w-full rounded-md hover:bg-indigo-700 font:semibold">{login}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;