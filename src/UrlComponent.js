import React, { Component } from "react";
import PropTypes from "prop-types";

export default class UrlComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ""
    };
    this.addUrl = this.addUrl.bind(this);
  }

  addUrl() {
    let url = "";

    function checkProp(prop, type) {
      if (typeof prop === type) {
        return prop;
      } else {
        return "";
      }
    }

    url += checkProp(this.props.protocol, "string");
    url += checkProp(this.props.subDomain, "string");
    url += checkProp(this.props.domain, "string");
    url += checkProp(this.props.port, "string");
    url += checkProp(this.props.page, "string");
    url += checkProp(this.props.parameters, "object");
    url += checkProp(this.props.anchor, "string");

    if (url) {
      this.setState({ url: url });
    }
  }

  componentWillReceiveProps() {
    this.addUrl();
  }

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
      <div>
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
              {typeof this.props.parameters === "object"
                ? this.iterateParameters(this.props.parameters.entries()).map(
                    (parameter, i) => {
                      return <div key={i}>{parameter}</div>;
                    }
                  )
                : ""}
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
        <br />
        <br />
        <br />
        <p>{this.state.url}</p>
      </div>
    );
  }
}

UrlComponent.propTypes = {
  parameters: PropTypes.objectOf(PropTypes.string)
};

UrlComponent.defaultProps = {
  parameters: {}
};
