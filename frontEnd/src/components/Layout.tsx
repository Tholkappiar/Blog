import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <main className="min-h-screen flex flex-col bg-light-grid dark:bg-dark-grid bg-repeat bg-[length:40px_40px]">
            <Header />
            <section className="flex-1 flex flex-col">
                <Outlet />
            </section>
            <Footer />
        </main>
    );
};

export default Layout;
