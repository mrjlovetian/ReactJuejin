import React, { Component } from 'react';
import FormView from "./FormView"
import SearchView from './SearchView'
import {Button} from 'react-bootstrap'

export default class mainView extends Component {

  constructor(props){
    super(props);
    this.state={
      datas:[]
    }
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    console.log('开始请求数据')
    fetch('http://192.168.1.107:3000/juejin?pagesize=200',{"method":"GET"})
    .then((response)=>{
      if(response.status===200){
        response.json().then((datas)=>{
          console.log('.............', datas)
          var jueDatas = datas["data"]
          this.setState({
            datas:jueDatas
          })
        })
      }
    })
    .catch((err)=>{

    })
  }

  getdate(obj) {
    var second = parseFloat(obj)
    var date =  new Date(second);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
  }

  deleteVlaue(e){
    console.log('................', e.title)
    var url = 'http://192.168.1.107:3000/delete'
    var body = JSON.stringify({"id":e.id})
    fetch(url, ({'method':'POST', headers:{"Content-Type":'application/json'}, body:body, mode:'cors'}))
    .then(res=>{

    }).catch(err=>{

    })
  }

  renderView(){
    return this.state.datas.map((item, index)=>{
      return (<div style={itemview} key={index}>
        <div style={top}>
          <div style={title}>{item.title}</div>
          {item.screenshot.length>0?<div style={img}><img  style={img} src={item.screenshot} alt='hh'/></div>:null}
        </div>
        <div style={content}>{item.content}</div>
        <div style={bottom}>
          <div style={time}>{this.getdate(item.buildTime)}</div>
          <div style={info}>{item.summaryInfo}</div>
        </div>
        <Button onClick={()=>{this.deleteVlaue(this.state.datas[index])}} variant="danger">删除</Button>
      </div>)
    })
  }

  render() {
    return (
      <div>
        <SearchView />
        <FormView />
        {this.renderView()}
      </div>
    )
  }
}

const itemview = {
  margin:'10px'
}

const top = {
  display:'flex',
  justifyContent:'space-between',
}

const title = {
  width:'100px',
  textOverflow:'ellipsis',
  overflow:'hidden',
  whiteSpace:'nowrap'
}

const img = {
  height:"50px",
  width:'50px'
}

const content = {
  textOverflow:'ellipsis',
  overflow:'hidden',
  display:'-webkit-box',
  WebkitBoxOrient:'vertical',
  WebkitLineClamp:'3'
}

const bottom = {
  marginTop:'5px',
  display:"flex",
  justifyContent:'spacebetween'
}

const time = {
  height:'20px',
}
const info = {
  height:'20px',
  textOverflow:'ellipsis',
  overflow:'hidden',
  whiteSpace:'nowrap',
  width:'100px'
}
