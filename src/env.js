//ENVIRONMENT VARIABLES
export const API_HOST = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:8000" :
    "https://murmuring-inlet-47691.herokuapp.com";
export const SELF_HOST = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:3000" :
    "https://ondoc.herokuapp.com";

export const IMPORTANCE = {
        1: {color: "#00FF00", text: "Uncha muxim emas"},
        2: {color: "#7FFF00", text: "Muxim emas"},
        3: {color: "#FFAF00", text: "Muxim"},
        4: {color: "#FF6900", text: "Muximroq"},
        5: {color: "#FF0000", text: "O'ta muxim"}
    }