import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

const ProfileTabs = ({ match, location }) => {

    const { t } = useTranslation();

    const tabs = [
        {
            title: "Hisob",
            url: "/cabinet/settings/account"
        },
        {
            title: "Xabarnoma",
            url: "/cabinet/settings/notify"
        },
        {
            title: "Maxsulotingiz",
            url: "/cabinet/settings/tab-2"
        },
        {
            title: "Kompaniya ma'lumotlari",
            url: "/cabinet/settings"
        },
        {
            title: "Hujjat formati",
            url: "/cabinet/settings/tab-4"
        }
    ]

    const [activeTab, setActiveTab] = useState(location.pathname)

    return (
        <div style={{ marginBottom: 20 }}>
            <div className="factura-home-list-tabs">
                <div className="factura-home-list-tab-con">
                    {
                        tabs.map(item => <div
                            className={`status-tab-bar ${activeTab === item.url ? 'active-tab' : ""}`}>
                            <Link 
                                onClick={() => setActiveTab(item.url)}
                                style={{display: 'block'}} to={item.url}>
                                {t(item.title)}
                                {console.log(match.url)}
                            </Link>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(ProfileTabs)
