import React from 'react'
import '../../../App.scss'
import {createStructuredSelector} from "reselect";
import {selectKeyUser} from "../../../redux/user/user.selector";
import {connect} from "react-redux";
import {Button, Form, Input, Radio, Select} from "antd";
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import st from './comp_info.module.scss'
import save from '../../../assests/settings/save.svg'
import cancel from '../../../assests/settings/cancel.svg'
const optionsList=[
    {
        value:1,
        label:'andijan'
    },
    {
        value:2,
        label:'namangan'
    },
    {
        value:3,
        label:'nukus'
    }
]
function CompInfo({userKey}) {
    return(
        <>
            {console.log("user",userKey)}
            <Form
                name="e-key"
                // onFinish={handleKeySubmit}
                scrollToFirstError
            >
                <div className={st.block}>
                    <Form.Item name='u_key'>
                        <Radio.Group style={{width:'65%'}}>
                            <Radio >
                                <div style={{padding: 24}}>
                                    <div className='flexible'>
                                        <div>
                                            <div className={'flexible'}>
                                                <p className={'title'}>INN:</p>
                                                <p>{userKey.username}</p>
                                            </div>
                                            <div className={'flexible'}>
                                                <p className={'title'}>Organization:</p>
                                                <p style={{margin: 0}}>{userKey.username}</p>
                                            </div>
                                        </div>
                                        <div style={{marginLeft:'40px'}}>
                                            <div className={'flexible'}>
                                                <p className={'title'}>F.I.O</p>
                                                <p>{userKey.fio}</p>
                                            </div>
                                            <div className={'flexible'}>
                                                <p className={'title'}>Amal qilish muddati</p>
                                                <p style={{marginBottom:'0'}}>2222.22.22</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div className={'flexible'} style={{marginTop:'24px'}}>
                        <div style={{width:'48.5%'}}>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Manzil</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="address">
                                    <Input
                                        size="large"
                                        placeholder="Manzil" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Viloyat</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="region">
                                    <Select
                                        options={optionsList}
                                        size="large"
                                        placeholder="Viloyat" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>OKED</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="oked">
                                    <Input
                                        size="large"
                                        placeholder="OKED" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>MFO</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="mfo">
                                    <Input
                                        size="large"
                                        placeholder="MFO" />
                                </Form.Item>
                            </Form.Item>
                        </div>

                        <div style={{width:'3%'}}></div>

                        <div style={{width:'48.5%'}}>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Director</p></span>

                                <Form.Item
                                    rules={[{required: true}]}
                                    name="director">
                                    <Input
                                        size="large"
                                        placeholder="Director" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Hisob raqam</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="account_number">
                                    <Input
                                        size="large"
                                        placeholder="Hisob raqam" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Director</p></span>
                                <Form.Item
                                    rules={[{required: true}]}
                                    name="name">
                                    <Input
                                        size="large"
                                        placeholder="Director" />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item>
                                <span className="custom-input-label-1"><p className={st.label}>Hisobchi</p></span>

                                <Form.Item
                                    rules={[{required: true}]}
                                    // key="dyna-form-facutura-no"
                                    name="accountant">
                                    <Input
                                        size="large"
                                        placeholder="Account number" />
                                </Form.Item>
                            </Form.Item>
                        </div>
                    </div>
                </div>
                <div className={'flexible'} style={{marginTop:'28px'}}>
                    <Button className={st.save}><img src={save} alt=""/>Сохранить</Button>
                    <Button className={st.cancel}><img src={cancel} alt=""/>Отменить</Button>
                </div>
            </Form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    userKey:selectKeyUser
})
export default connect(mapStateToProps)(CompInfo)