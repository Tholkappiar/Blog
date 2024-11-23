import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <section className="flex-1 flex flex-col">
                <Outlet />
            </section>
            <Footer />
        </main>
    );
};

export default Layout;
