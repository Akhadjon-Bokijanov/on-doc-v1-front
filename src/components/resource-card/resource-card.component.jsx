import React from 'react';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Rate, Tooltip, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './resource-card.style.scss';
import { Link } from 'react-router-dom';
import { addToCard, addToWishList } from '../../redux/resources/resource.actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { getValidFileName, getFileExtension } from '../../utils/main';
import { useTranslation } from 'react-i18next';

const FileDownload = require('js-file-download');

const ResourceCard = ({
    data: {_id, title, category, cost, rating: {average, voters}, creator, file}, 
    addResourceToWishList,
    addResourcetoCard
    })=>{
        
    const downloadStart = ()=>{
        try {
            //Get S3 URL to dowload the file 
            axios({
                method: 'post',
                url: `ES/api/resources/download/`,
                data: {file: {fileName: file.fileName, fileType: file.fileType, fileSize: file.fileSize}}, 
            })
            .then((res=>{

                //Download the file from S3
                axios({
                    method: "get",
                    url: res.data.url,
                    responseType: 'blob'
                })
                .then(r =>{
                    FileDownload(r.data, `EduStack.uz_${getValidFileName(title)}.${getFileExtension(file.fileName)}`);
                })
                .catch(e => console.error(e))
            }))
            .catch(res=>console.log(res.message));
            //message.success("Download started!");
        } catch (error) {
            message.error("Fail to download!");
            console.log(error)
        }
    }   

    const { t } = useTranslation()

    return(
    <div className="resource-card-main-container">
        <div className="resource-card-sub-container">
            <Link to={`/resources/detail/${_id}`}>
                <Paragraph className="resouce-card-title" ellipsis={{rows: 2, expandable: false}}>
                    { title }
                </Paragraph>
            </Link>
            <div className="resource-type">
                <span className="resource-name">
                    { t(`categories.${category.toLowerCase()}`) }
                </span>
            </div>
            <Paragraph 
                style={{margin: 0,}} ellipsis={{rows: 1, expandable: false}}>
                    By <Link style={{color: 'black'}} to={`/users/profile/${creator._id}`}>{creator.fullName}</Link>
            </Paragraph>
            <div className="rate-view">
                <Rate style={{fontSize: 15}} defaultValue={average} allowHalf disabled />
                <p title="Views"><span><FontAwesomeIcon icon="eye" /></span> { voters }</p>
            </div>
            <div className="rate-view price-and-card">
                {
                    cost
                    ? <Tooltip placement="top" title="Add to cart">
                        <FontAwesomeIcon 
                            onClick={()=>{addResourcetoCard({_id, title, average, cost, creator})}} className="resource-card-footer-icon" 
                            icon="cart-plus" />
                    </Tooltip>
                    : <Tooltip placement="top" title="Dowload!">
                        <FontAwesomeIcon 
                            onClick={downloadStart}
                            className="resource-card-footer-icon" 
                            icon="download" />
                    </Tooltip>
                }
                <Tooltip placement="topLeft" title="Add to wish list"><FontAwesomeIcon 
                    onClick={()=>addResourceToWishList({_id, title, average, cost, creator})} 
                    icon="heart" className="add-wish-list" /></Tooltip>
                <div className="resource-price">
                    <span className="resource-cost">{cost ? cost : "Free"}</span> 
                    {cost ? <small>sum</small> : ""}
                </div>
            </div>
        </div>
    </div>
)}

const dispatchToProps = dispatch=>({
    addResourcetoCard: (item)=>dispatch(addToCard(item)),
    addResourceToWishList: item => dispatch(addToWishList(item))
})

export default connect(null, dispatchToProps)(ResourceCard);