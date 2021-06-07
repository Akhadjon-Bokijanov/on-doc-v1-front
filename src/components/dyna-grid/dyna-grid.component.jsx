import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tooltip, Input, Button, Space, Popconfirm, message, Form, Row, Col, DatePicker, Select, Badge } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './dyna-grid.style.scss';
import axios from 'axios';
import moment from 'moment';
//import { setItemToBeEdited, triggerFetchStart, triggerActionWithPayload } from '../../redux/admin/admin.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
//import { selectCurrentUser } from '../../redux/user/user.selector';
import { 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined, 
  SearchOutlined, 
  FullscreenOutlined, 
  FullscreenExitOutlined, 
  } from '@ant-design/icons';
//import { RESOURCES_PATH } from '../../env';
import RichTextParser from '../rich-text-parser/rich-text-parser.component';
import { useEffect } from 'react';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { useTranslation } from 'react-i18next';
import {DateFormat} from "../../utils/DateFormat";
import eye_icon from "../../images/eye.svg";
import PaginationRenderer from './PaginationRenderer';
import SignBtn from '../Btns/SignBtn';
import CancelBtn from "../Btns/CancelBtn";
import {bringdata} from "../../sevices/bringdata";

const { Option } = Select;



const DynaGrid = ({
    user,
                    setNewUrl,
  showCancelDoc, 
  showSignDoc,
  tableAttachedTabs,      //Attached tabs to the table       
  hideFilter,             //to hide filters of griid
  reload,
  loading,                //loading state of table
  currentUser,            //Provided by the comonent
  match,                  //Provided by the comonent
  setItemToBeEdited,      //Provided by the comonent
  triggerAction,          //Provided by the comonent, redux action consumer
  triggerActionWithPayload, //Provided by comonent, redux action and payload consumer
  title,                  //title of DynaGrid
  //dataSource,             //data source for the component
  config:{                //Config object
    modelName,
    primaryKeyName,
    primaryKeyValue,
    dataSourcePath,       //data source path for the table should be pagination
    newDataSourcePath,       //data source path for the table should be pagination
    addElementViewPath,     //add element to the core
    deleteRequestPath,    //delete request path for API server 
    replaceInViewPath,
    approveRequestPath,   //approve request path for API server 
    viewActionPath,       //UI route to view the element
    editActionPath,
    resultsViewPath,      //view path to see the results
    triggerReload,        //action to triggere when delete, approve is done
    triggerWithPayload,   //Trigger action with payload
    payload,              //Payload to trigger action
    deleteConfirmText,    //Delete confirm text
    actions,              //Object of actions to allow
                          //  {
                          //    add: true,
                          //    edit: true,
                          //    delete: true,
                          //    approve: true,
                          //    view: true
                          //  }
    allColumns,           // array of columns to show
                          //  [
                          //    dataIndex: name of the data in the source object  
                          //    dataType: "image" | to show image, 
                          //              "array" | to show array of strings
                          //               "rich-text" | to show rich text format
                          //              "object" | if dataIndex value is object,
                          //                    then you have to provide "items" array to show certain properties of object
                          //               "rich-text": if dataIndex value includes HTML tags 
                          //    isSearchable: true | false 
                          //    isFilterable: true | false
                          //    filters: ["item1", "item2"]  filter options
                          //  ]
  }
})=> {


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [isFulliew, toggleFullView] = useState(false);
  
  const [pagination, setPagination] = useState({current: 1, pageSize: 10})
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [ajaxDataSource, setAjaxDataSource] = useState([])
  const [loadingSource, setLoadingResource] = useState(false);
  const [reRenderer, setRerenderer]=useState(reload??1);
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const [filterQuery, setFilterQuery]=useState("");
  const [dataurl,setDataurl]=useState('');
  const [st,setSt]=useState(0);

  let searchInput = null;
  const { t } = useTranslation(); 
  //#region PAGINATION PART

  const loadDataAjax = (url)=>{
    axios({
      url:url,
      // url: `${dataurl}?tin=${user.tin}&page=1&limit=10`  ,///url.replace(/[ ]+/g, ""),
      method: "GET"
    }).then(res => {

      if (Array.isArray(res.data.data)) {
        setAjaxDataSource(res.data.data);
        setSt(res.data.data.status);
        console.log("data",res.data.data)
        setTotalDataCount(res.data.pages?.total)
      } else {
        console.log(res);
      }
      setLoadingResource(false)
    }).catch(error => {
      console.log(error);
      setLoadingResource(false)
    })
  }

  
  useEffect(()=> {
    let url = `${dataSourcePath}&page=${pagination.current}&limit=${pagination.pageSize}${searchText ? `&${modelName}[${searchedColumn}]=${searchText}` : ''}${filterQuery}`
    console.log("newurl",newDataSourcePath)
    setLoadingResource(true);
    loadDataAjax(url);
    
  }, [pagination, dataSourcePath, searchText, searchedColumn, reRenderer, modelName, filterQuery])
  //#endregion PAGINATION PART

  
  //#region PopConfirm functions
  const confirmDelete = (record) => {

    //setVisible(false);
    setLoadingResource(true)
    axios({
      url: `/${deleteRequestPath}?${primaryKeyName??'id'}=${record[primaryKeyValue??'id']}&tin=${currentUser.tin??currentUser.username}`, 
      method: 'delete',
      })
      .then(res=>{
        setRerenderer(reRenderer+1)
        setLoadingResource(false)
        if(triggerReload){
          triggerAction(triggerReload)
        }

        if(triggerWithPayload){
          triggerActionWithPayload(triggerActionWithPayload, payload)
        }
        //setAction(Math.random())
        message.success(`${record[primaryKeyValue]} is deleted!`);
      }).catch(error=>{
        setLoadingResource(false)
        message.error('Failed to delete!');
        console.error(error);
        
      })
  };


  const cancel = () => {
    //setVisible(false);
    message.error('Action cancelled!');
  };

  //#endregion

  //#region getColumnSearchProps
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`${dataIndex} qidirish`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Qidirish
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Qaytarish
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
    record[dataIndex] 
      ? record[dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()) 
      : false,
      onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={ text ? text.toString() : null}
        />
      ) : (
        text
      ),
  });

  //#endregion

  //#region handleSearch
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();

    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex)

  };

  const handleReset = clearFilters => {
    console.log(clearFilters)
    
    clearFilters();
    setSearchText('')
  
  };

  const handleChange = (pagination, filters, sorter) => {
    //console.log('Various parameters', pagination, filters, sorter);
    setPagination(pagination)
    setFilteredInfo(filters);
    //setSortedInfo(sorter);

  };
  //#endregion

  const columns =[]

  //#region column config
  allColumns.forEach((element, index)=> {
    columns.push(
      {
        dataIndex: element.dataIndex,
        title: element.title,
        key: element.dataIndex,
        width: element.width ? element.width : 90,
        ellipsis: element.dataIndex==='detail' || element.dataIndex ==='description' ? true : false,     
      });

    if(element.isSearchable) 
    {
        columns[index] = {...columns[index], ...getColumnSearchProps(element.dataIndex)}
    }

    if(element.isFilterable)
    {
      columns[index] = {...columns[index], 
        filters: element.filters.map(univer=>({text: univer.text ?? univer, value: univer.value ?? univer})), 
        onFilter: (value, record) => {
          setSearchText(value.toString().toLowerCase())
          setSearchedColumn(element.dataIndex)
          return ajaxDataSource;
        }}//record[element.dataIndex].toString().toLowerCase().includes(value.toString().toLowerCase()),}
    }

    if(element.customView){
      columns[index] = { ...columns[index],
      dataIndex: null,
      render: record=>element.customView(record[element.dataIndex])
      }
    }

    if(element.isBoolean){
      columns[index] = {...columns[index], 
      dataIndex: null,
      render: (record)=><div>{record[element.dataIndex] ? 1 : 0}</div>}
    }

    if(element.isBoolean && element.isFilterable){
      columns[index] = {...columns[index], 
      dataIndex: null,
      filters: [{text: 1, value: true}, {text: 0, value: false}], 
      onFilter: (value, record) =>!!record[element.dataIndex] === !!value,
      render: (record)=><div>{record[element.dataIndex] ? 1 : 0}</div>}
    }
    
    // if(element.dataType === 'image'){
    //   columns[index] = { 
    //     ...columns[index],
    //     dataIndex: null,
    //     width: 170,
    //     render: (record)=><div style={{textAlign: "center"}}>
    //       <img style={{width: 80, height: 80 }} src={`${RESOURCES_PATH}/${record[element.dataIndex]}`} alt={`${record[element.dataIndex]}`} />
    //     </div>
    //   }
    // }

    if(element.dataType === 'rich-text'){
      columns[index] = { 
        ...columns[index],
        dataIndex: null,
        render: (record)=><RichTextParser text={record[element.dataIndex]} />
      }
    }

    if(element.dataType === 'object'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        render: record=><div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
          {
            record[element.dataIndex] 
          ? element.items.map((field, index)=><div key={`sub-dyna-field-${index}`}>{`${field}: `}{ record[element.dataIndex][field] }</div>)
            : "Nothing found!"
          }
        </div>
      }
    }

    if(element.dataType === 'array'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        onFilter: (value, record) => record[element.dataIndex].includes(value),
        render: record=><div>
          {
            record[element.dataIndex].map(item => <span style={{ backgroundColor: '#4870c7', color: 'white', padding: 3, marginRight: 5, marginBottom: 5, borderRadius: 3 }}>{item} </span>)
          }
        </div>
      }
    }

    if (element.dataType === "date") {
      columns[index]={
        ...columns[index],
        width: 150,
        dataIndex: null,
        render: record=><span>{ moment(record[element.dataIndex]).format('MMMM Do YYYY, H:mm:ss') }</span>
      }
    }

    if(element.dataType === 'array-count'){
      columns[index]={
        ...columns[index],
        dataIndex: null,
        onFilter: (value, record) => record[element.dataIndex].includes(value),
        render: record=><div>
          {
            record[element.dataIndex].length
          }
        </div>
      }
    }

  });
    //#endregion
    
    //Actions
    columns.push({
      title: " ",
      key: 'actions',
      width: 90,
      fixed: 'right',
      render: (record) => 
        <div className="dyna-grid-actions">
          {actions.edit 
          ? <Tooltip placement="left" title="O'zgartirish">
              {console.log("primaryKeyValue",primaryKeyValue)}
              <Link to={`${editActionPath}/${record[primaryKeyValue]}`}>
                  <EditOutlined style={{color: 'blue'}}/>
              </Link>
            </Tooltip>
          : null
          }

          {actions.delete 
          ? <Tooltip placement="bottom" title="O'chirish">
              <Popconfirm
                title={ deleteConfirmText ? deleteConfirmText : "O'chirilsin?" }
                onConfirm={()=>{confirmDelete(record)}}
                onCancel={cancel}
                okText="Ha"
                cancelText="Yo'q"
              >
              <DeleteOutlined style={{color: '#FE346E'}} />
            </Popconfirm>
          </Tooltip>
          : null
          }
          
          {actions.view 
          ? <Tooltip placement="bottom" title="Ko'rish" >
                <Link to={`${ replaceInViewPath 
                  ? viewActionPath.replace(`{${replaceInViewPath}}`, record[replaceInViewPath]) 
                  : viewActionPath}/${record[primaryKeyValue??'id']}/${record['status']}`} ><EyeOutlined /></Link>
              </Tooltip>
          : null  
          }

          {actions.chart
          ?
            <Tooltip placement="bottomLeft" title="Natijalar">
              <Link to={`${resultsViewPath}/${record[primaryKeyValue??'id']}`}>
                <FontAwesomeIcon icon="chart-line" style={{color: '#fb8c00'}} />
              </Link>
            </Tooltip>
          : null
          }

        </div>,
    })

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  };

  const handleFilter = values=>{
    let query="";
    for(let prop in values){
      if(values[prop]){
        if(prop==="begin_date"||prop==="end_date"){
          values[prop]=moment(values[prop]).format("YYYY-MM-DD")
        }
        query += `&${prop}=${values[prop]}`;
      }
    }
  
    setFilterQuery(query);
  }
    const [date,setDate] = useState({begin_date:'',end_date:''});

    const handlePicker=(e,id)=>{
      const DATE={...date};
      DATE[id]=DateFormat(e?._d);
      setDate(DATE);
    }

  function disabledDateStarted(current) {
      let max = new Date(date.end_date);
      max.setDate(max.getDate()+1)
      return current && current > moment(max, "YYYY-MM-DD");
  }
  function disabledDateEnded(current) {
      let min = (date.begin_date);
      return current && current < moment(min, "YYYY-MM-DD");
  }

  const [activTabIndex, setActiveTabIndex] = useState(0);
  const handleAttachedTabClick = async (index,url)=>{
    setActiveTabIndex(index);
    await setNewUrl(url);
    await setDataurl(url);
    console.log('url',url);
  }
    return (
    <div className={`dyna-grid-main-container ${isFulliew ? 'akhadjon-dyna-grid-full-view' : null}`} >

        <div className="dyna-grid-doc-filter-area">
          {
            hideFilter ? null
            :
          <div className="sub-filter-area">
            <div style={{display: 'flex', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{ fontSize: 22, fontWeight: 700, marginRight: 24 }}>{t("Filter")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img src={eye_icon} alt="eye icon" style={{ width: 20, height: 14, marginRight: 10 }} />
                      <span style={{ color: "#2B63C0", fontSize: 14, cursor: 'pointer' }}>
                        {t("Filterni yashirish")}
                      </span>
                    </div>
                </div>
                  <div>
                    <span style={{ fontSize: 14, color: '#2B63C0', cursor: 'pointer'}}>{t("Сбросить фильтр") }</span>
                  </div>
            </div>
            
            <Form
              labelCol={{span: 24}}
              onFinish={handleFilter}
              name="doc-filter"
            >
              <Row justify="space-between" align="bottom" gutter={[12, 0]}>
               
                <Col span={4}>
                  {/* <Form.Item> */}
                    <Form.Item
                      key="dyna-form-facutura-no-old-1"
                          label={t("Hujjat raqami")}
                      name="AllDocumentsSearch[doc_no]">
                      <Input
                        size="large"
                        placeholder={t("Hujjat raqami")} />
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={5}>
                  {/* <Form.Item> */}
                    <Form.Item
                      key="dyna-form-facutura-no-old-1"
                          label={t("Hujjat turi")}
                      name="AllDocumentsSearch[status]">
                      <Select
                        size="large"
                        placeholder={t("Hujjat turi")} 
                        //bordered={false}
                        allowClear
                        options={[
                          { label: t("Faktura"), value: 1},
                          { label: t("Akt"), value: 2 },
                          { label: t("Shartnoma"), value: 3 },
                          { label: t("Ishonchnoma"), value: 4 },
                          { label: t("TTY"), value: 5 },
                        ]}
                        />
                        
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={5}>
                  {/* <Form.Item> */}
                    <Form.Item
                        label={t("Kontragent")}
                      key="dyna-form-facutura-no-old-4"
                      name="AllDocumentsSearch[contragent_name]">
                      <Input
                        rules={[{ required: true }]}
                        size="large"
                        placeholder={t("Kontragent")} />
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={4}>
                  {/* <Form.Item> */}
                    <Form.Item
                        key="dyna-form-facutura-no-old-5"
                        label={t("Dan")}
                        name="begin_date">
                      <DatePicker
                          id={'begin_date'}
                          onChange={e=>handlePicker(e,'begin_date')}
                          disabledDate={disabledDateStarted}
                          // maxDate={date['end_date']}
                          rules={[{ required: true }]}
                          size="large"
                          placeholder={t("Dan")} />
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={4}>
                  {/* <Form.Item> */}
                    <Form.Item
                      key="dyna-form-facutura-no-old-6"
                        label={t("Gacha")}
                      name="end_date">
                      <DatePicker
                          id={'end_date'}
                          // minDate={date['begin_date']}
                          disabledDate={disabledDateEnded}
                          onChange={e=>handlePicker(e,'end_date')}
                          rules={[{ required: true }]}
                        size="large"
                        placeholder={t("Gacha")} />
                    </Form.Item>
                    {/* <span className="custom-input-label-1"></span> */}
                  {/* </Form.Item> */}
                </Col>
                <Col span={2}>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      size="large"
                      style={{ backgroundColor: '#2B63C0', color: '#fff', width: '100%' }}
                    >
                      {t("Filter")}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          }
        </div>

      
      {
        Array.isArray(tableAttachedTabs)&&tableAttachedTabs?.length>0?
            <div style={{
              marginTop: 24,
              //height: 33,
              display: 'flex'
              //backgroundColor: 'rgba(255, 255, 255, 0.5)',
            }}
              
            >
              {tableAttachedTabs.map((item, index) =>{
                return <div 
                  onClick={()=>handleAttachedTabClick(index,item.url)}
                  className={`table-attached-tab ${index===0?' first-item ':''} ${index===tableAttachedTabs.length-1?' last-item ':''} ${activTabIndex===index? 'att-active':''}`}>
                    <Badge color={item.color} />  {item.title}
                </div>
              })}
            </div>
            :null
      }
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange
        }}
        loading={loadingSource}
        rowKey={primaryKeyValue ?? "id"}
        onChange={handleChange} 
        columns={columns} 
          dataSource={ajaxDataSource} 
        scroll={{ x: allColumns.length * 120, }}//y: window.innerHeight - window.innerHeight / 13 }} 
        pagination={{
          locale: {items_per_page: ' ta'},
          position: ['bottomRight'], 
          itemRender: PaginationRenderer,
          ...pagination,
          total: 1000, }}
      />
      <div style={{display: 'flex'}}>
          {
            Array.isArray(tableAttachedTabs) && activTabIndex===0 ?
            <SignBtn
              onClick={() => console.log(selectedRowKeys)}
            />
            :null
          }
          {
            Array.isArray(tableAttachedTabs) && activTabIndex === 0  ?
              <CancelBtn />
              :null
          }
          
      </div>
    </div>);
  }


const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  user:selectCurrentUser
})

const dispatchMapStateToPros = (dispatch)=>({
  //setItemToBeEdited: (item)=>dispatch(setItemToBeEdited(item)),
  //triggerAction: (action)=>dispatch(triggerFetchStart(action)),
  //triggerActionWithPayload: (action, payload)=>dispatch(triggerActionWithPayload(action, payload))
})

export default connect(mapStateToProps, dispatchMapStateToPros)(withRouter(DynaGrid));