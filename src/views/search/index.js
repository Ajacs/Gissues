// @ vendor
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Wizard from 'components/commons/wizard/wizard';
import queryString from 'query-string'

class SearchView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: [
        { key: 'users', icon: 'users', title: 'User', description: 'Select the user' },
        { key: 'repositories', active: true, icon: 'github', title: 'Repository', description: 'Select the repository' },
        { key: 'issues', disabled: true, icon: 'warning', title: 'Issue', description: 'Select or create issue' },
      ],
      currentStep: null,
      selectedElement: {}
    }
  }

  componentDidMount(props) {
    const parsed = queryString.parse(this.props.location.search);
    const { by, val } = parsed;
    let currentStep = 0;
    const updatedSteps = this.state.steps.map((step, index) => {
      if(step.key === by) {
        step.active = true;
        step.disabled = false;
        currentStep = index + 1;
      } else {
        step.active = false;
        step.disabled = true;
      }
      return step
    });
    this.setState({
      currentStep,
      steps: updatedSteps
    });
  }

  render() {
    const { currentStep, steps } = this.state;

    return (
      <Container>
        <Wizard currentStep={currentStep} steps={steps}>
          <p>Hola</p>
          <p>Hola</p>
          <p>Hola</p>
          <p>Hola</p>
          <p>Hola</p>
          <p>Hola</p>
        </Wizard>
      </Container>
    )
  }
}

export default SearchView;
