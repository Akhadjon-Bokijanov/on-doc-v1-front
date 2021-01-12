import React, { useState } from 'react';
import { Row, Col, Input, Select, Form, Switch, Button, Checkbox, DatePicker, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './question-input.style.scss';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { formatsForQuestion, modulesForQuestion } from '../../utils/main';


const { Option } = Select;

const QuestionInput = ({ data:{ name, key, mode} })=>{

    const [answerType, setAnswerType] = useState('radio-group')

    const { t } = useTranslation();

    const onAnswerTypeChange = (type)=>{
        setAnswerType(type);
        console.log(type)
    }

    const addOption = (fields, {add, remove})=>{
        return(
            <div>
                {
                    fields.map(field =>
                    <div 
                    key={field.key} 
                    style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: 10}}
                    >
                        <Form.Item 
                        className="dyna-form-form-item-container"
                        style={{width: mode==='quiz' ? '50%' : '75%', marginBottom: 0}}
                        rules={[{required: true}]}
                        placeholder={ t("forms.opt_lb") }
                        name={[field.name, 'option']}>
                            <Input 
                                className="dyna-form-input-content"
                                prefix={<FontAwesomeIcon icon={['far', answerType === 'radio-group' ? 'circle' : 'square']} />} />
                        </Form.Item>

                        {
                            mode === 'quiz'
                            ? <Form.Item
                            label={ t("forms.is_true") }
                            name={[field.name, 'isTrue']}
                            valuePropName="checked"
                            >
                                <Checkbox />
                            </Form.Item>
                            : null
                        }

                        <MinusCircleOutlined
                            style={{fontSize: 20}}
                            onClick={() => {
                            remove(field.name);
                            }}
                        />

                    </div>)
                }

            <Form.Item>
                <Button
                    style={{marginTop: 10}}
                    type="dashed"
                    onClick={() => {
                        add();
                    }}
                    block
                >
                    <PlusOutlined /> { t("forms.add_opt_btn") }
                </Button>
            </Form.Item>
                
            </div>
        )
    }

    return(
        <div className="question-input-main-container">
            <div className="question-inp-sub-con">

                <Row gutter={[16, 0]}>
                    <Col xs={24} md={16} >
                        <Form.Item
                        className="dyna-form-form-item-container"
                         label= { t("forms.que_lb") }
                         name={[name, 'label']} 
                         initialValue=""
                         rules={[{required: true}]}
                        >
                            <ReactQuill
                                className="dyna-form-input-content" 
                                theme="snow" 
                                modules={modulesForQuestion} 
                                formats={formatsForQuestion} 
                                />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8} >
                        <Form.Item
                            className="dyna-form-form-item-container"
                            label= { t("forms.an_type") }
                            name={[name, 'type']}
                            initialValue="radio-group"
                        >
                            <Select  
                                bordered={false}
                                className="dyna-form-input-content"                           
                                onChange={ onAnswerTypeChange }
                                showSearch
                                placeholder="Answer type..."
                                style={{width: '100%', textAlign: 'left'}}
                            >
                                <Option value="input"><FontAwesomeIcon icon="grip-lines" />  { t("forms.short_text") }</Option>
                                <Option value="text-area"><FontAwesomeIcon icon="align-justify" />  { t("forms.long_text") }</Option>
                                <Option value="checkbox-group"><FontAwesomeIcon icon={['far', "check-square"]} />  { t("forms.multi_choice") }</Option>
                                <Option value="radio-group"><FontAwesomeIcon icon={['far', "dot-circle"]} />  { t("forms.sing_choice") }</Option>
                                <Option value="slider"><FontAwesomeIcon icon="sliders-h" />  { t("forms.lvl_ans") }</Option>
                                <Option value="date"><FontAwesomeIcon icon="calendar-alt" />  { t("forms.dt_ans") }</Option>
                                <Option value="rate"><FontAwesomeIcon icon="star" />  { t("forms.rt_ans") }</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]} >
                    <Col xs={24} md={16}>
                    {
                        (function(){
                            switch(answerType){
                                case 'input':
                                    return <div>
                                        <div><FontAwesomeIcon icon="grip-lines" />  { t("forms.short_text") }</div>
                                        {
                                            mode==='quiz'
                                            ? <Form.Item
                                                className="dyna-form-form-item-container"
                                                label={ t("forms.ent_right") }
                                                name={ [name, 'trueAnswer'] }
                                                key={`dyna-form-item-${key}`}
                                                rules={[{required: true}]}
                                            >
                                                <Input 
                                                    className="dyna-form-input-content"
                                                    style={{width: '100%'}} />
                                            </Form.Item>
                                            : null
                                        }
                                        </div>
                                
                                case 'date':
                                    return <div>
                                        <div><FontAwesomeIcon icon="calendar-alt" />  { t("forms.dt_ans") }</div>
                                        {
                                            mode==='quiz'
                                            ? <Form.Item
                                                className="dyna-form-form-item-container"
                                                label="Enter right answer"
                                                name={ [name, 'trueAnswer'] }
                                                key={`dyna-form-item-${key}`}
                                                rules={[{required: true}]}
                                            >
                                                <DatePicker 
                                                    className="dyna-form-input-content"
                                                    style={{width: '100%'}} />
                                            </Form.Item>
                                            : null
                                        }
                                    </div>

                                case 'rate':
                                    return <div>
                                        <div><FontAwesomeIcon icon="star" />  { t("forms.rt_ans") }</div>
                                        {
                                            mode==='quiz'
                                            ? <Form.Item
                                                className="dyna-form-form-item-container"
                                                label="Enter right answer. Max: 5"
                                                name={ [name, 'trueAnswer'] }
                                                key={`dyna-form-item-${key}`}
                                                rules={[{required: true}]}
                                            >
                                                <InputNumber 
                                                    className="dyna-form-input-content"
                                                    style={{width: '100%'}} />
                                            </Form.Item>
                                        : null
                                        }
                                        </div>

                                case 'radio-group':
                                    return <div>
                                        <FontAwesomeIcon icon={['far', "dot-circle"]} />  { t("forms.sing_choice") }
                                        <div>
                                            <Form.List
                                                name={[name, 'options']}
                                            >
                                                {
                                                    addOption
                                                }
                                            </Form.List>
                                        </div>
                                   
                                    </div>
                                
                                case 'checkbox-group':
                                    return <div>
                                        <FontAwesomeIcon icon={["far", "check-square"]} />  { t("forms.multi_choice") }
                                        <div>
                                            <Form.List
                                                name={[name, 'options']}
                                            >
                                                {
                                                    addOption
                                                }
                                            </Form.List>
                                        </div>
                                    </div>
                                
                                case 'text-area':
                                    return <div><div>
                                        <FontAwesomeIcon icon="align-justify" />  { t("forms.long_text") }
                                    </div>
                                    {
                                        mode==='quiz'
                                        ? <Form.Item
                                            className="dyna-form-form-item-container"
                                            label= { t("forms.ent_right") }
                                            name={ [name, 'trueAnswer'] }
                                            key={`dyna-form-item-${key}`}
                                            rules={[{required: true}]}
                                        >
                                            <Input 
                                                className="dyna-form-input-content"
                                                style={{width: '100%'}} />
                                        </Form.Item>
                                        : null
                                    }
                                    </div>
                                
                                case 'slider':
                                    return <div><div>
                                        <FontAwesomeIcon icon="sliders-h" />  { t("forms.lvl_ans") }
                                    </div>
                                    {
                                        mode==='quiz'
                                        ? <Form.Item
                                            className="dyna-form-form-item-container"
                                            label="Enter right answer. Max: 20"
                                            name={ [name, 'trueAnswer'] }
                                            key={`dyna-form-item-${key}`}
                                            rules={[{required: true}]}
                                        >
                                            <InputNumber 
                                                className="dyna-form-input-content"
                                                style={{width: '100%'}} />
                                        </Form.Item>
                                        : null
                                    }
                                    </div>

                                default: 
                                    return null;
                            }
                        })()
                    }
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item 
                            
                            name={[name, 'required']}
                            valuePropName="checked"
                            initialValue={true}
                            label= { t("forms.is_req_field") }
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Form.Item
                    name={[name, 'name']}
                    initialValue={`question${key}`}
                    >
                        <Input type="hidden" />
                    </Form.Item>
                </Row>
            </div>
        </div>
    )
}

export default QuestionInput;