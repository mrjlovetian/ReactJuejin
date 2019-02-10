import React, { Component } from 'react'
import {Button, Form} from  'react-bootstrap'

export default class SearchView extends Component {

    constructor(props){
        super(props)
        this.state={
            keyword:''
        }
    }

    getSearchValue(e){
        console.log('............', e.target.value)
        this.setState({
            keyword:e.target.value
        })
    }

    searchKeyword(){
        var url = 'http://192.168.1.107:3000/search?keyword='+ this.state.keyword
        fetch(url, ({"method":'GET'}))
        .then(res=>{
            res.json().then(datas=>{

            })
        })
        .catch(err=>{

        })
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Label>请输入要查找的标题，点击搜索按钮继续</Form.Label>
                    <Form.Control placeholder="在此输入您要的标题" onChange={(e)=>{
                        this.getSearchValue(e)
                    }}></Form.Control>
                    <Button onClick={()=>{this.searchKeyword()}}>搜索</Button>
                </Form>
            </div>
        )
    }
}
