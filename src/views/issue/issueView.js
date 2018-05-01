// @ vendor
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'proptypes';
// @ components
import IssueSidebarContent from 'components/wizardSidebarContent/issueSidebarContent/issueSidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';
// @services
import { listRepositoryIssues } from 'services/api';

class IssueView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueList: []
    }
  }

  componentDidMount() {
    const { selectedUser, selectedRepository } = this.props;
    listRepositoryIssues({user: selectedUser, repository: selectedRepository.name})
      .then(response => {
        this.setState({
          issueList: response
        })
      });
  }

  getBody() {
    return (
      <div>
        <h1>This is the body of the issue</h1>
      </div>
    )
  }

  render() {
    const wizardBodyStyle = {
      padding: '20px'
    };

    return (
      <Grid.Row divided>
        <WizardSidebar title="Issues">
          <IssueSidebarContent issueList={this.state.issueList}/>
        </WizardSidebar>
        <Grid.Column width={13} style={wizardBodyStyle}>
          {this.getBody()}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

IssueView.propTypes = {
  selectedUser: PropTypes.string,
  selectedRepository: PropTypes.string
}

export default IssueView
