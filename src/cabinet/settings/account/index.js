import React from 'react'
import '../../../App.scss'
import {createStructuredSelector} from "reselect";
import {selectKeyUser} from "../../../redux/user/user.selector";
import {connect} from "react-redux";
import {Button, Form, Input, Radio} from "antd";
import {CheckCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import st from './acc.module.scss'
function Account({userKey}) {
    return(
        <>
            <h2>Сведение:</h2>
            <Form
                name="e-key"
                // onFinish={handleKeySubmit}
                scrollToFirstError
            >
                <Form.Item name='u_key'>
                    <Radio.Group style={{width:'65%'}}>
                        <Radio >
                            <div>
                                <div className='flexible'>
                                    <div>
                                        <div className={'flexible'}>
                                            <p className={'title'}>INN:</p>
                                            <p>{userKey.username}</p>
                                        </div>
                                        <div className={'flexible'}>
                                            <p className={'title'}>Organization:</p>
                                            <p>{userKey.username}</p>
                                        </div>
                                    </div>
                                    <div style={{marginLeft:'40px'}}>
                                        <div className={'flexible'}>
                                            <p className={'title'}>F.I.O</p>
                                            <p>{userKey.fio}</p>
                                        </div>
                                        <div className={'flexible'}>
                                            <p className={'title'}>Amal qilish muddati</p>
                                            <p>2222.22.22</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Radio>
                    </Radio.Group>
                </Form.Item>

                <div className={'flexible'} style={{marginTop:'6%'}}>
                    <div style={{width:'47%'}}>
                        <Form.Item>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="inn">
                                <Input
                                    size="large"
                                    placeholder="INN" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className={'label'}>INN</p></span>
                        </Form.Item>

                        <Form.Item style={{marginTop:'7%'}}>
                            <Form.Item
                                rules={[{required: true}]}
                                name="address">
                                <Input
                                    size="large"
                                    placeholder="Address" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Address</p></span>
                        </Form.Item>
                    </div>

                    <div style={{width:'6%'}}></div>

                    <div style={{width:'47%'}}>
                        <Form.Item>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="director">
                                <Input
                                    size="large"
                                    placeholder="Director" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Director</p></span>
                        </Form.Item>
                        <Form.Item style={{marginTop:'7%'}}>
                            <Form.Item
                                rules={[{required: true}]}
                                // key="dyna-form-facutura-no"
                                name="number">
                                <Input
                                    size="large"
                                    placeholder="Account number" />
                            </Form.Item>
                            <span className="custom-input-label-1"><p className="label">Account number</p></span>
                        </Form.Item>
                    </div>
                </div>
                {console.log('user',userKey)}
                <div className={'flexible'}>
                    <Button className={st.save}><CheckCircleOutlined />Сохранить</Button>
                    <Button className={st.cancel}><PlusCircleOutlined className={`${st.delete_icon} `} />Cancel</Button>
                </div>
            </Form>
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    userKey:selectKeyUser
})
export default connect(mapStateToProps)(Account)