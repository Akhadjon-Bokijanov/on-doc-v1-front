import React from "react";
import i18n from "../translate";

export const get_home_config = doc => {

    const t = i18n.t.bind(i18n)

    switch (doc) {

        case "user-products":
            return {
                title: t("Maxsulotlarim"),
                createTitle: t("Maxsulotlarni yuklash"),
                gridSourceUrl: "/classifications/index",
                createUrl: "/cabinet/products",
                gridConfig: {
                    deleteRequestPath: 'classifications/delete',
                    deleteConfirmText: t("Shu productni ochirilsinmi?"),
                    actions: {
                        delete: true,
                    },
                    allColumns: [{
                        title: t("Katalog kodi"),
                        dataIndex: 'groupCode',
                        isSearchable: true,
                        width: 200
                    },
                    {
                        title: t("Klass kodi"),
                        dataIndex: 'classCode',
                        isSearchable: true,
                        width: 200
                    },
                    {
                        title: t("Nomi"),
                        dataIndex: 'className',
                        isSearchable: true,
                        width: 300,
                        

                    },
                    ]
                }
            }

        case 'notification':
            return {
                title: "Notifications",
                createTitle: "Notification yaratish",
                createUrl: "/admin/notification/create",
                gridSourceUrl: "/api/v1/notifications",
                gridConfig: {
                    deleteRequestPath: 'api/v1/notifications',
                    viewActionPath: '/admin/notification/view',
                    editActionPath: '/admin/notification/edit',
                    deleteConfirmText: "Shu notification ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Sarlavha",
                            dataIndex: 'title_uz',
                            isSearchable: true,
                            width: 300
                        },
                        {
                            title: "Mazmuni",
                            dataIndex: 'body_uz',
                            isSearchable: true,
                            width: 400
                        },
                        {
                            title: "Muhimligi",
                            dataIndex: 'importance',
                            isFilterable: true,
                            width: 100,
                            filters: [
                                { value: 1, text: "1 - Uncha muxim emas" },
                                { value: 2, text: "2 - Muxim emas" },
                                { value: 3, text: "3 - Muxim" },
                                { value: 4, text: "4 - Muximroq" },
                                { value: 5, text: "5 - O'ta muxim" },
                            ]

                        },
                        {
                            title: "Holati",
                            dataIndex: "isActive",
                            isFilterable: true,
                            width: 100,
                            filters: [
                                { value: 0, text: "Aktiv emas" },
                                { value: 1, text: "Aktiv" },
                            ]
                        }
                    ]
                }
            }

        case 'act':
            return {
                title: "Aktlar",
                createTitle: "Akt yaratish",
                createUrl: "/cabinet/act/create",
                gridSourceUrl: "/api/v1/acts",
                gridConfig: {
                    deleteRequestPath: 'api/v1/atcs',
                    viewActionPath: '/cabinet/act/view',
                    editActionPath: '/cabinet/act/edit',
                    deleteConfirmText: "Shu akt ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Akt №",
                            dataIndex: 'actNo',
                            isSearchable: true,
                        },
                        {
                            title: "Kontrkt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        case 'contract':
            return {
                title: "Shartnomalar",
                createTitle: "Shartnoma yaratish",
                createUrl: "/cabinet/contract/create",
                gridSourceUrl: "/api/v1/contracts",
                gridConfig: {
                    deleteRequestPath: 'api/v1/contracts',
                    viewActionPath: '/cabinet/contracts/view',
                    editActionPath: '/cabinet/contract/edit',
                    deleteConfirmText: "Shu kontrakt ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Kontrkt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        case "empowerment":
            return {
                title: "Ishonchnomalar",
                createTitle: "Ishonchnoma yaratish",
                createUrl: "/cabinet/empowerment/create",
                gridSourceUrl: "/api/v1/empowerments",
                gridConfig: {
                    deleteRequestPath: 'api/v1/empowerments',
                    viewActionPath: '/cabinet/empowerment/view',
                    editActionPath: '/cabinet/empowerment/edit',
                    deleteConfirmText: "Shu ishonchnoma ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Ishonchnoma №",
                            dataIndex: 'empowermentNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Kontrakt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        case 'tty':
            return {
                title: "Tovar transport yo'lxati",
                createTitle: "TTY yaratish",
                createUrl: "/cabinet/tty/create",
                gridSourceUrl: "/api/v1/ttys",
                gridConfig: {
                    deleteRequestPath: 'api/v1/ttys',
                    viewActionPath: '/cabinet/tty/view',
                    editActionPath: '/cabinet/tty/edit',
                    deleteConfirmText: "Shu TTY ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "TTY №",
                            dataIndex: 'wayBillNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'state',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }


        default:
            return {
                title: t("Hisob fakturalar"),
                createTitle: t("Faktura yaratish"),
                createUrl: "/cabinet/factura/create",
                gridSourceUrl: "/api/v1/facturas",
                gridConfig: {
                    deleteRequestPath: 'api/v1/facturas',
                    viewActionPath: '/cabinet/factura/view',
                    editActionPath: '/cabinet/factura/edit',
                    deleteConfirmText: t("Shu faktura ochirilsinmi?"),
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: t("Faktura №"),
                            dataIndex: 'facturaNo',
                            isSearchable: true,
                        },
                        {
                            title: t("Kontrakt №"),
                            dataIndex: 'contractNo',
                            isSearchable: true,
                        },
                        {
                            title: t("Kontragent"),
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: t("Kontragent") + " " + t("STIR"),
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: t("Holati"),
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: t('Yaratilgan sana'),
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }
    }
}