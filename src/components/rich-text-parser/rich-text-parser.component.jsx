import React from 'react';
import ReactHtmlParser from 'react-html-parser'


const RichTextParser = ({text, ...otherProps})=>(
    <div className="ql-snow" {...otherProps}>
        <div className="ql-editor" style={{paddingLeft: 0}} data-gramm="false">
            {ReactHtmlParser(text)}
        </div>
    </div>
)

export default RichTextParser;