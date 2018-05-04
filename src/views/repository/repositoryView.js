import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Container, Grid, Header, Image, Label, Statistic, Icon } from 'semantic-ui-react';
// @components
import RepositorySidebarContent from 'components/wizardSidebarContent/repositorySidebarContent/repositorySidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';

// @services
import { listUserRepositories, listRepositories } from 'services/api';

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryList: []
    }
    this.onRepositoryClick = this.onRepositoryClick.bind(this);
  }

  componentDidMount() {
    const { searchValue, searchBy } = this.props;
    if(searchValue) {
      if(searchBy === 'repositories') { // search only by repository name
        // TODO : this needs the owner of the repository listRepositories({})
      } else { // search by user -> repositories
        listUserRepositories({user: searchValue}).then( response => {
          this.setState({
            repositoryList: response
          });
        });
      }
    }
  }

  getIssuesLabel(hasIssues) {
    const color = hasIssues ? 'red' : 'green';
    const label = hasIssues ? 'This repository have issues' : 'This repository has no issues';
    return <Label as='a' color={color} tag>{label}</Label>
  }

  getRepositoryStatistics(repository) {
    const { forks, open_issues, stargazers_count, watchers } = repository;
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
              <Icon name='eye' />
              {watchers}
            </Statistic.Value>
            <Statistic.Label>Watchers</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name='star' />
              {stargazers_count}
            </Statistic.Value>
            <Statistic.Label>Stargazers Count</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    )
  }

  getBody() {
    if(this.state.repositoryList.length) {
      const { repositoryList } = this.state;
      const { selectedRepository } = this.props;
      const repository = repositoryList[selectedRepository.id];
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
    const { repositoryList } = this.state;
    if(repositoryList.length){
      const repository  = repositoryList[data.id];
      this.props.onRepositoryClick(data.id, repository);
    }
  }

  render() {
    const wizardBodyStyle = {
      padding: '20px'
    };
    const actions = {
      onRepositoryClick: this.onRepositoryClick
    };
    return (
      <Grid.Row divided>
        <WizardSidebar title="Repositorios">
          <RepositorySidebarContent actions={actions} repositoryList={this.state.repositoryList}/>
        </WizardSidebar>
        <Grid.Column width={13} style={wizardBodyStyle}>
          {this.getBody()}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

RepositoryView.propTypes = {
  searchValue: PropTypes.string,
  onRepositoryClick: PropTypes.func,
  selectedRepository: PropTypes.number,
  searchBy: PropTypes.string
};

export default RepositoryView;
