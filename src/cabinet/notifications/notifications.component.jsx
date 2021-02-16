import { List, Tag } from 'antd'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { IMPORTANCE } from '../../env'
import moment from "moment"

const Notifications = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true)
        axios({
            url: "api/v1/notifications",
            method: "GET"
        }).then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(er => {
            console.log(er)
            setLoading(false)
        })

    }, [])

    return (
        <div className="factura-data-sheet-container" style={{ margin: 15 }}>
            <h3>Notifications</h3>
            <List
                loading={loading}
                dataSource={data}
                pagination
                renderItem={(n) => (
                    <List.Item>
                        <div style={{ marginBottom: 30 }}>
                            <h3>{n.title_uz}</h3>
                            <div>
                                <Tag
                                    style={{ marginRight: 10 }}
                                    color={IMPORTANCE[n.importance].color}>
                                    {IMPORTANCE[n.importance].text}
                                </Tag>
                                {moment(n.updated_at).format("MMMM Do YYYY, H:mm:ss")}
                            </div>
                            <div>{n.body_uz}</div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Notifications
