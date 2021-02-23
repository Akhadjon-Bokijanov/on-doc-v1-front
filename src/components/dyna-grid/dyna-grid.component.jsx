import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Table, Tooltip, Input, Button, Space, Popconfirm, message } from 'antd';
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

const DynaGrid = ({
  loading,                //loading state of table
  currentUser,            //Provided by the comonent
  match,                  //Provided by the comonent
  setItemToBeEdited,      //Provided by the comonent
  triggerAction,          //Provided by the comonent, redux action consumer
  triggerActionWithPayload, //Provided by comonent, redux action and payload consumer
  title,                  //title of DynaGrid
  //dataSource,             //data source for the component
  config:{                //Config object
    dataSourcePath,       //data source path for the table should be pagination
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


  let searchInput = null;

  //#region PAGINATION PART
  useEffect(()=>{

    let url = `${dataSourcePath}&page=${pagination.current}&limit=${pagination.pageSize}${searchText ? `&search=${searchText}&searchFrom=${searchedColumn}` : ''}`

    setLoadingResource(true)
    axios({
      url: url.replace(/[ ]+/g, ""),
      method: "GET"
    }).then(res=>{

      if (Array.isArray(res.data.data)){
        setAjaxDataSource(res.data.data);
        setTotalDataCount(res.data.total)
      }else{
        console.log(res);
      }
      setLoadingResource(false)
    }).catch(error=>{
      console.log(error);
      setLoadingResource(false)
    })
  }, [pagination, dataSourcePath, searchText, searchedColumn])
  //#endregion PAGINATION PART

  
  //#region PopConfirm functions
  const confirmDelete = (record) => {

    //setVisible(false);
    
    axios({
      url: `/${deleteRequestPath}/${record.id}`, 
      method: 'delete',
      data: {creator: record.creator}
      })
      .then(res=>{
        
        if(triggerReload){
          triggerAction(triggerReload)
        }

        if(triggerWithPayload){
          triggerActionWithPayload(triggerActionWithPayload, payload)
        }
        //setAction(Math.random())
        message.success(`${record.id} is deleted!`);
      }).catch(error=>{
        message.error('Failed to delete!');
        console.error(error);
        
      })
  };

  const confirmApprove = (record) => {

    //setVisible(false);
    axios.patch(`/${approveRequestPath}/${record.id}`, 
      {userId: currentUser.id},)
    .then(res=>{
      if(triggerReload){
        triggerAction(triggerReload)
      }
      
      if(triggerWithPayload){
        triggerActionWithPayload(triggerActionWithPayload, payload)
      }
      //setAction(Math.random())
      message.success(`${record.id} is approved!`);
    }).catch(error=>{
      message.error('Failed to approve!');
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
    console.log('Various parameters', pagination, filters, sorter);
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
              <Link 
                to={`${editActionPath}/${record.id}`}>
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
              <DeleteOutlined style={{color: 'red'}} />
            </Popconfirm>
          </Tooltip>
          : null
          }
          
          {actions.approve 
            ? <Tooltip placement="bottom" title="Tasdiqlash">
                <Popconfirm
                  title="Approve this news?"
                  onConfirm={()=>{confirmApprove(record)}}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <FontAwesomeIcon style={{color: 'green'}} icon="check-circle" />
                </Popconfirm>
              </Tooltip>
          : null
          }

          {actions.view 
          ? <Tooltip placement="bottom" title="Ko'rish" >
                <Link to={`${ replaceInViewPath 
                  ? viewActionPath.replace(`{${replaceInViewPath}}`, record[replaceInViewPath]) 
                  : viewActionPath}/${record.id}`}><EyeOutlined /></Link>
              </Tooltip>
          : null  
          }

          {actions.chart
          ?
            <Tooltip placement="bottomLeft" title="Natijalar">
              <Link to={`${resultsViewPath}/${record.id}`}>
                <FontAwesomeIcon icon="chart-line" style={{color: '#fb8c00'}} />
              </Link>
            </Tooltip>
          : null
          }

          {
            actions.addElement
            ?
              <Tooltip placement="bottomLeft" title="Qoshimcha  qoshish">
                <Link to={`${match.path}/${addElementViewPath}/${record.id}`}>
                  <FontAwesomeIcon style={{color: "#e91e63"}} icon="plus-circle" />
                </Link>
              </Tooltip>
            :null
          }
        </div>,
    })

    return (
    <div className={`dyna-grid-main-container ${isFulliew ? 'akhadjon-dyna-grid-full-view' : null}`} >
      <div onDoubleClick={()=>toggleFullView(!isFulliew)} 
        
        style={{marginTop: 40, marginBottom: 10, display: "flex", justifyContent: "space-between"}}>
        <Button 
          
          onClick={()=>{toggleFullView(!isFulliew)}} 
          type="primary" 
          icon={isFulliew ? <FullscreenExitOutlined /> : <FullscreenOutlined />}>
            { isFulliew ? "Kichraytirish" : "Kengaytirish" }
          </Button>
        <div>
          <h3>{title}</h3>
        </div>
      </div>
      <Table
        
        loading={loadingSource}
        rowKey="id"
        onChange={handleChange} 
        bordered 
        pagination={pagination}
        columns={columns} 
          dataSource={ajaxDataSource} 
        scroll={{ x: allColumns.length * 120, }}//y: window.innerHeight - window.innerHeight / 13 }} 
        pagination={{position: ['bottomCenter'], total: totalDataCount}}
      />
    </div>);
  }


const mapStateToProps = createStructuredSelector({
  //currentUser: selectCurrentUser,
})

const dispatchMapStateToPros = (dispatch)=>({
  //setItemToBeEdited: (item)=>dispatch(setItemToBeEdited(item)),
  //triggerAction: (action)=>dispatch(triggerFetchStart(action)),
  //triggerActionWithPayload: (action, payload)=>dispatch(triggerActionWithPayload(action, payload))
})

export default connect(mapStateToProps, dispatchMapStateToPros)(withRouter(DynaGrid));