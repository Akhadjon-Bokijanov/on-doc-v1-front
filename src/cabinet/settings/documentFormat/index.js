import React from "react";
import {Form, Select, Table} from "antd";
import st from './docFormat.module.scss'
import delIcon from '../../../assests/settings/delete.svg';
const {Option}=Select;
const data = [
    {
        id:1,name:"srgedt",
    },
    {
        id:2,name:"swrevswrv",
    },
    {
        id:3,name:"8i;dffffffffff",
    },
]
export default function DocFormat() {
    return(
        <>
            <div className={st.block}>
                <div className={'w50'} >
                    <Form>
                            <p className={st.title}>Выберите формат документов</p>
                            <Form.Item>
                                <Select allowClear style={{width:'48%'}} size={'large'} placeholder={'Список специализации'}>
                                    <Option value={1}>aaaf</Option>
                                    <Option value={2}>bbbe</Option>
                                    <Option value={3}>cccd</Option>
                                    <Option value={4}>dddb</Option>
                                    <Option value={5}>eeeb</Option>
                                    <Option value={6}>fffa</Option>
                                </Select>
                            </Form.Item>
                    </Form>
                </div>
                <div style={{marginTop:'34px'}}>
                    <table>
                        <thead>
                        <tr>
                            <td style={{width:'6%',padding:'11px 16px'}}>№</td>
                            <td style={{width:'30%',padding:'11px 16px'}}>Название формата документа</td>
                            <td style={{width:'15%',float:'right'}}></td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map((item,index)=>(
                                <tr key={index}>
                                    <td style={{width:'6%'}}>{index+1}</td>
                                    <td style={{width:'30%'}}>{item.name}</td>
                                    <td className={st.td_action}><img src={delIcon} alt=""/> delete</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}