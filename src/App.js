import React, { Component } from 'react';

class App extends Component {

  componentDidMount = () => {
    this.getData()
  }

  getData=()=>{
    console.log('begin request!!!')
    fetch('http://192.168.152.130:3000/getjuejin?pagesize=1',{'method':'GET'})
    .then((response)=>{
      if (response.status === 200) {
        console.log('................', response);
        response.json().then((data)=>{
          console.log('aaaaaaaaaaaaaaaaaaaaaaa', data.data)
        })
      }
     
    })
    .catch((err)=>{
      console.log('//////////////////////', err);
      
    })
  }
  
  render() {
    return (
      <div className="App">
       
      </div>
    );
  }
}

export default App;
