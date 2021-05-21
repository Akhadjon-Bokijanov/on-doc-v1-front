import React from 'react';
import { withRouter } from 'react-router-dom';
import { 
    InboxOutlined, 
    LockOutlined,
     PlusOutlined, 
     MinusCircleOutlined, 
     DeleteOutlined } from '@ant-design/icons'
import { createStructuredSelector } from 'reselect';
//import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { modules, formats, getFileExtension } from '../../utils/main';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, {Quill} from 'react-quill';
import { ImageDrop } from 'quill-image-drop-module';
import axios from 'axios';
import './dyna-form.style.css';
//import { triggerFetchStart, triggerActionWithPayload, sendNotification } from '../../redux/admin/admin.actions';
import QuestionInput from '../question-input/question-input.component';
import Ripples from 'react-ripples';
import { useTranslation } from 'react-i18next';
import { 
    Form, 
    Input, 
    Button, 
    Select, 
    Checkbox, 
    message, 
    Upload, 
    InputNumber, 
    Slider, 
    Space, 
    DatePicker, 
    Radio,
    Switch,
    Rate} from 'antd';
import RichTextParser from '../rich-text-parser/rich-text-parser.component';
import CustomCard from '../custom-card/custom-card.component';
//import { setExerciseScore, setExerciseAnswers } from '../../redux/user/user.actions';

const { Option } = Select;

const DynaForm = ({
    creator,                        //Creator of the form, usually not needed, "for exercice"
    fileRoute,                      //To specify file route eg: news, exercise, avatar
    initialValues,                  //This is initial values of form when update action
    config: {                       //config should be provided 
        sendRequestWithId,          //boolen value, 
                                    //defines whether (PATCH) request have to be sent with _id of the editing element
        
        sendNestedObj,              //Sends nested object, in this case coreObjName is required!
        sendFileObj,                //Boolean value to send file info as object : {fileSize, fileName, fileType}, or just string of file name
        coreObjName,                //Core obj name of the nested object
        needCancel,                 //boolean value, whether to show cancel bottom
        title,                      //title of the container card 
        apiRequestPath,             //API path to carry out the action
        content,                    //content of the data send to API server, can be : "multipart/form-data" | "application/json"
        action,                     //action to API server, can be: "POST", "PATCH", 
        triggerAction,              //Redux action to carry out after getting 200 responce
        triggerActionWithPayload,   //Redux action with payload which consumes "res" from the API action
        customTriggerWithPayload,   //Redux action to trigger with given payload
        payload,                    //Payload to trigger custom redux action
        removeSubmitBtn,            //To remove sumbit button
        altSubmitBtn,               //Alternative submit btn
        redirectUrl,                //Redirect url for customBtn on click
        attachTitle,                //Boolean value wheather to attach title to triggerActionWIthFormVal
        checkScore,                 //Boolean value wheather to check score, used in exercises!
        triggerActionWIthFormVal,   //Action name to trigger with form values
        inputFields,                //Array of input fields:
                                    //  [
                                    //      type:   "input" | 
                                    //              "date" | 
                                    //              "input-number" | 
                                    //              "select-search" | 
                                    //              "text-area" | 
                                    //              "drag-drop" | 
                                    //              "slider" | 
                                    //              "rich-text" | 
                                    //              "check-box" | 
                                    //              "input-password" | 
                                    //              "input-confirm-password" 
                                    //      label: label of the input
                                    //      name: name of the input field
                                    //      required: boolean value
                                    //      
                                    //      options: if input select-search
                                    //      
                                    //  ]
                                    //  if type is form-list
                                    //  [
                                    //      type: "from-list"
                                    //      name: name of the object field
                                    //      inputFields: array of input fields in a row
                                    //  ]
    },
    triggerActionOnly,              //This is provided by the comoponent itself
    triggerActionWithRes,           //This is provided by the comoponent itself
    currentUser,                    //This is provided by the comoponent itself
    sendNotif,                      //Send accoount service
    setScore,                       //Sets the solved exercise score
    setAnswers,                     //Sets the values of form to user exercise answers
    history,                        //This is provided by the comoponent itself
})=>{
    
    //Trnaslator function
    const { t } = useTranslation();

    //#region layout & required
    const layout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
        
    Quill.register('modules/imageDrop', ImageDrop);

    const validateMessages = {
        required: t("forms.val_mes"),
        types: {
            email: t("forms.invalid_inp_mes"),
            number: t("forms.invalid_inp_mes"),
        },
        number: {
            range: t("forms.invalid_inp_mes"),
        },
    };
    //#endregion

    //#region file action
    const normFile = e => {
        console.log('Upload event:', e);
      
        if (Array.isArray(e)) {
          return e;
        }
      
        return e && e.fileList;
      };
    
    //#endregion
    

    const [loading, setLoading] = React.useState(false)
    //#region onFinish action
    const onFinish = async values =>{

        
        
        console.log("Dyna form values", values)
        
        if(altSubmitBtn){
            attachTitle
            ? triggerActionWithRes(triggerActionWIthFormVal, {...values, attchedTitle: `${currentUser.firstName} ${currentUser.lastName} - ${title}`})
            : triggerActionWithRes(triggerActionWIthFormVal, values)

            // if(checkScore){
            //     const score = checkExerciseScore(inputFields, values);
            //     const totalQues = inputFields.length;

            //     //Redux actions
            //     setScore(score.total);
            //     setAnswers(values)
            //     //end actions

            //     try {
            //         axios({
            //             method: "post",
            //             url: `ES/api/exercises/answer/${currentUser._id}`,
            //             data: {
            //                 title: `${currentUser.firstName} ${currentUser.lastName} - ${title}. Score: ${score.total} / ${totalQues}`,
            //                 score: score.total,
            //                 _id: initialValues._id
            //             }
            //         });
    
            //         sendNotif({
            //             receiver: creator._id,
            //             sender: {
            //                 _id: currentUser._id,
            //                 fullName: `${currentUser.firstName} ${currentUser.lastName}`,
            //                 avatar: currentUser.avatar,
            //             },
            //             message: `${currentUser.firstName} ${currentUser.lastName} - ${title}. Score: ${score.total} / ${totalQues}`
            //         })


            //     } catch (error) {
            //         console.log(error)
            //     }
                
            // }

            if(redirectUrl) history.push(redirectUrl);
        }
        else{
            try {
                setLoading(true)
            
            
            let hasFile = false;
            let file = null;
            let fileFieldName = "";
            let fileType="";
            let fileSize=0;
            let fileExtension = ""

        
            if(content.toLowerCase() ==='multipart/form-data'){          

                inputFields.forEach( inputField =>
                {
                    if(inputField.type==='drag-drop'){
                        fileFieldName = inputField.name
                    
                    }

                    if(inputField.type==='drag-drop' && !!values[inputField.name]){

                        hasFile = true;
                        file = values[inputField.name][0].originFileObj;
                        fileSize = values[inputField.name][0].size;
                        fileType = values[inputField.name][0].type;
                        fileExtension = getFileExtension(values[inputField.name][0].name)
                    }

                    if(Array.isArray(fileFieldName) && !!values[fileFieldName[0]][fileFieldName[1]]){
                        hasFile = true;
                        file = values[fileFieldName[0]][fileFieldName[1]][0].originFileObj;
                        fileSize = values[fileFieldName[0]][fileFieldName[1]][0].size;
                        fileType = values[fileFieldName[0]][fileFieldName[1]][0].type;
                        fileExtension = getFileExtension(values[fileFieldName[0]][fileFieldName[1]][0].name)   
                    }
                })
            } 

            console.log(hasFile, fileFieldName);

            const s3Config = hasFile 
            ? await axios({
                url: "ES/api/upload",
                method: "post",
                data: {
                    route: fileRoute,
                    contentType: fileType,
                    size: fileSize,
                    type: fileExtension
                }
            })
            : null;

            if(hasFile){
                
                //#region AWS S3 bucket file upload
                await axios.put(s3Config.data.url, file, {headers:{ 
                    "Content-Type": fileType
                    }
                })
                .then(res =>{
                    message.success("File is uploaded!")
                })
                .catch(err=>{
                    console.error(err);
                    message.error("Fail to upload file!")
                })

                //#endregion S3 file upload
            }

            
            let data = { ...values, creatorId: currentUser._id, creator: { _id: currentUser._id } }

            if(hasFile && sendFileObj){
                data[fileFieldName] = {
                    fileName:s3Config.data.key,
                    fileSize: fileSize,
                    fileType: fileType,
                    extension: fileExtension
                };
            }
            else if(hasFile){
                data["size"] = fileSize;
                data[fileFieldName] = s3Config.data.key
            }
            else{
                data[fileFieldName] = undefined
            }

            action.toLowerCase() === 'post'
            ? axios.post(`/${apiRequestPath}${sendRequestWithId ? '/' + initialValues._id : ''}`,
            data,
            {headers: {
                "Content-Type": 'application/json'
            }})
            .then(res=>{
                message.success(`${title} is inserted!`)

                //to trigget action itselft or with payload
                if(!!triggerAction){
                    triggerActionOnly(triggerAction)
                }

                if(!!customTriggerWithPayload && !!payload){
                    triggerActionWithRes(customTriggerWithPayload, payload)
                }

                if(!!triggerActionWithPayload){
                    triggerActionWithRes(triggerActionWithPayload, res)
                }

                setLoading(false);
            })
            .catch(err=>{
                message.error('Failed to insert!')
                console.log(err)
                setLoading(false);
            })
            : axios.patch(`/${apiRequestPath}${sendRequestWithId ? '/' + initialValues._id : ''}`,
            data,
            {headers: {'Content-Type': 'application/json'}})
            .then(res=>{
                message.success(`${title} is updated!`)

                //to trigget action itselft or with payload
                if(!!triggerAction){
                    triggerActionOnly(triggerAction)
                }

                if(!!triggerActionWithPayload){
                    triggerActionWithRes(triggerActionWithPayload, res)
                }

                setLoading(false);
            })
            .catch(err=>{
                message.error('Failed to update!')
                console.log(err.message)
                setLoading(false);
            })
            } catch (error) {
                console.log(error);
                setLoading(false)
                message.error("Something is wrong!")
            }
        }        
        
    }

    //#endregion

    const colors = ['blue', 'red', 'purple', 'green', 'orange', 'pink']
    const ranNum = Math.round(Math.random()*5)  

    return(
    <CustomCard 
        color={colors[ranNum]}
        title={`${title}`}>
        <Form
            initialValues={ initialValues }
            { ...layout }
            name="nest-messages"
            scrollToFirstError
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            {
                inputFields.map((inputField, index)=>{

                    switch(inputField.type){

                        case 'input-number':
                            return <Form.Item 
                                        className="dyna-form-form-item-container"
                                        label={<RichTextParser text={inputField.label} />}
                                        key={`dyna-form-item-${index}`}
                                        name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                        rules={[{required: inputField.required}]}>
                                    <InputNumber className="dyna-form-input-content" style={{width: '100%'}} placeholder={`Enter ${inputField.name}`} />
                                </Form.Item>

                        case 'rate': 
                            return <Form.Item 

                                label={<RichTextParser text={inputField.label} />}
                                key={`dyna-form-item-${index}`}
                                name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                rules={[{required: inputField.required}]}>
                            <Rate />
                        </Form.Item>

                        case 'input':
                            return <Form.Item 
                                    className="dyna-form-form-item-container"
                                    label={ <RichTextParser text={inputField.label} /> }
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    rules={[{required: inputField.required}]}>
                                        <Input 
                                        className="dyna-form-input-content" 
                                        placeholder={`Enter ${inputField.name}`} bordered={false} />
                                </Form.Item>

                        case 'hidden':
                            return <Form.Item 
                                    className="dyna-form-form-item-container"
                                    label={ <RichTextParser text={inputField.label} /> }
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    rules={[{required: inputField.required}]}>
                                        <Input 
                                        type="hidden"
                                        initialValue={inputField.initialValue}
                                        className="dyna-form-input-content" 
                                        placeholder={`Enter ${inputField.name}`} bordered={false} />
                                </Form.Item>
                                                
                        case 'select-search':
                            return <Form.Item 
                                    label={<RichTextParser text={inputField.label} />}
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    className="dyna-form-form-item-container"
                                    rules={[{required: inputField.required}]}>
                                        <Select
                                        initialValue={inputField.initialValue ? inputField.initialValue : null}
                                        mode={inputField.mode}
                                        bordered={false}
                                        className="dyna-form-input-content" 
                                        showSearch
                                        placeholder={`Select ${inputField.name}...`}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }>
                                            {
                                                inputField.options.map((category, index) => 
                                                <Option value={category.option ? category.option.value : category.value} key={`category-${index}`}>
                                                    {category.option ? category.option.demo : category.demo}
                                                </Option>)
                                            }
                                        </Select>
                                    </Form.Item>
                        
                        case 'text-area': 
                            return <Form.Item
                                    className="dyna-form-form-item-container"
                                    label={<RichTextParser text={inputField.label} />}
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    rules={[{required: inputField.required}]}>
                                        <Input.TextArea className="dyna-form-input-content" placeholder={`Enter ${inputField.name}`} rows={3} />
                                    </Form.Item>
                                
                        case 'drag-drop':
                            return <Form.Item 
                                label={<RichTextParser text={inputField.label} />}
                                key={`dyna-form-item-${index}`}
                                >
                                    <Form.Item 
                                    label={<RichTextParser text={inputField.label} />}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    rules={[{required: inputField.required}]}
                                    valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                    <Upload.Dragger name="files" action={`/`}>
                                        <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                        </p>
                                        <p className="ant-upload-text">{ t("forms.drag_dr_text") }</p>
                                        <p className="ant-upload-text">{ t("forms.file_rule") }</p>
                                    </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>

                        case 'rich-text':
                            return <Form.Item 
                                    className="dyna-form-form-item-container"
                                    label={<RichTextParser text={inputField.label} />}
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    initialValue={`${action==='post' ? !!inputField.placeholder ? inputField.placeholder : ""  : ""}`}
                                    rules={[{required: inputField.required}]}>
                                        <ReactQuill
                                            className="dyna-form-input-content" 
                                            theme="snow" 
                                            modules={modules} 
                                            formats={formats} 
                                            />
                                </Form.Item>
                        
                        case 'check-box':
                            return <Form.Item 
                                    label={<RichTextParser text={inputField.label} />}
                                    key={`dyna-form-item-${index}`}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    valuePropName="checked"
                                    rules={[{required: inputField.required}]}>
                                        <Checkbox />
                                </Form.Item>
                        
                        case 'input-password':
                            return <Form.Item
                                    label={<RichTextParser text={inputField.label} />}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    className="dyna-form-form-item-container"
                                    key={`dyna-form-item-${index}`}
                                    rules={[{ required: true, message: 'Please input your Password!' }]}
                                        >
                                        <Input.Password
                                        className="dyna-form-input-content" 
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                        />
                                    </Form.Item>
                        
                        case 'input-confirm-password':
                            return <div key={`input-password-container-${index}`} >
                                        <Form.Item
                                            className="dyna-form-form-item-container"
                                            key={`dyna-form-item-${index}`}
                                            label={<RichTextParser text={inputField.label} />}
                                            name={inputField.name}
                                            rules={[{ required: true, message: 'Please input your Password!' }]}
                                            >
                                            <Input.Password
                                            className="dyna-form-input-content" 
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="Password"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            className="dyna-form-form-item-container"
                                            key={`dyna-form-item-${index}-confirm`}
                                            name={`${inputField.name}-confirm`}
                                            dependencies={[inputField.name]}
                                            hasFeedback
                                            rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                if (!value || getFieldValue(inputField.name) === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('The two passwords that you entered do not match!');
                                                },
                                            }),
                                            ]}
                                        >
                                            <Input.Password 
                                                prefix={<LockOutlined />}
                                                className="site-form-item-icon dyna-form-input-content" 
                                                placeholder="Confirm password"
                                                />
                                        </Form.Item>
                                    </div>

                        case 'slider':
                            return <Form.Item
                                        label={<RichTextParser text={inputField.label} />}
                                        name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                        key={`dyna-form-item-${index}`}
                                        rules={[{required: inputField.required}]}>
                                            <Slider 
                                                style={{width: 200}} 
                                                min={inputField.min | 0} 
                                                max={inputField.max | 20} />
                                    </Form.Item>
                        
                        case 'date': 
                            return <Form.Item
                                    className="dyna-form-form-item-container"
                                    label={<RichTextParser text={inputField.label} />}
                                    name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                    key={`dyna-form-item-${index}`}
                                    rules={[{required: inputField.required}]}
                                >
                                    <DatePicker 
                                        className="dyna-form-input-content"
                                        style={{width: '100%'}} />
                            </Form.Item>

                        case 'checkbox-group':
                            return <Form.Item
                            
                            label={<RichTextParser text={inputField.label} />}
                            key={`dyna-form-item-${index}`}
                            name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                            rules={[{required: inputField.required}]}
                        >
                            <Checkbox.Group>
                                {
                                    inputField.options.map((category, index) =>
                                    <Checkbox 
                                        value={category.option ? category.option : category} 
                                        key={`category-${index}`} 
                                        style={{display: 'block', marginLeft: 8, lineHeight: '1.5em'}}
                                        >
                                        { category.option ? category.option : category }
                                        </Checkbox>)
                                }
                            </Checkbox.Group>
                        </Form.Item>

                        case 'radio-group':
                            return <Form.Item
                                
                                label={<RichTextParser text={inputField.label} />}
                                key={`dyna-form-item-${index}`}
                                name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                rules={[{required: inputField.required}]}
                            >
                                <Radio.Group>
                                    {
                                        inputField.options.map((category, index) =>
                                        <Radio 
                                            value={category.option ? category.option : category} 
                                            key={`category-${index}`} 
                                            style={{display: 'block', marginLeft: 8, lineHeight: '1.5em'}}
                                            >
                                            { category.option ? category.option : category }
                                        </Radio>)
                                    }
                                </Radio.Group>
                            </Form.Item>

                        case 'switch':
                            return <Form.Item
                                        label={<RichTextParser text={inputField.label} />}
                                        name={ sendNestedObj ? [coreObjName, inputField.name ] : inputField.name}
                                        valuePropName="checked"
                                        key={`dyna-form-item-${index}`}
                                        rules={[{required: inputField.required}]}>
                                            <Switch />
                                    </Form.Item>
                        
                        case 'form-list':
                            return <Form.List 
                                        name={inputField.name}
                                        key={`dyna-form-item-${index}`}>
                                            {
                                                (fields, {add, remove})=>{
                                                    return (
                                                        <div key={`form-list-${index}`}>
                                                            {
                                                                fields.map(field=>(
                                                                    <Space 
                                                                        key={field.key} 
                                                                        style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 8}} 
                                                                        align="center">
                                                                           {inputField.inputFields.map(nestedField=>{
                                                                               switch(nestedField.type){

                                                                                case 'input-number':
                                                                                    return <Form.Item
                                                                                    className="dyna-form-form-item-container"
                                                                                                {...field} 
                                                                                                label={nestedField.label}
                                                                                                name={[field.name, `${nestedField.name}`]}
                                                                                                rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                                fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                            <InputNumber 
                                                                                            className="dyna-form-input-content"
                                                                                            style={{width: '100%'}} />
                                                                                        </Form.Item>
                                                        
                                                                                case 'input':
                                                                                    return <Form.Item 
                                                                                        {...field} 
                                                                                        className="dyna-form-form-item-container"
                                                                                        label={nestedField.label}
                                                                                        name={[field.name, `${nestedField.name}`]}
                                                                                        rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                        fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <Input 
                                                                                                className="dyna-form-input-content"
                                                                                                placeholder={nestedField.label} />
                                                                                            </Form.Item>
                                                                                
                                                                                case 'select-search':
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    className="dyna-form-form-item-container"
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <Select
                                                                                                mode={nestedField.mode}
                                                                                                className="dyna-form-input-content"
                                                                                                showSearch
                                                                                                placeholder={`Select ${nestedField.name}...`}
                                                                                                optionFilterProp="children"
                                                                                                filterOption={(input, option) =>
                                                                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                                                                }>
                                                                                                    {
                                                                                                        nestedField.options.map((category, index) => <Option value={category} key={`nested-category-${index}`}>{category}</Option>)
                                                                                                    }
                                                                                                </Select>
                                                                                            </Form.Item>
                                                                                
                                                                                case 'text-area': 
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    className="dyna-form-form-item-container"
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <Input.TextArea rows={5} 
                                                                                                className="dyna-form-input-content"/>
                                                                                            </Form.Item>
                                                                                        
                                                                                case 'drag-drop':
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}
                                                                                            >
                                                                                            <Form.Item 
                                                                                            name={nestedField.name} 
                                                                                            valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                                                                            <Upload.Dragger name="files" action={'/ES/api/news'}>
                                                                                                <p className="ant-upload-drag-icon">
                                                                                                <InboxOutlined />
                                                                                                </p>
                                                                                                <p className="ant-upload-text">{ t("forms.drag_dr_text") }</p>
                                                                                                
                                                                                            </Upload.Dragger>
                                                                                            </Form.Item>
                                                                                        </Form.Item>
                                                        
                                                                                case 'rich-text':
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    className="dyna-form-form-item-container"
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <ReactQuill
                                                                                                    className="dyna-form-input-content"
                                                                                                    theme="snow" 
                                                                                                    modules={modules} 
                                                                                                    formats={formats} 
                                                                                                    />
                                                                                        </Form.Item>
                                                                                
                                                                                case 'check-box':
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    valuePropName="checked"
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <Checkbox />
                                                                                        </Form.Item>
                                                                                
                                                                                case 'slider':
                                                                                    return <Form.Item 
                                                                                        {...field} 
                                                                                        label={nestedField.label}
                                                                                        name={[field.name, `${nestedField.name}`]}
                                                                                        rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                        fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                                <Slider 
                                                                                                    style={{width: 200}} 
                                                                                                    min={inputField.min | 0} 
                                                                                                    max={inputField.max | 20} />
                                                                                        </Form.Item>
                                                                                
                                                                                case 'date':
                                                                                    return <Form.Item 
                                                                                    {...field} 
                                                                                    className="dyna-form-form-item-container"
                                                                                    label={nestedField.label}
                                                                                    name={[field.name, `${nestedField.name}`]}
                                                                                    rules={[{required: true, message: `${nestedField.name} is required`}]}
                                                                                    fieldKey={[field.fieldKey, nestedField.name]}>
                                                                                        <DatePicker 
                                                                                        className="dyna-form-input-content"
                                                                                        style={{width: '100%'}} />
                                                                                    </Form.Item>
                                                                                
                                                                                default: 
                                                                                    return null;
                                                                            }
                                                                        })} 
                                                                        
                                                                        <MinusCircleOutlined
                                                                            onClick={() => {
                                                                            remove(field.name);
                                                                            }}
                                                                        />

                                                                        </Space>
                                                                ))
                                                            }
                                                            <Form.Item>
                                                            <Button
                                                                type="dashed"
                                                                onClick={() => {
                                                                    add();
                                                                }}
                                                                block
                                                            >
                                                                <PlusOutlined /> { t("forms.add_btn") }
                                                            </Button>
                                                            </Form.Item>
                                                        </div>
                                                    )
                                                }
                                            }
                                    </Form.List>
                        
                        case 'question': 
                            return <Form.List 
                                name={inputField.name}
                                key={`dyna-form-item-${index}`}>
                                
                                {
                                    ( fields, {add, remove})=>{
                                        return (
                                            <div style={{width: '100%'}} key={`form-list-${index}`}>
                                                {
                                                    fields.map(field=>(
                                                        <div 
                                                            key={field.key} 
                                                            style={{
                                                                width: '100%',
                                                                display: 'flex', 
                                                                flexDirection: 'column', 
                                                                flexWrap: 'wrap', 
                                                                marginBottom: 40}} 
                                                            >
                                                            <QuestionInput initialValues={field.value ? field.value : null} data={{
                                                                name: field.name,
                                                                key: field.key,
                                                                mode: inputField.mode
                                                            }} /> 
                                                            

                                                            <DeleteOutlined
                                                                style={{
                                                                    zIndex: 99,
                                                                    color: 'red',
                                                                    fontSize: 20,
                                                                    marginTop: -35,
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => {
                                                                remove(field.name);
                                                                }}
                                                            />

                                                        </div>
                                                    ))
                                                }
                                                <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => {
                                                        add();
                                                    }}
                                                    block
                                                >
                                                    <PlusOutlined /> {t("forms.add_ques_btn")}
                                                </Button>
                                                </Form.Item>
                                            </div>
                                        )
                                    }
                                }

                            </Form.List>

                        default: return null;
                    }

                })
            }

            <Form.Item >
                {
                    needCancel
                    ? <Ripples><Button
                        onClick={()=>history.goBack()}
                        style={{marginRight: 3}}
                        type="danger"
                        htmlType="button"
                    >
                        { t("forms.can_btn") }
                    </Button></Ripples>
                    : null
                }
                {
                    removeSubmitBtn
                    ? null
                    : <Ripples>
                        <Button 
                            
                            loading={loading}
                            type="primary" 
                            htmlType="submit">
                        { t("forms.subm_btn") }
                        </Button>
                    </Ripples>
                }
                
            </Form.Item>

        </Form>
    </CustomCard>
    )
}


const mapDispatchToProps = dispatch=>({
    //triggerActionOnly: (action)=>dispatch(triggerFetchStart(action)),
    //triggerActionWithRes: (action, payload)=>dispatch(triggerActionWithPayload(action, payload)),
    //sendNotif: obj => dispatch(sendNotification(obj)),
    //setScore: score => dispatch(setExerciseScore(score)),
    //setAnswers: answers => dispatch(setExerciseAnswers(answers))
})

const mapStateToProps = createStructuredSelector({
    //currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DynaForm));