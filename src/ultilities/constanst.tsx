export const apiUrl =
    process.env.REACT_APP_SITE_ENV !== 'production'
        ? 'http://georgedev.net/api'
        : process.env.REACT_APP_PROD_API_URL
export const LOCAL_STORAGE_TOKEN_NAME = 'george-mern'
