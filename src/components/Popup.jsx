import React from 'react';

'use strict';

const StyleFrame = {
  // borderRadius: "3%",
  // borderWidth: "8px",
  // borderColor: "black",
  // maxWidth: "100px",
  // margin: "0 auto",
  boxShadow: "0 0 20px gray",
  // padding: "10px",
  fontFamily: "Lato, sans-serif",
  // fontSize: "100%",
  textAlign: "center",
};

const StyleClose = {
  fontSize: "1.3rem",
  fontWeight: "bold",
  position: "absolute",
  top: "-4px",
  right: "0px",
  // width: "20px",
  // height: "20px",
  textDecoration: "none",
  border: 0,
  outline: 0,
  background: "none",
  verticalAlign: "top",
};

const StyleTrigger = {
  fontSize: "10px",
  // fontWeight: "bold",
  // textAlign: "center",
  // lineHeight: "50px",
  position: "relative",
  overflow: "visible",
  // width: "170px",
  // marginTop: "10px",
  borderRadius: "1em",
  // background: "#35a785",
  // color: "inherit",
  border: "0",
  outline: "0",
  boxShadow: "1px 1px 10px gray",
};

const StyleContainer = {
  // padding: "2px",
  // maxWidth: "100px",
  transitionDuration: ".3s",
  transitionProperty: "transform",
  transform: "translateY(-40px)",
  textAlign: "center",
  // borderRadius: ".25em .25em .4em .4em",
  boxShadow: "0 0 20px rgba(0, 0, 0, .2)",
};

const StylePopup = {
  visibility: "hidden",
  transition: "opacity .3s 0s, visibility 0s .3s",
  opacity: "0",
};

class Popup extends React.Component {
	constructor(props) {
		super(props);
	}

  handleClose() {
    this.props.handleClose({keyCode: 27});
  }
  
  render() {
    return (
      <div style={this.props.stylePopup}>
        <div style={this.props.styleContainer}>
          <p>{this.props.popup}</p>
          <button style={StyleClose} onClick={this.handleClose.bind(this)}>&times;</button>
        </div>
      </div>
    )
  }
}

class ShowPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      stylePopup: StylePopup,
      styleContainer: StyleContainer,
      event: this.props.event,
      popup: this.props.popup
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleClose);
    // console.log(this.props.event);
  }

  handleClose(e) {
    const ESC = 27;
    if (e.keyCode === ESC) {
      this.setState({
        opened: false,
        stylePopup: {
          visibility: "hidden",
				  transition: "opacity .3s 0s, visibility 0s .3s",
				  opacity: "0",
          transition: "opacity .3s 0s, visibility 0s .3s",
          visibility: "hidden",
          opacity: "0",
        },
        styleContainer: {
				  // padding: "2px",
				  // maxWidth: "100px",
				  transitionDuration: ".3s",
				  transitionProperty: "transform",
				  transform: "translateY(-40px)",
				  textAlign: "center",
				  // borderRadius: ".25em .25em .4em .4em",
				  boxShadow: "0 0 20px rgba(0, 0, 0, .2)",
          transform: "translateY(-40px)",
        },
      });
    };
  }
  
  handleClick() {
    if (this.state.opened) {
      this.setState({
        opened: false,
        stylePopup: {
          visibility: "hidden",
				  transition: "opacity .3s 0s, visibility 0s .3s",
				  opacity: "0",
          transition: "opacity .3s 0s, visibility 0s .3s",
          visibility: "hidden",
          opacity: "0",
        },
        styleContainer: {
					// padding: "2px",
				  // maxWidth: "100px",
				  transitionDuration: ".3s",
				  transitionProperty: "transform",
				  transform: "translateY(-40px)",
				  textAlign: "center",
				  // borderRadius: ".25em .25em .4em .4em",
				  boxShadow: "0 0 20px rgba(0, 0, 0, .2)",
          transform: "translateY(-40px)",
        }
      });
    } else {
      this.setState({
        opened: true,
        stylePopup: {
          visibility: "hidden",
				  transition: "opacity .3s 0s, visibility 0s .3s",
				  opacity: "0",
          transition: "opacity .3s 0s, visibility 0s 0s",
          visibility: "visible",
          opacity: "1",
        },
        styleContainer: {
					// padding: "2px",
				  // maxWidth: "100px",
				  transitionDuration: ".3s",
				  transitionProperty: "transform",
				  transform: "translateY(-40px)",
				  textAlign: "center",
				  // borderRadius: ".25em .25em .4em .4em",
				  boxShadow: "0 0 20px rgba(0, 0, 0, .2)",
          transform: "translateY(0px)",
        }
      });
    };
  }

  render() {
    return (
    	<div>
         <Popup 
          stylePopup = {this.state.stylePopup}  
          styleContainer = {this.state.styleContainer} 
          handleClose = {this.handleClose.bind(this)} 
        	popup = {this.state.popup}
        	/>
        <button style={StyleTrigger} type="button" onClick={this.handleClick}>{this.state.event}</button>
      </div>
    );
  }
}


export default ShowPopup;


// var RenderInBody = React.createClass({

//   componentDidMount: function() {
//     this.popup = document.createElement("div");
//     document.body.appendChild(this.popup);
//     this._renderLayer();
//   },
//   componentDidUpdate: function() {
//     this._renderLayer();
//   },
//   componentWillUnmount: function() {
//     React.unmountComponentAtNode(this.popup);
//     document.body.removeChild(this.popup);
//   },
//   _renderLayer: function() {
//     React.render(this.props.children, this.popup);
//   },
//   render: function() {
//     // Render a placeholder
//     return React.DOM.div(this.props);
//   }

// });