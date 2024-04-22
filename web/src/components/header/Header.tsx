// React
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Assets
import HomeIcon from '../../icons/home_outlined.svg';
import AddIcon from '../../icons/add_outlined.svg';
import ProfileIcon from '../../icons/profile.svg';
import SettingIcon from '../../icons/setting.svg';



// Styles
import './Header.css';

const Header = () =>{
    const [menu, setMenu] = useState(false);
    const [cookies] = useCookies();

    const showMenu = (event : any) => {
        if(event.target.id !== "menu-background") {
            setMenu(true);
        }
    }

    const hideMenu = (event : any) => {
        if(event.target.id === "menu-background") {
            setMenu(false);
        }
    }

    const handleAuth = () =>{
        if(!cookies.csrftoken){
            window.location.replace('/signin');
        } else {
            document.cookie = 'csrftoken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            localStorage.clear();
            window.location.replace('/');
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/">
                        <img className="logo" src="logo2.png" alt="logo2.png" />
                    </Link>
                </div>

                <div className="nav-center"></div>
                <div className="nav-right">
                    <span className="nav-item">
                        <Link to="/">
                            <img className="nav-item-icon" src={HomeIcon} alt="home icon" />
                        </Link>
                    </span>
                    <span className="nav-item">
                        <div>
                            <img className="nav-item-icon" src={AddIcon} alt="add icon" />
                        </div>
                    </span>
                    <span className="nav-item" onClick={showMenu}>
                        <img className="nav-item-profile" src="https://raw.githubusercontent.com/comeduschool/instagram/django/reactjs/web/public/assets/test-profile.jpeg" alt="user profile"></img>
                        <div className="nav-menu">
                            <div className={menu? "nav-menu-container nav-menu-container-show" : "nav-menu-container nav-menu-container-hide"}>
                                <div className="nav-menu-container-tail"></div>
                                <div className="nav-menu-item-list">
                                    <a className="icon-label-container" >
                                        <img className="nav-menu-icon" src={ProfileIcon} alt="profile icon" />
                                        <span className="icon-label">프로필</span>
                                    </a>
                                    <Link className="icon-label-container" to="/setting">
                                        <img className="nav-menu-icon" src={SettingIcon} alt="setting icon" />
                                        <span className="icon-label">설정</span>
                                    </Link>
                                    <div className="icon-label-container nav-menu-logout" onClick={handleAuth}>
                                        <span className="icon-label">{cookies.csrftoken ? "로그아웃" : "로그인"}</span>
                                    </div>
                                </div>
                            </div>
                            <div id="menu-background" className={menu ? "nav-menu-background-show" : "nav-menu-background-hide"} onClick={hideMenu}></div>
                        </div>
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default Header;