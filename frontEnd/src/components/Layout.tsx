import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <section className="flex-1 flex flex-col">
                <Outlet />
            </section>
        </main>
    );
};

export default Layout;
