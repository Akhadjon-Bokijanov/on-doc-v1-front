import {createStructuredSelector} from "reselect";
import {selectToken} from "../redux/user/user.selector";
import {connect} from "react-redux";
import React from 'react';


const getToken = ({token})=>{
    let tok = token;
    return (
        console.log("token",tok)
    )

}
const mapStateToProps = createStructuredSelector({
    token:selectToken
})
export default connect(mapStateToProps)(getToken)

