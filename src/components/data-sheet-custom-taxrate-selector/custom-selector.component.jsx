import React, { PureComponent } from "react";
import {ENTER_KEY, TAB_KEY} from 'react-datasheet/lib/keys';
import Select from 'react-select';


export default class SelectTaxrateEditor extends PureComponent {
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
          width: "auto",
          height: 0, 
          width: 120,
          textAlign: 'left'
        }),
        control: (css) => ({ ...css, display: "inline-flex " }),
        valueContainer: (css) => ({
          ...css,
          width: 100
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
            {label: '1 - QQS siz', value: 1},
            {label: '2 - 0%', value: 2},
            {label: '3 - 15%', value: 3},
            
          ]}
        />
      )
    }
  }
