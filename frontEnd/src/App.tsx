import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Layout from "./components/Layout";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import AuthProvider from "./context/AuthProvider";
import PersistantLogin from "./Auth/PersistantLogin";
import NotFound from "./pages/NotFound";
import EditorPage from "./pages/EditorPage";
import { EditorProviderContext } from "./context/EditorContext";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="theme">
            <AppContent />
        </ThemeProvider>
    );
}

const AppContent = () => {
    return (
        <div className="bg-background dark:bg-darkBackground dark:text-darkPrimary">
            <BrowserRouter>
                <AuthProvider>
                    <EditorProviderContext>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route element={<PersistantLogin />}>
                                    <Route path="/blogs" element={<Blogs />} />
                                    <Route
                                        path="/blog/:id"
                                        element={<Blog />}
                                    />
                                    <Route element={<RequireAuth />}>
                                        <Route
                                            path="/UpdateBlog/:id"
                                            element={<EditorPage />}
                                        />
                                        <Route
                                            path="/post"
                                            element={<EditorPage />}
                                        />
                                        <Route
                                            path="/myBlogs"
                                            element={<Blogs />}
                                        />
                                    </Route>
                                </Route>
                                <Route path="*" element={<NotFound />}></Route>
                            </Route>
                        </Routes>
                    </EditorProviderContext>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
};

export default App;
