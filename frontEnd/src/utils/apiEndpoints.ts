type ApiRoutes = {
    BASE_URL: string;
    USER: {
        LOGIN: string;
        SIGNUP: string;
    };
    BLOG: {
        GET_ALL_BLOGS: string;
        GET_BLOG: (id: string) => string;
        POST_BLOG: string;
        UPDATE_BLOG: string;
        DELETE_BLOG: (id: string) => string;
    };
    REFRESH_TOKEN: string;
};

export const API_ROUTES: ApiRoutes = {
    BASE_URL: "http://localhost:8787/api/v1",
    USER: {
        LOGIN: "/user/signin",
        SIGNUP: "/user/signup",
    },
    BLOG: {
        GET_ALL_BLOGS: "/blog/getAllBlogs",
        GET_BLOG: (id: string) => `/blog/${id}`,
        POST_BLOG: "/blog",
        UPDATE_BLOG: "/",
        DELETE_BLOG: (id: string) => `/blog/${id}`,
    },
    REFRESH_TOKEN: "/user/refresh_token",
};
