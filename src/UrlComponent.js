import React, { Component } from "react";

export default class UrlComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="url">
        <div className="url-part url-part--protocol">
          <div className="url-part__name">protocol</div>
          <div className="url-part__value">
            {this.props.protocol ? this.props.protocol : ""}
          </div>
          <div className="add-value">+</div>
        </div>

        <div className="url-part url-part--sub-domain">
          <div className="url-part__name">sub domain</div>
          <div className="url-part__value">
            {this.props.subDomain ? this.props.subDomain : ""}
          </div>
          <div className="add-value">+</div>
        </div>

        <div className="url-part url-part--fill">
          <div className="url-part__name"> </div>
          <div className="url-part__value">.</div>
        </div>

        <div className="url-part url-part--domain">
          <div className="url-part__name">domain</div>
          <div className="url-part__value">
            {this.props.domain ? this.props.domain : ""}
          </div>
          <div className="add-value">+</div>
        </div>

        <div className="url-part url-part--port">
          <div className="url-part__name">port</div>
          <div className="url-part__value">
            {this.props.port ? this.props.port : ""}
          </div>
          <div className="add-value">+</div>
        </div>
        <div className="url-part url-part--page">
          <div className="url-part__name">page or file</div>
          <div className="url-part__value">
            {this.props.page ? this.props.page : ""}
          </div>
          <div className="add-value">+</div>
        </div>

        <div className="url-part url-part--parameters">
          <div className="url-part__name">parameters</div>
          <div className="url-part__value">
            {this.props.parameters ? this.props.parameters : ""}
          </div>
          <div className="add-value">+</div>
        </div>

        <div className="url-part url-part--anchor">
          <div className="url-part__name">anchor</div>
          <div className="url-part__value">
            {this.props.anchor ? this.props.anchor : ""}
          </div>
          <div className="add-value">+</div>
        </div>
      </div>
    );
  }
}
