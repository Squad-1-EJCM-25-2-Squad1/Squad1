import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "../pages/home";
import Product from "../pages/product";
import Sales from "../pages/sales";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import { AuthContextProvider } from "../contexts/Auth.Context";
import { RequireAuth } from "../auth/requireAuth";

export default function AppRoutes() {
    return(
        <Router>
            <AuthContextProvider>
                <Routes>
                    <Route element={<RequireAuth/>}>
                        <Route element={<Home/>} path="/"/>
                    </Route>
                    <Route element={<Sales/>} path="/sales"/>
                    <Route element={<Product/>} path="/product"/>
                    <Route element={<SignIn/>} path="/login"/>
                    <Route element={<SignUp/>} path="/signup"/>
                </Routes>
            </AuthContextProvider>
        </Router>
    )
}