import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Grid,
    Header,
    Label,
    Statistic,
    Icon
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// @components
import RepositorySidebarContent
    from 'components/wizardSidebarContent/repositorySidebarContent/repositorySidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';
// @ constants
import  { SEARCH_BY } from 'constants/searchTypes';

import { fetchRepositories, selectRepository } from 'actions/repository';

// @services
import { listUserRepositories } from 'services/api';

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
            searchBy ,
            searchValue,
            selectRepository
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

    getRepositoryStatistics(repository) {
        const {forks, open_issues, stargazers_count, watchers} = repository;
        return (
            <div>
                <Statistic.Group widths='four'>
                    <Statistic>
                        <Statistic.Value>{forks}</Statistic.Value>
                        <Statistic.Label>Forks</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>{open_issues}</Statistic.Value>
                        <Statistic.Label>Open Issues</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>
                            <Icon name='eye'/>
                            {watchers}
                        </Statistic.Value>
                        <Statistic.Label>Watchers</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>
                            <Icon name='star'/>
                            {stargazers_count}
                        </Statistic.Value>
                        <Statistic.Label>Stargazers Count</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </div>
        )
    }

    getBody() {
        const { immRepository } = this.props;
        const repositoryList = immRepository.get('repositories').toJS();
        if (repositoryList.length) {
            const repository = immRepository.get('selectedRepository').toJS();
            const haveIssues = repository.has_issues;
            const statistics = this.getRepositoryStatistics(repository);
            return (
                <Container text style={{textAlign: 'center'}}>
                    <Header size='huge'>{repository.name}</Header>
                    <p>{repository.description}</p>
                    {statistics}
                    <section>
                        {this.getIssuesLabel(haveIssues)}
                        <Label as='a' color='teal' tag>{repository.language}</Label>
                    </section>
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
        const { immRepository } = this.props;
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