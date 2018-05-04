// @ vendor
import React, { Component } from 'react';
import {
  Grid,
    Form,
    Input,
    TextArea,
    Button
} from 'semantic-ui-react';
import PropTypes from 'proptypes';
// @ components
import IssueSidebarContent from 'components/wizardSidebarContent/issueSidebarContent/issueSidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';
// @services
import { createIssue, listRepositoryIssues } from 'services/api';

class IssueView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueList: [],
      title: '',
      body: '',
      successful: false
    };
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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

  onChange(event) {
    const { target: { name, value }, } = event;
    this.setState({[name]: value});
  }

  onFormSubmit() {
    const { title, body } = this.state;
    const { selectedUser, selectedRepository } = this.props;
    const data = {
      body,
      user: selectedUser,
      repo: selectedRepository,
      title
    };
    createIssue({title, body}).then(() => {
      this.setState({
        successful: true
      })
    })
  }

  getBody() {
    let body = <h1>Issue created!</h1>;
    if(!this.state.successful) {
      body = (
        <div>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
            control={Input}
            name='title'
            label='Title'
            placeholder='Title'
            onChange={this.onChange} />
          </Form.Group>
          <Form.Field
          onChange={this.onChange}
          control={TextArea}
          nanme='body'
          label='Description'
          placeholder='Tell us more about the issue...' />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
        </div>
      )
    }
    return body;
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
};

export default IssueView
