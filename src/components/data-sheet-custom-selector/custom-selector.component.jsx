import React, { PureComponent } from 'react'
import Select from "react-select"
import { ENTER_KEY, TAB_KEY } from 'react-datasheet/lib/keys';
import { createStructuredSelector } from 'reselect';
import { selectUserProducts } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import './custom-selector.style.scss'

const { Option } = Select

class SelectEditor extends PureComponent {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.state = {}
  }

  handleChange(opt) {
    console.log(opt)
    
    const { onCommit, onRevert } = this.props
    if(!opt){
      onRevert()
    }
    const { e } = this.state
    onCommit(opt.value)
    console.log('COMMITTED', opt.value)
  }

  handleKeyDown(e) {
    // record last key pressed so we can handle enter
    if (e.which === ENTER_KEY || e.which === TAB_KEY) {
      e.persist()
      this.setState({ e })
    } else {
      this.setState({ e: null })
    }
  }

  

  optionstag = this.props.userProducts.map(d => ({ label: d.className, 
    value: //d.classCode
    { CatalogCode: d.classCode, CatalogName: d.className } 
  }))

  render() {
    return (
      <Select
        size="small"
        showSearch
        autoFocus
        dropdownClassName="class-codes-drop-down-list"
        style={{width: "100%"}}
        dropdownMatchSelectWidth={false}
        open={true}
        menuPortalTarget={document.body}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        value={this.state.selected}
        onChange={this.handleChange}
        //onSelect={this.handleChange}
        onInputKeyDown={this.handleKeyDown}
       options={this.optionstag} 
      />
       
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userProducts: selectUserProducts
})

export default connect(mapStateToProps)(SelectEditor);