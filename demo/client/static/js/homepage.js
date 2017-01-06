import React, { Component, PropTypes} from 'react';
import { Crumb,Summernote, ImageModal, SearchPeriod, Show, TimeRangePicker,Select,TagsField,Tag,UserPassWordInput } from 'fivesix';
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
    }     
    disabledHours(){
      return [1,2,3,4,5];
    }
    disabledMinutes() {
        const second = Array.from({length:60}, (v, k) => k);
        return second.splice(0,11);
    }
    disabledSeconds() {
        const second = Array.from({length:60}, (v, k) => k);
        return second.splice(0,11);
    }
    handleChange() {
        console.log('input change');
    }
    render() {
        return (
            <div style={{height: 800}}>
                <Crumb
                    data = {[{title: '骑士管理', link: 'www.baidu.com'},{title: '装备管理'}]}
                />
                <ImageModal>
                    <img src="http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png" />
                </ImageModal>
                <ImageModal 
                    src='http://yizhan.baidu.com/static/logisticsfrontend/images/sound_d165ad8.png' 
                    onOpen = {()=> {console.log('222');}}

                >
                    点我点我
                </ImageModal>
                <SearchPeriod/>
                <Show
                    isShow = { false }
                    isInline = { true }
                    isDelay = { false }
                >
                    <Button>测试</Button>
                </Show>
                <Button>测试</Button>
                <div style={{position: 'absolute', left: '50',top: '500'}}>
                    <TimeRangePicker 
                    value={this.state.date} 
                    ordered={true} 
                    onChange={this.changeDate} 
                    startConfig={{addon: addon}}
                    />
                    <UserPassWordInput value='123456' onChange={this.handleChange} disabled={true}/>
                </div>
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
            <Summernote/>
            </div>
        )
        
    }
}
