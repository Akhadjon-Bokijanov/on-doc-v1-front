import React, { PureComponent } from "react";
import './custom-selector.style.scss';


export default class SelectEditor extends PureComponent {
    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {}
    }
  
    handleChange (opt) {
      const {onCommit, onRevert} = this.props
      if (!opt) {
        return onRevert()
      }
      
      const { e } = this.state
      onCommit(opt.target.value, e)
      console.log(opt.target.value, e)
      
    }
  
    render () {
      return (
        <select
          defaultValue={null}
          onChange={this.handleChange}
          onSelect={this.handleChange}
        >
          <option value="04911">04911 - Бошқа босма маҳсулотлар</option>
          <option value="9990000725">9990000725 - Труба сварная из стали</option>
          <option value="9990000902">9990000902 - Полиэтиленовая труба д=32 мм</option>
        </select>
        
      )
    }
  }
