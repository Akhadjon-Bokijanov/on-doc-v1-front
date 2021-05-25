import React from 'react'
import { useTranslation } from 'react-i18next';
import "./Btn.styles.scss";
import cancel from '../../assests/settings/cancel.svg';
import calcel1 from "../../images/rounded-cancel.svg";

const CancelBtn = ({ prop }) => {

    const { t } = useTranslation();

    return (
        <button 
            { ...prop }    
            className="btn_cancel">
            <img src={calcel1} alt="" />
                <span className="txt">{t("Cancel") }</span>
        </button>
    )
}

export default CancelBtn
