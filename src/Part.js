import React, { Component } from "react";
import Proptypes from "prop-types";

export default class Part extends Component {
  
  iterateParameters(object) {
    let array = [];
    for (let value of object) {
      for (let i = 0; i < value.length; i++) {
        let element = value[i];
        array.push(element);
      }
    }
    return array;
  }

  render() {
    return (
      <div className={`url-part ${this.props.cssClass}`}>
        <div className="url-part__name">{this.props.partName}</div>
        {this.props.partType === "string" && (
          <div className="url-part__value">{this.props.partValue}</div>
        )}
        {this.props.partType && this.props.partType === "object"
          ? this.iterateParameters(this.props.partValue.entries()).map(
              (parameter, i) => {
                return <div key={i}>{parameter}</div>;
              }
            )
          : ""}
        <div className="add-value">+</div>
      </div>
    );
  }
}

Part.propTypes = {
  partName: Proptypes.string,
  partValue: Proptypes.string || Proptypes.array,
  type: Proptypes.string
};
