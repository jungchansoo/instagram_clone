// React module
import { useState } from "react";
import { useForm, RegisterOptions } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";

// External modules
import axios from "axios";

const SigninForm = () => {
    const emailOpts: RegisterOptions = {
        required: true,
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    };

    const passwordOpts: RegisterOptions = {
        required: true,
        minLength: 6
    };

    const [errorMsg, setErrorMsg] = useState("");
    const {register, handleSubmit, formState: { isValid }} = useForm({ mode: 'onChange' })
    const nav = useNavigate();

    const submit = (data: any) => {
        console.log(data);
        axios.post('/users/signin', data)
        .then((resp)=>{
            localStorage.setItem('userId', resp.data.pk);
            nav('/', {replace: true});
        })
        .catch((error)=>{
            console.log(error);
            let errorArray: string[] = [];
            Object.keys(error.response.data).map((key)=>{
              errorArray = [...errorArray.concat(error.response.data[key])];
              return null;
            });
            setErrorMsg(errorArray.join(" "));
          })
    }

    return (
        <form className="signin-form" onSubmit={handleSubmit(submit)}>
            <img className="form-logo" src="logo.png" alt="logo.png" />
            <input className="form-input" type="text" placeholder="이메일" {...register("email", emailOpts)} />
            <input className="form-input" type="password" placeholder="비밀번호" {...register("password", passwordOpts)}/>
            <button className="form-btn form-btn-blue" type="submit" disabled={!isValid}>로그인</button>
            <Link className="password-link noline-link" to="/password">
                <span className="password-link-text">비밀번호를 잊으셨나요?</span>
            </Link>
            {errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
        </form>
    )
}


export default SigninForm;