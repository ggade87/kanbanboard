import React, { createRef } from "react";
import "./Popup.css";
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.inputTaskName = React.createRef();
  }
  handleSaveChange = () => {
    if (this.inputTaskName.value) {
      var data = {
        name: this.inputTaskName.value,
        category: this.props.category,
      };
      this.props.saveTask(data);
    } else {
      alert("Please enter task");
    }
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <h1>{this.props.category}</h1>
          <p>Task name: </p>{" "}
          <input
            ref={(elem) => (this.inputTaskName = elem)}
            type="text"
          ></input>
          <button onClick={this.props.closePopup}>close me</button>
          <button onClick={this.handleSaveChange}>Save</button>
        </div>
      </div>
    );
  }
}

export default Popup;
