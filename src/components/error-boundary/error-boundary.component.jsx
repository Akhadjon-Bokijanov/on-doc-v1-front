import React from 'react';
import { Result } from 'antd';

class ErrorBoundary extends React.Component{

    constructor(){
        super();

        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error){
        //Process the error
        return { hasError: true }
    }

    componentDidCatch(error, info){
        console.error(error);
    }

    render(){
        if(this.state.hasError)
        {
            return(<div>
                <Result
                    subTitle="Sorry, Something went wrong!"
                />
            </div>)
        }
        
        return this.props.children
    }
} 

export default ErrorBoundary;