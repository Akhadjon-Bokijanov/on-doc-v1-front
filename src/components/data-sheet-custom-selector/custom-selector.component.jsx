import React, { PureComponent } from "react";
import {ENTER_KEY, TAB_KEY} from 'react-datasheet/lib/keys';
import Select from 'react-select';


export default class SelectEditor extends PureComponent {
    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.handleKeyDown = this.handleKeyDown.bind(this)
      this.state = {}
    }
  
    handleChange (opt) {
      const {onCommit, onRevert} = this.props
      if (!opt) {
        return onRevert()
      }
      const { e } = this.state
      onCommit(opt.value, e)
      console.log('COMMITTED', opt.value)
    }
  
    handleKeyDown (e) {
      // record last key pressed so we can handle enter
      if (e.which === ENTER_KEY || e.which === TAB_KEY) {
        e.persist()
        this.setState({ e })
      } else {
        this.setState({ e: null })
      }
    }

    styles = {
        menu: (css) => ({
          ...css,
          height: 0, 
          width: 500,
          textAlign: 'left',
          zIndex: 999
        }),
        control: (css) => ({ ...css, display: "inline-flex " }),
        valueContainer: (css) => ({
          ...css,
          width: '200px',
        })
      };
  
    render () {
      return (
        <Select
            styles={this.styles}
          autoFocus
          openOnFocus
          closeOnSelect
          value={this.props.value}
          onChange={this.handleChange}
          onInputKeyDown={this.handleKeyDown}
          options={[
            {label: '04911 - Бошқа босма маҳсулотлар', value: '04911'},
            {label: '9990000725 - Труба сварная из стали ', value: '9990000725'},
            {label: '9990000902 - Полиэтиленовая труба д=32 мм', value: '9990000902'},
            
          ]}
        />
      )
    }
  }
