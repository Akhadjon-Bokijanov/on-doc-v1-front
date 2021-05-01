import React from 'react';
import {createStructuredSelector} from "reselect";
import {selectToken} from "../redux/user/user.selector";
import {connect} from "react-redux";


const GetToken = ({token})=>{
    // let tok = token;
    return (
        <div>
            {token}
            {console.log("gettoken",token)}
        </div>
)

}
const mapStateToProps = createStructuredSelector({
    token:selectToken
})
export default connect(mapStateToProps)(GetToken)

