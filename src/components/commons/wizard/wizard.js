import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';
import PropTypes from 'proptypes';

class Wizard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      fluid,
      steps
    } = this.props;
    return (
      <div>
        <Step.Group
          fluid={fluid}
          items={steps}
        />
      </div>
    )
  }

}

Wizard.propTypes = {
  steps: PropTypes.array,
  fluid: PropTypes.boolean
}

Wizard.defaultProps = {
  fluid: true
}

export default Wizard
