import React from 'react';

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
        <li className="space">
          <div className="items">
          <img src={this.props.item.suggImage}></img>
        </div>
      </li>
    )
  }
}

export default Items;