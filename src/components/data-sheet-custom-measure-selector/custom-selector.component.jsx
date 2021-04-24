import React, { PureComponent } from "react";
import {ENTER_KEY, TAB_KEY} from 'react-datasheet/lib/keys';
import Select from 'react-select';


export default class SelectMeasureEditor extends PureComponent {
    constructor (props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {}
    }
  
    handleChange (opt) {
      const { onCommit, onRevert } = this.props
      // if (!opt) {
      //   return onRevert()
      // }
      console.log(opt)
      const { e } = this.state
      onCommit(opt.value)
    }

    render () {
      return (
        <Select
            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
            onChange={this.handleChange}
            options={measures}
            style={{width: "100%"}}
            dropdownMatchSelectWidth={false}
            open={true}
            menuPortalTarget={document.body}
        />

      )
    }
  }


export const measures = [
    { value: 0, label: "boshqa" },
    {value: 1,	label: "штука"},
  {value: 2,	label: "пачка"},
  {value: 3,	label: "миллиграмм"},
  {value: 4,	label: "грамм"},
  {value: 5,	label: "килограмм"},
  {value: 6,	label: "центнер"},
  {value: 7, label:	" тонна"},
  {value: 8, label:	" миллиметр"},
  {value: 9, label:	"сантиметр"},
  {value:10, label:	"дециметр"},
  {value:11, label:	"метр"},
  {value:12, label:	"километр"},
  {value:13, label:	"кв. миллиметр"},
  {value:14, label:	"кв. сантиметр"},
  {value:15, label:	"кв. дециметр"},
  {value:16, label:	"кв. метр"},
  {value:17, label:	"1000 куб. метр"},
  {value:18, label:	"кв. километр"},
  {value:19, label:	"куб. дециметр"},
  {value:20, label:	"куб. метр"},
  {value:21, label:	"куб. километр"},
  {value:22, label:	"миллилитр"},
  {value:23, label:	"литр"},
  {value:24, label:	"дал"},
  {value:25, label:	"сум"},
  {value:26, label:	"комплект"},
  {value:27, label:	"сутка"},
  {value:28, label:	"соат"},
  {value:29, label:	"пар"},
  {value:30, label:	"флакон"},
  {value:31, label:	"размещение"},
  {value:32, label:	"показы"},
  {value:33, label:	"коробка"},
  {value:34, label:	"моточас"},
  {value:35, label:	"Гкал"},
  {value:36, label:	"кВтч"},
  {value:37, label:	"рейс"},
  {value:38, label:	"упаковка"},
  {value:39, label:	"минут"},
  {value:40, label:	"норма/час"},
  {value:41, label:	"баллон"},
  {value:42, label:	"день"},
  {value:43, label:	"месяц"},
  {value:44, label:	"мегабайт"},
  {value:45, label:	"серия"},
  {value:46, label:	"бутылка"},
  {value:47, label:	"кега"},
  {value:48, label:	"публикация"},
  {value:49, label:	"рулон"},
  {value:50, label:	"порция"},
  {value:51, label:	"погонный метр"},
  {value:52, label:	"га"},
  {value:53, label:	"кВарч"},
  {value:54, label:	"человек/час"},
  {value:55, label:	"кВар"},
  {value:56, label:	"кВт"},
  {value:57, label:	"год"},
  {value:58, label:	"лист"},
  {value:59, label:	"блок"},
  
  ]
  