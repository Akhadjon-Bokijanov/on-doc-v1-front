import React from 'react';
import axios from 'axios'
import { Button, Select, Spin } from 'antd';
import { useState } from 'react/cjs/react.development';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const { Option } = Select;



const ClasscodeAjaxSearch = ({ user })=>{

    const {t} = useTranslation();

    const [selected, setSelected] = useState();
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false)

    const handleOptionSearch = (text) => {
        setLoading(true)
        axios({
            url: `classifications/search?key=${text}`,
            method: "get"
        }).then(res=>{
            console.log(res.data.data)
            setOptions(Array.isArray(res.data.data) ? res.data.data : [])
            setLoading(false)
        }).catch(ex=>{
            console.log(ex);
            setLoading(false)
        })
    

    }

    const handleAttach = ()=>{
        console.log(selected)
        axios({
            url: "classifications/add-products",
            method: "post",
            data: {
                tin: user.tin ?? user.username,
                class_codes: selected
            }
        }).then(data=>{
            console.log(data)
        }).catch(ex=>{
            console.log(ex)
        })
    }

    const optionstag = options.map(d => <Option value={d.classCode} key={d.classCode}>{d.className}</Option>);

    return <div>
        
        <Select
            //size="large"
            //bordered={false}
            //placeholder={ t("Maxsulot izlash") }
            mode="multiple"
            value={selected}
            showSearch
            showArrow={false}
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleOptionSearch}
            onChange={setSelected}
            style={{width: '100%'}}
            loading={loading}
            notFoundContent={null}
        >
            {
                optionstag
            }
        </Select>
        
        <Button 
            type="primary" 
            style={{marginTop: 10}} 
            onClick={handleAttach}>
                Ozingizga yuklash
        </Button>
    </div>
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(ClasscodeAjaxSearch);






