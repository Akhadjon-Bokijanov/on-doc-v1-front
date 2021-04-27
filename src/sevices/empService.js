import axios from "axios";

// const api='emp/view/?tin=${user.tin}&EmpId=${empowermentId}';
const editingApi='emp/view/?tin=';
const addApi='emp/create';
const editApi='/emp/update?id=';

export const empApi={
    getEmp:(tin,id)=>{
       return axios.get(`${editingApi}${tin}&EmpId=${id}`)
    },
    addEmp:(data)=>{
        return axios.post(`${addApi}`, data)
    },
    editEmp:(id,user,data)=>{
        return axios.post(`${editApi}${id}&tin=${user.tin??user.username}`,data)
    }
}