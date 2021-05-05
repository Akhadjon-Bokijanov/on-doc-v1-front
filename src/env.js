//ENVIRONMENT VARIABLES
// @Co%nD$a2Oems^+
export const API_HOST = process.env.NODE_ENV === "development" ?
    "http://api.onlinefactura.uz/uz" :
    "http://api.onlinefactura.uz/uz";
export const SELF_HOST = process.env.NODE_ENV === "development" ?
    "http://127.0.0.1:3000" :
    "https://new.onlinefactura.uz";

export const PROVIDER = {
    providerTin: "306717486",
    providerName: "ООО Lanbir servis",
    systemName: "OnlineFactura.Uz",
    enabled: true
}

export const IMPORTANCE = {
        1: {color: "#00FF00", text: "Uncha muxim emas"},
        2: {color: "#7FFF00", text: "Muxim emas"},
        3: {color: "#FFAF00", text: "Muxim"},
        4: {color: "#FF6900", text: "Muximroq"},
        5: {color: "#FF0000", text: "O'ta muxim"}
    }