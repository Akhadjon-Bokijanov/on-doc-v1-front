import axiosInstance from "./api";

// const api='emp/view/?tin=${user.tin}&EmpId=${empowermentId}';
const api='emp/view/?tin=';

export const empApi={
    getEmp:(tin,id)=>{
       return axiosInstance.get(`${api}${tin}&EmpId=${id}`)
    }
}