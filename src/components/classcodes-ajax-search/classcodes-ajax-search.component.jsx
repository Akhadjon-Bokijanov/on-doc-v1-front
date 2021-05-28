import React, { useState } from 'react';
import axios from 'axios'
import { Button, Select, Spin } from 'antd';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './classcodes-ajax-search.scss';

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
                class_code: selected
            }
        }).then(data=>{
            console.log(data)
        }).catch(ex=>{
            console.log(ex)
        })
    }

    const optionstag = options.map(d => <Option value={d.classCode} key={d.classCode}>{d.className}</Option>);

    return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8}}>  
        
        {/* <br /> */}
        <Select
            placeholder="Введите код или название товара "
            mode="multiple"
            value={selected}
            autoClearSearchValue={false}
            showSearch={true}
            showArrow={false}
            size="large"
            defaultActiveFirstOption={false}
            filterOption={false}
            onSearch={handleOptionSearch}
            onChange={setSelected}
            style={{ width: 957, marginRight: 8}}
            loading={loading}
            notFoundContent={null}
        >
            {
                optionstag
            }
        </Select>
        
        <Button 
            className="product-add-button"
            type="primary" 
            //style={{marginTop: 10}} 
            onClick={handleAttach}>
                Qo'shish
        </Button>
    </div>
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
})

export default connect(mapStateToProps)(ClasscodeAjaxSearch);






