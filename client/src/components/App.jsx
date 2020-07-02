import React from "react";
import axios from "axios";
import Items from "./Items.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      startRange: Math.floor(Math.random() * Math.floor(50)),
      display: [],
      shades: []
    };
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }



  getData() {
    axios
      .get("http://localhost:3050/products/suggested")
      .then((data) => {
        this.setState({
          items: data.data
        });

        let randomProducts = [];
        for(var i = 0; i < 4; i++) {
            let min = Math.ceil(0);
            let max = Math.floor(50);
            randomProducts.push(data.data[Math.floor(Math.random() * (max - min + 1)) + min])
        }
        this.setState({
          display: randomProducts
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }



  render() {
    return (
      <div className="overlay" >
      <div className="main">

        <h2 className="title">You may also like</h2>
        <div className="items-container">
          {this.state.display
            .map((item, index) => (
              <Items item={item} key={index}/>
            ))}
        </div>
      </div>
      </div>
    );
  }
}

export default App;
