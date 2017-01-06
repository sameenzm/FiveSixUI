import React, { Component, PropTypes} from 'react';
import { BankSelect, Crumb, ImageModal, SearchPeriod, Show, TimeRangePicker,
    Select,TagsField,Tag,UserPassWordInput,AsynDownloadBtn,DownloadList } from 'fivesix';
import { Button,TimePicker } from 'antd';
import moment from 'moment';

const addon=(panel) => (
  <Button size="small" type="primary" onClick={() => panel.close()}>
    Ok
  </Button>
);
export default class Homepage extends Component {
    constructor(props){
        super(props);
        this.state={
            value: ['today'],
              bank: '招商银行',
            date: {start:moment('11:11:11', 'HH:mm:ss'), end:moment('11:11:11', 'HH:mm:ss')}
        }
        this.changeValue = (value) => {
            this.setState({
                value: value,
            });
        }
        this.changeDate = (obj) => {
            console.log(obj);
            this.setState({
                    date: obj,
            });
        };
          this.handleChangeBank = this.handleChangeBank.bind(this);
    }
    handleChange() {
        console.log('input change');
    }

        handleChangeBank(value) {
                // console.log('value', value);
                this.setState({
                bank: value
            });
        }
    render() {
        const startTime = moment('11:11:11', 'HH:mm:ss');
                const endTime = moment('11:11:11', 'HH:mm:ss');
                const handleChange = (obj)=>{
                };
         const data = [
        {status: 0,name: '配送费1',create_time: 1318781876.721},
        {status: 1,name: '配送费2',create_time: 1318781876.721},
        {status: 2,name: '配送费3',download_url: 'www.baidu.com',create_time: 1318781876.721},
        {status: 3,name: '配送费4',create_time: 1318781876.721},
        ];
        return (
            <div style={{height: 800}}>
                            <BankSelect
                                    style={{ width: 200 }}
                                    placeholder="请选择银行"
                                    optionFilterProp="children"
                                    value = {this.state.bank}
                                    onChange={this.handleChangeBank}
                            />
                <Crumb
                    data = {[{title: '骑士管理', link: 'www.baidu.com'},{title: '装备管理'}]}
                />
                <Show
                    isShow = { false }
                    isInline = { true }
                    isDelay = { false }
                >
                    <Button>测试</Button>
                </Show>
                <Button>测试</Button>
                
                 <Select
                data={[{text: '今天',value: 'today'},{text: '昨天',value: 'yesterday'},{text: '明天',value: 'tomorrow'}]}
                value={this.state.value}
                showSearch={true}
                showAll={true}
                allowClear={true}
                onChange={this.changeValue}
                style={{position: 'absolute', top: 400}}
                multiple = {true}
            ></Select>
            <TagsField
            tags={[{value: 1, label: 'label1'},{value: 2,label: 'label2'}]}
            ></TagsField>
            <Tag
                key = { 'zcf' }
                onClick = { (value,bool)=>{console.log(value,bool)} }
                onClose = { (value)=>{console.log(value)} }
                value = { 'zcf' }
                selected = { true }
                closable={true}
                >
                zhangcongfeng
            </Tag>
            <div>
                <AsynDownloadBtn />
                
                <TimeRangePicker 
                value={{start:startTime, end:endTime}} 
                ordered={true} 
                onChange={handleChange}
                />
            </div>
            </div>
        )

    }
}