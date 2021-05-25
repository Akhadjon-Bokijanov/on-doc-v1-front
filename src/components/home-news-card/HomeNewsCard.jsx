import React from 'react'
import { useTranslation } from 'react-i18next'
import moment from "moment";
import katta_kichik from "../../images/katta-kichik.svg";
import Paragraph from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';

const HomeNewsCard = () => {

    const { t } = useTranslation();
    const style={
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize:'16px',
    lineHeight: '24px',
    color: '#303030'
    }
    return (
        <div style={{backgroundColor: "#fff", borderRadius: 8}}>
            <div style={{padding: 24}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                    <div style={{ display: 'flex', alignItems: "center" }}>
                        <div style={{fontSize: 24, fontWeight: 700, color: '#303030', marginRight: 24}}>
                            {t("Yangiliklar")}
                        </div>
                        <div style={{marginRight: 16}}>
                            {moment().format("MMMM Do | dddd, H:mm") }
                        </div>
                        <span style={{ color: "#FE346E"}}>
                            {t("muxim")}
                        </span>
                    </div>
                
                    <span>
                        <img src={katta_kichik} alt=""/>
                    </span>
                </div>

            <Paragraph ellipsis={{rows: 2 }}>
                <span style={style}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus cras felis ac aliquet consectetur dignissim. Arcu id vitae lectus iaculis.  Рellentesque ultricies nullam donec at sit. Malesuada enim lectus turpis massa massa nulla tincidunt a a. Nibh venenatis ac, ac eget feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Metus cras felis ac aliquet consectetur dignissim. Arcu id vitae lectus iaculis.  Рellentesque ultricies nullam donec at sit. Malesuada enim lectus turpis massa massa nulla tincidunt a a. Nibh venenatis ac, ac eget feugiat.</span>
            </Paragraph>

                <div style={{ textAlign: "right", }} >
                    <Link to="/home/news/{news_id}" style={{ color: "#2B63C0", fontSize: 15}} >
                        {t("O'qish")}
                    </Link>
                </div>
                

            </div>
        </div>
    )
}

export default HomeNewsCard
