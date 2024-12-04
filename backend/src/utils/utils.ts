export const REFRESH_TOKEN_EXPIRATION = 60 * 1; // 60 * 60 * 24 * 7
export const ACCESS_TOKEN_EXPIRATION = 30;

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
}
