import React from 'react'
import { useTranslation } from 'react-i18next';
import save from '../../assests/settings/save.svg'
import save1 from "../../images/rounded-tick.svg";
import "./Btn.styles.scss";

const SaveBtn = (prop) => {

    const { t } = useTranslation();

    return (
        <button 
            {...prop}
            className="btn_save"> 
            <img src={save1} alt="" 
            
            /> 
            <span className="txt">
                {t("Save") }
            </span>
        </button>
    )
}

export default SaveBtn
