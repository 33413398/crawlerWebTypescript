import React,{Component} from 'react'
import { Form, Input, Button,message } from 'antd';
import {Redirect} from 'react-router-dom'
import myAxios from '../../http/myAxios'
import ReactECharts from 'echarts-for-react';
import moment from 'moment'
import './style.css';

// 数据类型
interface Item {
  title: string;
  count: number;
}
// 内容类型
interface Content {
  isLogin:boolean,
  dataList:{
    // propName任意变量
    [propName:number]:Item[]
  }
}

class Index extends Component {
  state:Content= {
    isLogin:true,
    dataList:[]
  }
  componentDidMount(){
    this.getList()
    myAxios.get('islogin').then(res=>{
        if(res.data){
          }else {
            message.error('用户还未登录，请先登录！')
            this.setState({
                isLogin:false
            })
          }
    })
  }
  getOption(){
    let {dataList} = this.state
    // 标题
    const courseName:string[] = []
    // 日期x轴
    const times:string[] = []
    // 数据
    const tempData:{
      [ket:string]:number[];
    } = {}
    const yData = []
    if(dataList){
      for(let i in dataList) {
        let item = dataList[i]
        times.push(moment(Number(i)).format('MM-DD HH:mm'));
        item.forEach(ci=>{
          if(courseName.indexOf(ci.title)=== -1) {
            courseName.push(ci.title)
          }
          // 数据
          tempData[ci.title]?tempData[ci.title].push(ci.count):(tempData[ci.title]=[ci.count])
        })
      }
      for(let i in tempData) {
        yData.push({
          name: i,
          type: 'line',
          stack: '人数',
          data: tempData[i]
      })
      }
    }
    return {
      title: {
          text: '课程学习人数'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data: courseName
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: times
      },
      yAxis: {
          type: 'value'
      },
      series: yData
  }
  }
  getCrwller(){
    myAxios.get('getData').then(res=>{
        if(res.data){
          message.success('数据爬取成功！')
        }else {
          message.error('数据爬取失败！')
        }
      })
  }
  
outLogin=()=>{
    myAxios.get('outlogin').then(res=>{
        if(res.data){
          this.setState({
            isLogin:false
            })
            message.success('退出登录成功!')
        }else {
          message.error('退出登录失败！')
        }
      })
  }
  getList=()=>{
    myAxios.get('backData').then(res=>{
        if(res.data){
          this.setState({
            dataList:res.data
          })
        }else {
          message.error('暂无数据，请先爬取！')
        }
      })
  }
  render () {
    let {isLogin} = this.state
    return isLogin?(<div className="index">
    <div className="top-btn">
      <Button type="primary" onClick={this.getCrwller}>爬取</Button>
      <Button type="primary" onClick={this.getList}>展示</Button>
      <Button type="primary" onClick={this.outLogin}>退出</Button>
    </div>
    <ReactECharts option={this.getOption()} />
  </div>):<Redirect to="/login"/>
  }
}

export default Index