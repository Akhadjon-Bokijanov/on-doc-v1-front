//ENVIRONMENT VARIABLES
export const API_HOST = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:8000" :
    "https://murmuring-inlet-47691.herokuapp.com";
export const SELF_HOST = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:3000" :
    "https://ondoc.herokuapp.com";