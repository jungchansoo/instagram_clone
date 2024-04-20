// React modules
import { useState } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// External modeuls
import axios from 'axios';

const SignupForm = () => {
  const emailOpts : RegisterOptions = {
    required: true,
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  }
  const usernameOpts: RegisterOptions = {
    required: true,
    minLength: 6
  }
  const passwordOpts: RegisterOptions = {
    required: true,
    minLength: 6
  }

  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange'});
  const nav = useNavigate();

  const submit = (data: any) => {
    console.log(data);
    axios.post('/users/signup', data)
      .then((resp)=>{
        console.log(resp);
        localStorage.setItem("userId", resp.data.pk);
        nav("/", {replace: true});
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

  return(
    <form className="signup-form" onSubmit={handleSubmit(submit)}>
      <img className="form-logo" src="logo.png"  alt="logo.png" />
      <input className="form-input" type="text" {...register("email",emailOpts)}placeholder="이메일"/>
      <input className="form-input" type="text" {...register("username",usernameOpts)}placeholder="사용자이름"/>
      <input className="form-input" type="password" {...register("password",passwordOpts)}placeholder="비밀번호"/>
      <button className="form-btn form-btn-blue" type="submit" disabled={!isValid} >가입</button>
      {errorMsg !== "" && <div className="form-error">{errorMsg}</div>}
    </form>
  );
}

export default SignupForm;