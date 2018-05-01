// @ vendor
import React, { Component } from 'react';
import { Form, Grid, Header, Input, TextArea, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
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
      <Form>
      <Header as='h1'>New Issue</Header>
      <Form.Group widths='equal'>
        <Form.Field id='form-input-control-last-name' control={Input} label='Last name' placeholder='Title' />
      </Form.Group>
      <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Description' placeholder='Description' />
      <Form.Field id='form-button-control-public' control={Button} content='Create' color="blue" pull="right" />
        </Form>
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
  selectedRepository: PropTypes.object
}

export default IssueView
