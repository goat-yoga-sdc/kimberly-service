import React from 'react';
import axios from 'axios';

class Items extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shades: [],
      quickview: [],
      quick: false,
      size: true,
      bag: true,
      shade: true,
      choosingSize: false,
      choosingBag: false,
      choosingShade: false,
      imageHover: false,
      qViewBtn: false,
      price: this.props.item.suggMiniPrice,
      input: 1,
      firstImage: this.props.item.suggMain
    }
    this.toggleQuick = this.toggleQuick.bind(this);
    this.toggleSize =this.toggleSize.bind(this);
    this.toggleBag =this.toggleBag.bind(this);
    this.toggleShade =this.toggleShade.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.getShades = this.getShades.bind(this);
    this.toggleRadio = this.toggleRadio.bind(this);
    this.getQuickviewImg = this.getQuickviewImg.bind(this);
    this.handleIncrease = this.handleIncrease.bind(this);
    this.handleDecrease = this.handleDecrease.bind(this);
    this.changeQvImage = this.changeQvImage.bind(this);
  }

  componentDidMount() {
    this.getShades();
    this.getQuickviewImg();
  }

  getShades() {
    axios
      .get("/products/shades")
      .then((data) => {
        this.setState({
          shades: data.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }

  getQuickviewImg() {
    axios
      .get("/products/quickview")
      .then((data) => {
        this.setState({
          quickview: data.data
        })
      })
      .catch((err) => {
        console.error(err)
      })
  }


  toggleQuick() {
    this.setState({
      quick: !this.state.quick,
      firstImage: this.props.item.suggMain
    })
  }

  toggleSize() {
    this.setState({
      choosingSize: !this.state.choosingSize
    })
  }

  toggleBag() {
    this.setState({
      choosingBag: !this.state.choosingBag
    })
  }

  toggleShade() {
    this.setState({
      choosingShade: !this.state.choosingShade
    })
  }

  toggleHover () {
    this.setState({
      imageHover: !this.state.imageHover,
      qViewBtn: !this.state.qViewBtn
    })
  }

  toggleRadio(price) {
    this.setState({
      price: price
    })
  }

  handleIncrease() {
    this.setState({
      input: this.state.input + 1
    })
  }

  handleDecrease() {
    if(this.state.input > 1) {
      this.setState({
        input: this.state.input - 1
      })
    }
  }

  changeQvImage (e) {
    this.setState({
      firstImage: e.target.value
    })
  }


  render () {
    return (
        <li className="space">
            <div className="image" onMouseLeave={this.toggleHover}>
              {this.state.imageHover ? <img className="hover-img" onMouseDown={this.toggleHover} src={this.props.item.suggHover}></img> : (<img className="item-img" onMouseOver={this.toggleHover} src={this.props.item.suggMain}></img>)}

          {this.state.qViewBtn ? (<button className="quickview" onClick={this.toggleQuick}>Quick View</button>)
          : null}

          {this.props.item.suggBest === 'true' ? <button className="bestseller">Bestseller</button> : null}

            </div>

        {this.state.quick ?
        <div>
          <div className ="qv-window"></div>
          <div className="product-view">
            <div className="qv-title"><h2>{this.props.item.suggItem} ${this.state.price}</h2>
            <button className="close-button" onClick={this.toggleQuick}>X</button>
            </div>

            <div className="qv-main">
            {/* <img className="qv-img-static" src = "https://suggested-items.s3-us-west-1.amazonaws.com/Screen+Shot+2020-07-01+at+9.19.53+AM.png"></img> */}


            <div className = "qv-img-row">
            <button className="qv-img-circles" onClick={this.changeQvImage} value={this.props.item.suggMain} style={ {backgroundImage: `url(${this.props.item.suggMain})`} }></button>
            <button className="qv-img-circles" onClick={this.changeQvImage} value={this.props.item.suggHover} style={ {backgroundImage: `url(${this.props.item.suggHover})`} }></button>
            {this.state.quickview.slice(0,5).map((image, index)  => (
            <button className="qv-img-circles" onClick={this.changeQvImage} value={image.qvImage} style={ {backgroundImage: `url(${image.qvImage})`} }></button>))}
             </div>

             {/* <img className="big-img" src={this.props.item.suggMain}></img> */}
             <img className="big-img" src={this.state.firstImage}></img>

            <div className="full-desc">
              {this.props.item.suggDesc} <br />
              <a className="see-page">See full page →</a>
            </div>

            <div className="options">

            {this.props.item.suggType === 'makeup' ? (<div className=""><div className="qv-shades"> {this.props.item.suggShade} shades available</div> {this.state.shades.slice(0, this.props.item.suggShade).map((swatch, index)  => (
            <button className="swatch-button" style={ {backgroundImage: `url(${swatch.shadeImage})`} }></button>))} </div>)
            : (<div>
              <form className="qv-size" action="">
              <text className="qv-size-title">2 sizes available</text><br />
              <label className="radio">
              <input type="radio" name="size" value="Full Size" onClick={()=>this.toggleRadio(this.props.item.suggPrice)} /> Full-size </label> 6 fl oz / 177 ml <br />
              <label className="radio">
              <input type="radio" name="size" value="Mini" defaultChecked={true} onClick={()=>this.toggleRadio(this.props.item.suggMiniPrice)} /> Mini Size </label> 2 fl oz / 60 ml
            </form>
              </div>
            )}
            <div className="qv-cart">
              <div className="input">
              <button className="qv-signs" onClick={this.handleDecrease}>-</button> {this.state.input} <button className="qv-signs" onClick={this.handleIncrease}>+</button>
              </div>
              <button className="qv-button">Add to Bag  — ${this.state.price * this.state.input} </button>
            </div>
            </div>
          </div>
          </div>
          </div>
        : null
        }
          <div className="details-container">
          <a href="http://localhost:8000/">
            <p className="item-name" >{this.props.item.suggItem}</p>
          <div className="mini-desc" href="http://localhost:3050/" >{this.props.item.suggMiniDesc}</div>
          </a>

            <div className="pop-menu">

          {this.state.choosingSize ? (<div className="choose-size">
            <form action="">
              <label className="radio">
              <input type="radio" name="size" value="Full Size" onClick={()=>{this.toggleRadio(this.props.item.suggPrice)}}/> Full-size </label> 6 fl oz / 177 ml <br />
              <label className="radio">
              <input type="radio" name="size" value="Mini" defaultChecked={true} onClick={()=> {this.toggleRadio(this.props.item.suggMiniPrice)}} /> Mini Size </label> 2 fl oz / 60 ml
            </form>
          </div>)
          : null
          }

          {(this.props.item.suggType === 'skincare') ? (<div className="size-div">
            <button className="size-button" onClick={this.toggleSize}>Choose Size — ${this.state.price}+</button>
          </div>)
          : null
          }

          {(this.props.item.suggType === 'body') ? (<div className="bag-div">
            <button className="bag-button" onClick={this.toggleBag}>Add to Bag — ${this.props.item.suggPrice}</button>
          </div>)
          : null
          }

          {this.state.choosingShade ? (<div className="choose-shade">
            {this.props.item.suggShade} shades available <br />
            <div className="swatch-container"> {this.state.shades.slice(0, this.props.item.suggShade).map((swatch, index)  => (
            <button className="swatch-button" style={ {backgroundImage: `url(${swatch.shadeImage})`} }></button>))
          } </div>

          </div>)
          : null
          }

          {(this.props.item.suggType === 'makeup') ? (<div className="shade-div">
            <button className="shade-button" onClick={this.toggleShade}>Choose Shade — ${this.props.item.suggPrice}</button>
          </div>)
          : null
          }

      </div>
      </div>

      </li>
    )
  }
}

export default Items;