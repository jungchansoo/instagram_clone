// React modules
import { useForm, RegisterOptions } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// External modeuls
import axios from 'axios';
const url = 'http://localhost:9998/users/signup';

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
  const { register, handleSubmit, formState: { isValid } } = useForm({ mode: 'onChange'});
  const nav = useNavigate();

  const submit = (data: any) => {
    console.log(data);
    axios.post(url, data)
      .then((resp)=>{
        console.log(resp);
        localStorage.setItem("userId", resp.data.pk);
        nav("/", {replace: true});
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  return(
    <form className="signup-form" onSubmit={handleSubmit(submit)}>
      <img className="form-logo" src="logo.png"  alt="logo.png" />
      <input className="form-input" type="text" {...register("email",emailOpts)}placeholder="이메일"/>
      <input className="form-input" type="text" {...register("username",usernameOpts)}placeholder="사용자이름"/>
      <input className="form-input" type="password" {...register("pasword",passwordOpts)}placeholder="비밀번호"/>
      <button className="form-btn form-btn-blue" type="submit" disabled={!isValid} >가입</button>
    </form>
  );
}

export default SignupForm;