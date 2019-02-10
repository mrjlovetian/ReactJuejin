import React, { Component } from 'react'
import {Form, Button, Alert} from 'react-bootstrap'

export default class FormView extends Component {

  constructor(props){
    super(props);
    this.state={
      title:'',
      summaryInfo:'',
      viewCount:'',
      content:'',
      screenshot:'',
      originalUrl:'',
      showErrorAlert:false,
      showSuccessAlert:false,
    }
  }

  getValue(e){
    console.log('00000000000', e.target.value, e.target.id)
    if (e.target.id === "title"){
      this.setState({
        title:e.target.value
      })
    } else if (e.target.id === "summaryInfo"){
      this.setState({
        summaryInfo:e.target.value
      }) 
    } else if (e.target.id === "viewCount"){
      this.setState({
        viewCount:e.target.value
      }) 
    } else if (e.target.id === "content"){
      this.setState({
        content:e.target.value
      }) 
    } else if (e.target.id === "screenshot"){
      this.setState({
        screenshot:e.target.value
      }) 
    } else if (e.target.id === "originalUrl"){
      this.setState({
        originalUrl:e.target.value
      }) 
    }
  }

  submitValue(){
    console.log('标题是'+this.state.title+"\n简介是"+this.state.summaryInfo+"\n数量是"+this.state.viewCount+"\n内容是"+this.state.content+"\n图片地址是"+this.state.screenshot+"\n原文是"+this.state.originalUrl)
    var parm = {"title":this.state.title, "summaryInfo":this.state.summaryInfo, "viewCount":this.state.viewCount, "content":this.state.content, "screenshot":this.state.screenshot, "originalUrl":this.state.originalUrl}
    var body = JSON.stringify(parm)
    fetch('http://192.168.1.107:3000/newjuejin', ({"method":'POST',headers: {//请求头
                   'Content-Type': 'application/json'
                 }, body:body, mode:'cors'}))
    .then((res)=>{
      res.json().then((data)=>{
        console.log('aaaaaaaaaaaaa', data)
        if (data["error"]){
          this.setState({
            showErrorAlert:true
          })
        }
        if (data['success']){
          this.setState({
            showSuccessAlert:true
          })
        }
      })
      
    })
    .catch((e)=>{
      console.log('...........', e)
    })
  }

  render() {
    return (
      <div>
        <Alert dismissible show={this.state.showErrorAlert} onClose={()=>{
          this.setState({
            showErrorAlert: !this.state.showErrorAlert
          })
        }} variant="danger">
          <Alert.Heading>有问题哦!</Alert.Heading>
          <p>
             请输入必填项！
          </p>
        </Alert>

        <Alert show={this.state.showSuccessAlert} variant="success" onClose={()=>{
          this.setState({
            showSuccessAlert: !this.state.showSuccessAlert
          })
        }}>
          <Alert.Heading>数据添加成功!</Alert.Heading>
          <p>
             恭喜你把数据成功插进去了！
          </p>
        </Alert>

        <Form>
            <Form.Row>
              <Form.Group md="4" controlId="title">
              <Form.Label>标题</Form.Label>
              <Form.Control required type="text" placeholder="请输入标题" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="summaryInfo">
              <Form.Label>简介</Form.Label>
              <Form.Control placeholder="请输入你的简介" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="viewCount">
              <Form.Label>查看数量</Form.Label>
              <Form.Control required type="text" placeholder="请输入查看数量" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="content">
              <Form.Label>内容</Form.Label>
              <Form.Control placeholder="请输入查看内容" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="screenshot">
              <Form.Label>图片地址</Form.Label>
              <Form.Control required type="text" placeholder="请输入图片地址" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>

              <Form.Group md="4" controlId="originalUrl">
              <Form.Label>原文链接</Form.Label>
              <Form.Control placeholder="请输入原文链接" onChange={e=>{this.getValue(e)}}></Form.Control>
              </Form.Group>
            

            </Form.Row>
          <Button onClick={e=>{this.submitValue()}}>提交</Button>
        </Form>

        
      </div>
    )
  }
}
