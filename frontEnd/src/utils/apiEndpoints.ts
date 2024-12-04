type ApiRoutes = {
    BASE_URL: string;
    USER: {
        LOGIN: string;
        SIGNUP: string;
        LOGOUT: string;
        GET_PROFILE: string;
    };
    BLOG: {
        GET_ALL_BLOGS: string;
        GET_MY_BLOGS: string;
        GET_BLOG: (id: string) => string;
        POST_BLOG: string;
        UPDATE_BLOG: (id: string) => string;
        DELETE_BLOG: (id: string) => string;
        TOGGLE_BLOG_PUBLISHED: (id: string) => string;
    };
    REFRESH_TOKEN: string;
};

export const API_ROUTES: ApiRoutes = {
    BASE_URL: "https://blogbackend.tholkappiar.me",
    USER: {
        LOGIN: "/user/signin",
        SIGNUP: "/user/signup",
        LOGOUT: "/user/logout",
        GET_PROFILE: "/user/getProfile",
    },
    BLOG: {
        GET_ALL_BLOGS: "/blog/getAllBlogs",
        GET_MY_BLOGS: "/blog/getMyBlogs",
        GET_BLOG: (id: string) => `/blog/${id}`,
        POST_BLOG: "/blog",
        UPDATE_BLOG: (id: string) => `/blog/${id}`,
        DELETE_BLOG: (id: string) => `/blog/${id}`,
        TOGGLE_BLOG_PUBLISHED: (id: string) => `/blog/${id}`,
    },
    REFRESH_TOKEN: "/user/refresh_token",
};
