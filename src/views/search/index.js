// @ vendor
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Wizard from 'components/commons/wizard/wizard';
import queryString from 'query-string';

import WizardUserStep from 'views/user/userView';
import WizardRepositoryStep from 'views/repository/repositoryView';

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
    this.onNextClicked = this.onNextClicked.bind(this);
    this.onPreviousClicked = this.onPreviousClicked.bind(this);
    this.onCancelClicked = this.onCancelClicked.bind(this);
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
        currentStep = (<WizardRepositoryStep searchValue={val} />)
      case 3:
      break
    }
    return currentStep;
  }

  updateProgressIndicator() {
    const { currentStep, steps } = this.state;
    const updatedSteps =  steps.map( (step, index) => {
      if (index + 1 === currentStep) {
        step.active = true;
        step.disabled = false;
      } else {
        step.active = false;
        step.disabled = true;
      }
      return step;
    });
    return updatedSteps;
  }

  onNextClicked() {
    const { currentStep } = this.state;
    if( currentStep >= 1 || currentStep <= 3) {
      this.setState({
        currentStep: this.state.currentStep + 1,
        steps: this.updateProgressIndicator()
      });
    }
  }

  onPreviousClicked() {
    const { currentStep } = this.state;
    if( currentStep >= 0 || currentStep <= 3) {
      this.setState({
        currentStep: currentStep - 1,
        steps: this.updateProgressIndicator()
      });
    }
  }

  onCancelClicked() {
    this.props.history.push("/");
  }

  render() {
    const { currentStep, steps, userList } = this.state;
    const currentWizardStep = this.getCurrentStep();
    const actions = {
      onNextClicked: this.onNextClicked,
      onPreviousClicked: this.onPreviousClicked,
      onCancelClicked: this.onCancelClicked
    };
    return (
      <Container>
        <Wizard
        actions={actions}
        dataList={userList}
        currentStep={currentStep}
        steps={steps}>
          {currentWizardStep}
        </Wizard>
      </Container>
    )
  }
}

export default SearchView;
