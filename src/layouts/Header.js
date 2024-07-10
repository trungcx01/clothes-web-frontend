import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import logoApp from '../assets/images/logo.png'
import { useLocation, NavLink, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutAPI } from "../services/AuthService";
import { useEffect } from "react";
import '../layouts/Header.scss'
import CartIcon from '../assets/images/cart.png'
import WishListIcon from '../assets/images/heart.png'
import UserIcon from '../assets/images/user.png'
import SearchIcon from '../assets/images/search.png'

function Header(props) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        localStorage.removeItem("token");
        navigate("/login")

    }

    return (
        <>
            <div className="header-page">
                <div className="header container">
                    <div className="logo">
                        <a href="/">
                            <span>TrunK</span>
                        </a>
                    </div>
                    <input type="checkbox" id='menu toggle' hidden></input>
                    <div className="search">
                        <input id='search-input' className="form-control" type="text" placeholder="Search here..."></input>
                        <label for='search-input'>
                            <img src={SearchIcon} width='23px' height='23px'></img>
                        </label>
                    </div>

                    <nav>
                        {/* <div className="logo">
                            <span>TrunK</span>
                        </div> */}

                        <ul>
                            <li>
                                <a href="/">
                                    Home
                                </a>
                            </li>

                            <li>
                                <a href="/shop">
                                    Products
                                </a>
                            </li>

                            <li>
                                <a href="/">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/wishList">
                                    <img src={WishListIcon} width='23px' height='23px'></img>
                                </a>
                                <a href="/checkout">
                                    <img src={CartIcon} width='23px' height='23px'></img>
                                </a>
                                <img src={UserIcon} width='23px' height='23px'></img>
                            </li>

                        </ul>
                    </nav>
                </div>

            </div>
        </>
    );
}

export default Header;