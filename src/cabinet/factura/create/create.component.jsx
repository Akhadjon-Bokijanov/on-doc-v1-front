import React from 'react';
import DynaForm from "../../../components/dyna-form/dyna-form.component";
const FacturaCreateForm = () => {
    return (    
        <div>            
            <DynaForm         
            config={{
                action: 'post',
                apiRequestPath: 'ES/api/exercises',
                title: "Faktura yaratish",
                content: 'application/json',
                inputFields: [
                    {
                        type: 'input',
                        name: 'title',
                        required: true,
                        label: "Your test title"
                    },
                    {
                        type: 'text-area',
                        label: "Description of the test",
                        name: 'description',
                    },
                    {
                        type: 'switch',
                        label: "Is it private test?",
                        name: 'isPrivate'
                    },
                    {
                        type: 'input-number',
                        label: "Time allowed in minutes",
                        name: 'time'
                    },
                    {
                        type: 'input-number',
                        label: "Cost in UZS",
                        name: 'cost',
                    },
                    {
                        type: 'select-search',
                        mode: 'multiple',
                        label: "Level",
                        name: 'category',
                        options: [
                            { value:'beginner', demo: "Beginner" }, 
                            { value: "Intermediate", demo:'Intermediate' }, 
                            { value: "advanced", demo: 'Advanced' }, 
                            { value: "professional", demo:'Professional'}]
                    },
                    {
                        type: 'question',
                        name: 'inputFields',
                        mode: 'quiz'
                    }
                ]
            }}
        />

        </div>
    );
};

export default FacturaCreateForm;   