import React from "react";
import { Navbar, MobileNav, Typography, Avatar, IconButton, Button } from "@material-tailwind/react";
import NavList from "./NavList";
import { MdMenuOpen, MdOutlineClose, MdAccountCircle } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";


export default function Nav() {
    const auth = getAuth();

    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        setUser(auth.currentUser)
    })

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const onLogout = () => {
        auth.signOut();
        navigate("/")
        setUser(null)
    }

    return (

        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 md:my-2">
            <div className="container  mx-auto flex items-center justify-between ">
                <Typography
                    as="a"
                    href="#"
                    variant="large"
                    className="mr-4 cursor-pointer py-1.5  text-secondary-dark"
                >
                    <span>Buy/sell</span>
                </Typography>
                <div className="hidden lg:block"><NavList /></div>

                <div className="flex gap-4">
                    <IconButton
                        variant="text"
                        className={pathname === "/profile" ? "hidden lg:block cursor-pointer text-primary-medium " : "hidden lg:block cursor-pointer text-dark "}
                        onClick={() => navigate("/profile")} >
                        <MdAccountCircle size={32} /> {user ? user.displayName : null}
                    </IconButton>
                    {user && <Button onClick={onLogout} className="bg-secondary-light">Log Out</Button>}
                    {/* {!user && <Button onClick={() => navigate("/sign-in")} className="bg-primary-light">Log In</Button>} */}

                </div>


                <MdMenuOpen variant="text" onClick={() => setOpenNav(!openNav)} className="ml-auto h-6 w-6 text-dark  focus:bg-transparent active:bg-transparent lg:hidden " >
                    {openNav ? (
                        < MdMenuOpen />
                    ) : (
                        < MdOutlineClose />
                    )}
                </MdMenuOpen>

            </div>
            <MobileNav open={openNav}>
                <NavList />
                <Avatar alt="avatar" variant="circular" />

            </MobileNav>
        </Navbar>

    );
}