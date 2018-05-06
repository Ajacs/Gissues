// @ vendor
import React, {Component} from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Input,
    Label,
    Message,
    TextArea
} from 'semantic-ui-react';
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// @ components
import IssueSidebarContent from 'components/wizardSidebarContent/issueSidebarContent/issueSidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';
// @ actions
import {
    createRepositoryIssue,
    fetchRepositoryIssues,
    selectIssue,
    showCreateRepositoryView
} from 'actions/repository';

class IssueView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            showCreateView: false
        };
        this.onChange = this.onChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleOnIssueClick = this.handleOnIssueClick.bind(this);
        this.handleOnCreateClick = this.handleOnCreateClick.bind(this);
    }

    componentDidMount() {
        const {fetchRepositoryIssues} = this.props;
        fetchRepositoryIssues();
    }

    onChange(event) {
        const {target: {name, value},} = event;
        this.setState({[name]: value});
    }

    onFormSubmit() {
        const {title, body} = this.state;
        const data = {
            body,
            title
        };
        this.props.createRepositoryIssue(data);
    }

    getCreateIssueBody() {
        const { immRepository } = this.props;
        const loading = immRepository.get('fetching');
        const success = immRepository.get('success');
        const color = success ? 'green' : 'red';
        const buttonText = success ? 'Created!' : 'Create';
        return (
            <div>
                <Header as="h1">New Issue to: {immRepository.getIn(['selectedRepository', 'name'])}</Header>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            name='title'
                            label='Title'
                            placeholder='Title'
                            onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Field
                        onChange={this.onChange}
                        control={TextArea}
                        name='body'
                        label='Description'
                        placeholder='Tell us more about the issue...'/>
                    <Form.Field
                        floated="right"
                        color={color}
                        loading={loading}
                        control={Button}>
                        {buttonText}
                    </Form.Field>
                </Form>
            </div>
        )
    }

    getBody() {
        const {immRepository} = this.props;
        const showCreateView = immRepository.get('showCreationView');
        const body = showCreateView ? this.getCreateIssueBody() : this.getIssueDetailBody();
        return (<div>{body}</div>);
    }

    getIssueData(properties) {
        const {immRepository} = this.props;
        let issueData = {};
        properties.forEach(property => {
            issueData[property] = immRepository.getIn(['selectedIssue', property]) || null;
        });
        return issueData;
    }

    getIssueDetailBody() {
        //@TODO: Needs refactor
        const {title, body, labels} = this.getIssueData(['title', 'body', 'labels']);
        const { immRepository } = this.props;
        let issueLabelsSection = null;
        if (labels) {
            if (labels.size) {
                const issueLabels = labels.toJS().map(label => (
                    <Label tag style={{backgroundColor: `#${label.color}`, color: '#FFF'}}>{label.name}</Label>
                ));
                issueLabelsSection = (
                    <div>
                        <Header as="h3" style={{marginTop: '20px', marginBottom: '10px'}}>Labels</Header>
                        {issueLabels}
                    </div>
                );
            }
        }

        const issueBody = (
            <div>
                <Header as="h3" style={{marginTop: '20px', marginBottom: '10px'}}>Description</Header>
                {body}
                {issueLabelsSection}
            </div>
        );

        const headerBody = (
            <div>
                <Header as="h3" style={{marginTop: '20px', marginBottom: '10px'}}>Title</Header>
                {title}
            </div>
        );
        let header = headerBody;
        let content = issueBody;
        let error = false;
        if(immRepository.get('selectedRepositoryIssues').size  === 0) {
            header = 'Yay! we have no issues!';
            content = 'We are very happy, because everything is going well!';
            error = true;
        };
        return immRepository.get('fetching') ? null : (
            <Message
                error={error}
                header={header}
                content={content}
            />
        )
    }

    handleOnIssueClick(event, data) {
        this.props.selectIssue(data.id);
    }

    handleOnCreateClick() {
        this.props.showCreateRepositoryView();
    }

    render() {
        const wizardBodyStyle = {
            padding: '20px'
        };
        const {immRepository} = this.props;
        const issueList = immRepository.get('selectedRepositoryIssues');
        const actions = {
            onIssueClick: this.handleOnIssueClick
        };
        return (
            <Grid.Row divided>
                <WizardSidebar title="Issues">
                    <IssueSidebarContent
                        fetching={immRepository.get('fetching')}
                        issueList={issueList.toJS()}
                        actions={actions}
                    />
                </WizardSidebar>
                <Grid.Column width={13} style={wizardBodyStyle}>
                    <Grid.Row>
                        <Button
                            style={{marginBottom: '10px'}}
                            floated="right"
                            primary
                            onClick={this.handleOnCreateClick}>Create Issue</Button>

                    </Grid.Row>
                    <Grid.Row>
                        {this.getBody()}
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

IssueView.propTypes = {
    createRepositoryIssue: PropTypes.func,
    fetchRepositoryIssues: PropTypes.func,
    selectedRepository: PropTypes.object,
    selectedUser: PropTypes.string,
    selectIssue: PropTypes.func,
    showCreateRepositoryView: PropTypes.func
};

export default withRouter(connect(
    state => ({
        immRepository: state.repository
    }), {
        createRepositoryIssue: createRepositoryIssue,
        fetchRepositoryIssues: fetchRepositoryIssues,
        selectIssue: selectIssue,
        showCreateRepositoryView: showCreateRepositoryView
    }
)(IssueView));