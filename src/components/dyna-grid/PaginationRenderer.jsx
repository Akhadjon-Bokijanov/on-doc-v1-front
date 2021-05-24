import React from 'react'
import { useTranslation } from 'react-i18next'
import back_img from "../../images/back-pagination.svg";
import next_img from "../../images/next-pagination.svg";
import "./PaginationRenderer.scss";

const PaginationRenderer = (current, type, originalElement) => {

    //const { t } = useTranslation();

    if(type==='prev'){
        return <button className="pagination-btn back-btn">
            <div><img src={back_img} alt="" /></div>
            <div>{"Назад"}</div>
        </button>
    }
    

    if (type==='next') {
        return <button className="pagination-btn next-btn">
            <div>{"Следующая"}</div>
            <div><img src={next_img} alt="" /></div>
        </button>
    }

    if(type==='page'){
        return <div className="cus-pagination-page-numbers">
            <div>
                {current}
            </div>
        </div>
    }
    return originalElement
    
}

export default PaginationRenderer
