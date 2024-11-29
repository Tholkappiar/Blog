import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEditorContext } from "../context/EditorContext";
import { API_ROUTES } from "../utils/apiEndpoints";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
    const location = useLocation();
    const isEditorPage =
        location.pathname === "/post" ||
        location.pathname.split("/")[1] === "updateBlog";

    const { editorState } = useEditorContext();

    const { title, post, tags, excerpt } = editorState || {};
    const axiosPrivate = useAxiosPrivate();

    const from = location.state?.page === "editPage";
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    async function publishBlog() {
        try {
            if (from && id) {
                const updateResponse = await axiosPrivate.put(
                    API_ROUTES.BLOG.UPDATE_BLOG(id),
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (updateResponse.status === 200) {
                    navigate("/blogs", { replace: true });
                }
            } else {
                const postResponse = await axiosPrivate.post(
                    API_ROUTES.BLOG.POST_BLOG,
                    {
                        title,
                        post,
                        tags,
                        excerpt,
                    }
                );
                if (postResponse.status === 201) {
                    navigate("/blogs", { replace: true });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            className={`border-2 border-border flex justify-between py-1 px-4 items-center w-3/4 md:1/2 lg:w-1/3 mx-auto rounded-xl my-4 bg-background`}
        >
            <Link to={"/blogs"}>
                <p className="font-Oranienbaum font-bold text-xl mx-2 text-foreground">
                    Th
                </p>
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-8">
                {isEditorPage && (
                    <button
                        className="dark:bg-green-700 bg-green-500 text-foreground text-sm p-1 px-2 rounded-lg font-semibold hover:opacity-70"
                        onClick={publishBlog}
                    >
                        Publish
                    </button>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Header;
