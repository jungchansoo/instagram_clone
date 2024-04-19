// react modules
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, RegisterOptions } from 'react-hook-form';

// exteranl modules
import axios from 'axios';

// Assets
import LockIcon from '../../icons/lock.svg'

const PasswordForm = () => {
    const emailOpts : RegisterOptions = {
        required: true,
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      }
      const authcodeOpts: RegisterOptions = {
        pattern: /^.{6}$/
      }
      const passwordOpts: RegisterOptions = {
        minLength: 6
      }

    const [current, setCurrent] = useState("email");
    const [btnLabel, setbtnLabel] = useState("인증코드 전송하기");
    const [time,setTime] = useState(299);
    const [timeStr,setTimeStr] = useState("5:00");
    const { register, setValue, getValues, reset, formState: {errors, isDirty}} = useForm({ mode : 'onChange'})
    const navi = useNavigate();
    

    useEffect(()=>{
        if(current==="authcode"){
            const timer = setInterval(()=>{
                if(time > 0){
                    setTime(t=>t-1);
                }
                if(time === 0){
                    clearInterval(timer);
                }
            }, 1000)
        }
    },[current])

    useEffect(()=>{
        if(time >= 0){
            let min = Math.floor(time/60);
            let sec = time % 60;
            
            let str = `${min}:${sec.toString().padStart(2,'0')}`
            setTimeStr(str);
        }
    }, [time]);
    
    const handleInput = () => {
        let data = getValues();
        console.log(data);
        if(current === 'email'){
            setCurrent('authcode');
            setbtnLabel('인증코드 확인하기');
        }else if(current === 'authcode'){
            setCurrent('password');
            setbtnLabel('비밀번호 변경');
        }else if(current === 'password'){

        }
    }

    const toSignin = () =>{
        navi('/signin');
    }

    return (
        <form className="password-form">
            <img className="form-content-icon" src={LockIcon} alt="lock.svg" />
            <div className="form-content-title">로그인에 문제가 있나요?</div>
            <div className="form-content-subtitle">이메일 주소를 입력하시면 계정에 다시 액세스할 수 있는 인증코드를 보내드립니다.</div>
            {
                current === "email" &&
                <input className="form-input" type="text" placeholder='이메일' {...register('email',emailOpts)} />
            }
            {
                current === "authcode" &&
                <div>
                    <input className="form-input" type="text" placeholder='인증코드' {...register('authcode',authcodeOpts)} />
                    <span className="form-expired">{timeStr}</span>
                </div>
            }
            {
                current === "password" &&
                <input className="form-input" type="password" placeholder='비밀번호' {...register('password',passwordOpts)} />
            }
            <button className="form-btn form-btn-blue" type='button' onClick={handleInput}>{btnLabel}</button>
            <Link className="signup-link noline-link" to="/signup">새 계정 만들기</Link>
            <button className="form-btn form-btn-bottom" onClick={()=>toSignin()}>로그인으로 돌아가기</button>
        </form>
    );
}

export default PasswordForm;