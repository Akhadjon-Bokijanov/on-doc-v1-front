import React from "react";
import Tariffs from "../../components/tariffs";
const tariffs = [
    {
        id:'1',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'2',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    },
    {
        id:'3',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'4',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'5',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    },
    {
        id:'6',
        name:'2500',
        price:'2 000 000',
        count:'2500',
        date:'2'
    },
    {
        id:'7',
        name:'3000',
        price:'2 500 000',
        count:'3000',
        date:'3'
    }
]

function Tariff() {
    return(
        <>
            <Tariffs data={tariffs}/>
        </>
    )
}
export default Tariff