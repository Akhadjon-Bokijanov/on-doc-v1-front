import React, { PureComponent } from "react";
import {ENTER_KEY, TAB_KEY} from 'react-datasheet/lib/keys';
import Select from 'react-select';


export default class SelectMeasureEditor extends PureComponent {
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
          width: 200,
          textAlign: 'left',
          zIndex: "999 !important",
          backgroundColor: '#999'
        }),
        menuList: css=>({
          ...css,
          zIndex: 999,
          backgroundColor: '#fff'
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
          options={ measures }
        />
      )
    }
  }


  const measures = [
    {value: 1,	label: "1 - штука"},
  {value: 2,	label: "2 - пачка"},
 {value: 3,	label: "3 - миллиграмм"},
  {value: 4,	label: "4 - грамм"},
  {value: 5,	label: "5 - килограмм"},
  {value: 6,	label: "6 - центнер"}
  // 7	тонна
  // 8	миллиметр
  // 9	сантиметр
  // 10	дециметр
  // 11	метр
  // 12	километр
  // 13	кв. миллиметр
  // 14	кв. сантиметр
  // 15	кв. дециметр
  // 16	кв. метр
  // 17	1000 куб. метр
  // 18	кв. километр
  // 19	куб. дециметр
  // 20	куб. метр
  // 21	куб. километр
  // 22	миллилитр
  // 23	литр
  // 24	дал
  // 25	сум
  // 26	комплект
  // 27	сутка
  // 28	соат
  // 29	пар
  // 30	флакон
  // 31	размещение
  // 32	показы
  // 33	коробка
  // 34	моточас
  // 35	Гкал
  // 36	кВтч
  // 37	рейс
  // 38	упаковка
  // 39	минут
  // 40	норма/час
  // 41	баллон
  // 42	день
  // 43	месяц
  // 44	мегабайт
  // 45	серия
  // 46	бутылка
  // 47	кега
  // 48	публикация
  // 49	рулон
  // 50	порция
  // 51	погонный метр
  // 52	га
  // 53	кВарч
  // 54	человек/час
  // 55	кВар
  // 56	кВт
  // 57	год
  // 58	лист
  // 59	блок
  
  ]
  