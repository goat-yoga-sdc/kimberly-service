import React from "react";
import axios from "axios";
import Items from "./Items.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      shades: []
    };
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }



  getData() {
    axios
      .get("products/suggested")
      .then((data) => {
        this.setState({
          items: data.data
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }



  render() {
    return (
      <div className="overlay" >
      <div className="main">

        <h2 className="titleSugg">You may also like</h2>
        <div className="items-container">
          {this.state.items
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
