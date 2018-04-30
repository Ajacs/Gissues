// @ vendor
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Wizard from 'components/commons/wizard/wizard';
import queryString from 'query-string';

import WizardUserStep from 'views/user/userView';

// @services
import listUsers from 'services/api';

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
      selectedUser: {},
      userList: [],
      repositoryList: [],
      repositoryIssues: [],
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
      currentStep
    })
  }

  getCurrentStep() {
    const parsed = queryString.parse(this.props.location.search);
    const { by, val } = parsed;
    let currentStep;
    switch(this.state.currentStep) {
      case 1:
        currentStep = (<WizardUserStep searchValue={val} />)
        break;
      case 2:
      case 3:
      break
    }
    return currentStep;
  }

  render() {
    const { currentStep, steps, userList } = this.state;
    const currentWizardStep = this.getCurrentStep();

    return (
      <Container>
        <Wizard dataList={userList} currentStep={currentStep} steps={steps}>
          {currentWizardStep}
        </Wizard>
      </Container>
    )
  }
}

export default SearchView;
