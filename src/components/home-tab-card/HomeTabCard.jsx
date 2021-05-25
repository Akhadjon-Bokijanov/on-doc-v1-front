import React from 'react'
import { Link } from 'react-router-dom';
import "./HomeTabCard.style.scss";

const HomeTabCard = ({ data }) => {
    const { img, count, color, title, link } = data
    return (
        <div className="home-tab-card-container">
            <div className="home-tab-sub-con">
                <div className="top-row-con">
                    <div>
                        <img src={img} alt="img-not found" className={`home-card-img img-${color}`}/>
                        <span className="text-title" style={{fontSize: 18}}>{title}</span>
                    </div>
                    <div className={`color-${color}`} style={{fontSize: 24}}>
                        {count??0}
                    </div>
                </div>
                <div>
                    <Link to={link}>
                        <div className="bottom-link">
                            Перейти
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeTabCard
