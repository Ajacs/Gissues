// @ vendor
import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import Wizard from 'components/commons/wizard/wizard';
import queryString from 'query-string';

// @components
import WizardUserStep from 'views/user/userView';
import WizardRepositoryStep from 'views/repository/repositoryView';
import WizardIssueStep from 'views/issue/issueView';

/**
 * This component is the main search view, after the user enter the search string
 * in the "/" path, contains logic to update the WizardProgressBar
 */
class SearchView extends Component {

    constructor(props) {
        super(props);
        const parsed = queryString.parse(this.props.location.search);
        const {val} = parsed;
        this.state = {
            steps: [
                {key: 'users', icon: 'users', title: 'User', description: 'Select the user'},
                {key: 'repositories', icon: 'github', title: 'Repository', description: 'Select the repository'},
                {key: 'issues', icon: 'warning', title: 'Issue', description: 'Select or create issue'},
            ],
            currentStep: null,
            selectedUser: val,
            selectedRepository: {
                id: 0,
                object: {}
            },
            userList: [],
            repositoryList: [],
            repositoryIssues: [],
            selectedElement: {}
        };
        this.onNextClicked = this.onNextClicked.bind(this);
        this.onPreviousClicked = this.onPreviousClicked.bind(this);
        this.onCancelClicked = this.onCancelClicked.bind(this);
        this.onRepositoryClick = this.onRepositoryClick.bind(this);
    }

    /**
     * Sets the current step when the component did mount.
     */
    componentDidMount(props) {
        const parsed = queryString.parse(this.props.location.search);
        const {by} = parsed;
        let currentStep = 0;
        currentStep = by === 'users' ? 1 : 2;
        this.setState({
            currentStep,
            steps: this.updateProgressIndicator(currentStep)
        })
    }

    getCurrentStep() {
        const parsed = queryString.parse(this.props.location.search);
        const {by, val} = parsed;
        let currentStep;
        switch (this.state.currentStep) {
            case 1:
                currentStep = (
                    <WizardUserStep searchValue={val}/>
                );
                break;
            case 2:
                currentStep = (
                    <WizardRepositoryStep
                        onRepositoryClick={this.onRepositoryClick}
                        selectedRepository={this.state.selectedRepository}
                        searchValue={val}
                        searchBy={by}
                    />);
                break;
            default:
                const {selectedUser, selectedRepository} = this.state;
                currentStep = (
                    <WizardIssueStep
                        selectedUser={selectedUser}
                        selectedRepository={selectedRepository.object}/>);
                break;
        }
        return currentStep;
    }

    updateProgressIndicator(step) {
        const {currentStep, steps} = this.state;
        const wizardStep = step || currentStep;
        const updatedSteps = steps.map((updatedStep, index) => {
            if (index + 1 === wizardStep) {
                updatedStep.active = true;
                updatedStep.disabled = false;
            } else {
                updatedStep.active = false;
                updatedStep.disabled = true;
            }
            return updatedStep;
        });
        return updatedSteps;
    }

    onNextClicked() {
        const {currentStep} = this.state;
        if (currentStep >= 1 && currentStep < 3) {
            this.setState((prevState) => {
                return {
                    currentStep: prevState.currentStep + 1,
                    steps: this.updateProgressIndicator(prevState.currentStep + 1)
                }
            });
        }
    }

    onRepositoryClick(id, object) {
        this.setState({
            selectedRepository: {
                id,
                object
            }
        });
    }

    onPreviousClicked() {
        const {currentStep} = this.state;
        const wizardStep = currentStep - 1;
        if (wizardStep >= 1 && wizardStep <= 3) {
            this.setState(prevState => {
                return {
                    currentStep: wizardStep,
                    steps: this.updateProgressIndicator(wizardStep)
                }
            });
        }
    }

    onCancelClicked() {
        this.props.history.push("/main");
    }

    render() {
        const {currentStep, steps, userList} = this.state;
        const currentWizardStep = this.getCurrentStep();
        const actions = {
            onNextClicked: this.onNextClicked,
            onPreviousClicked: this.onPreviousClicked,
            onCancelClicked: this.onCancelClicked
        };
        const parsed = queryString.parse(this.props.location.search);
        const {by} = parsed;
        return (
            <Container>
                <Wizard
                    searchBy={by}
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
