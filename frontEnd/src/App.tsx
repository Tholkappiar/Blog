import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./context/AuthProvider";
import PersistantLogin from "./Auth/PersistantLogin";
import NotFound from "./pages/NotFound";
import EditorPage from "./pages/EditorPage";
import { EditorProviderContext } from "./context/EditorContext";

function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

const AppContent = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("Issue in ThemeContext");
    const { isDarkMode } = context;

    return (
        <div className={`${isDarkMode ? "dark" : ""}`}>
            <div className="bg-background dark:bg-darkBackground dark:text-darkPrimary">
                <BrowserRouter>
                    <AuthProvider>
                        <EditorProviderContext>
                            <Routes>
                                <Route element={<Layout />}>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route
                                        path="/signup"
                                        element={<Signup />}
                                    />
                                    <Route element={<PersistantLogin />}>
                                        <Route element={<RequireAuth />}>
                                            <Route
                                                path="/blogs"
                                                element={<Blogs />}
                                            />
                                            <Route
                                                path="/blog/:id"
                                                element={<Blog />}
                                            />
                                        </Route>
                                    </Route>
                                    <Route
                                        path="*"
                                        element={<NotFound />}
                                    ></Route>
                                    <Route
                                        path="/post"
                                        element={<EditorPage />}
                                    />
                                </Route>
                            </Routes>
                        </EditorProviderContext>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </div>
    );
};

export default App;
