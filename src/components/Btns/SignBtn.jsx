import React from 'react'
import { useTranslation } from 'react-i18next';
import sign_icon from "../../images/rounded-tick.svg";

const SignBtn = (prop) => {

    const { t } = useTranslation();

    return (
        <button
            {...prop}
            className="sign_btn_custom">
            <img src={sign_icon} alt=""
            />
            <span className="txt">
                {t("Sign")}
            </span>
        </button>
    )
}

export default SignBtn
