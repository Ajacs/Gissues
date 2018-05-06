import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Header,
    Label,
    Message
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// @components
import RepositorySidebarContent
    from 'components/wizardSidebarContent/repositorySidebarContent/repositorySidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';

// @actions
import {fetchRepositories, selectRepository} from 'actions/repository';

class RepositoryView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositoryList: []
        };
        this.onRepositoryClick = this.onRepositoryClick.bind(this);
    }

    componentDidMount() {
        const {
            fetchRepositories,
            searchBy,
            searchValue
        } = this.props;
        const requestData = {
            searchBy,
            searchValue
        };
        fetchRepositories(requestData);
    }

    getIssuesLabel(hasIssues) {
        const color = hasIssues ? 'red' : 'green';
        const label = hasIssues ? 'This repository have issues' : 'This repository has no issues';
        return <Label as='a' color={color} tag>{label}</Label>
    }

    getBody() {
        const {immRepository} = this.props;
        const repositoryList = immRepository.get('repositories').toJS();
        if (repositoryList.length) {
            const repository = immRepository.get('selectedRepository');
            const haveIssues = repository.get('open_issues_count');
            return (
                <Container style={{textAlign: 'center'}}>
                    <Message>
                        <Header size='huge'>{repository.get('name')}</Header>
                        <p>{repository.get('description')}</p>
                        <section>
                            {this.getIssuesLabel(haveIssues)}
                            <Label as='a' color='teal' tag>{repository.get('language') || 'NA'}</Label>
                        </section>
                    </Message>
                </Container>
            );
        }
    }

    onRepositoryClick(event, data) {
        this.props.selectRepository(data.id);
    }

    render() {
        const wizardBodyStyle = {
            padding: '20px'
        };
        const actions = {
            onRepositoryClick: this.onRepositoryClick
        };
        const {immRepository} = this.props;
        let repositories = immRepository.get('repositories').toJS();
        return (
            <Grid.Row divided>
                <WizardSidebar title="Repositories">
                    <RepositorySidebarContent actions={actions} repositoryList={repositories}/>
                </WizardSidebar>
                <Grid.Column width={13} style={wizardBodyStyle}>
                    {this.getBody()}
                </Grid.Column>
            </Grid.Row>
        )
    }
}

RepositoryView.propTypes = {
    fetchUserRepositories: PropTypes.func,
    immRepository: PropTypes.object,
    immSearch: PropTypes.object,
    immUser: PropTypes.object,
    onRepositoryClick: PropTypes.func,
    searchBy: PropTypes.string,
    searchValue: PropTypes.string,
    selectedRepository: PropTypes.object,
    selectRepository: PropTypes.func
};

export default withRouter(connect(
    state => ({
        immRepository: state.repository,
        immSearch: state.search,
        immUser: state.user
    }), {
        fetchRepositories: fetchRepositories,
        selectRepository: selectRepository
    }
)(RepositoryView));