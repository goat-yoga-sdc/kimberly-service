import React from 'react';
import axios from 'axios';
import Items from './Items.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      showItems: 4
    }
    this.getData = this.getData.bind(this);
  }


  componentDidMount () {
    this.getData()
  }

  getData () {
    axios
    .get('/products/suggested')
    .then((data) => {
      this.setState ({
        items: data.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
    .then(() => {
      console.log(this.state)
    })
  }

  render () {
    return (
      <div className="main">
        <div className="mockbar">
          <img src="https://mock-website-shades.s3-us-west-1.amazonaws.com/bar.jpg"></img>
        </div>


      <div className="items-container">
      {this.state.items.slice(0, this.state.showItems).map((item, index) => (<Items item={item} key={index} />))}

      </div>
      </div>
    )
  }
}

export default App;