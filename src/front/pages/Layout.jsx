import { Outlet } from "react-router-dom/dist"
import { useEffect } from "react"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { getProfile } from "../services/backendServices.JS"

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { dispatch } = useGlobalReducer();

    useEffect(() => {
        const loadUser = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) return;
            const user = await getProfile();
            if (user) {
                dispatch({ type: "set_user", payload: user });
            } else {
                sessionStorage.removeItem("token");
                dispatch({ type: "logout" });
            }
        };
        loadUser();
    }, []);

    return (
        <ScrollToTop>
            <Outlet />
        </ScrollToTop>
    )
}