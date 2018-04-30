import React, { Component } from 'react';
import PropTypes from 'proptypes';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
// @components
import RepositorySidebarContent from 'components/wizardSidebarContent/repositorySidebarContent/repositorySidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';

// @services
import { listUserRepositories } from 'services/api';

class RepositoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositoryList: []
    }
  }

  componentDidMount() {
    const { searchValue } = this.props;
    if(searchValue) {
      listUserRepositories({user: searchValue}).then( response => {
        this.setState({
          repositoryList: response
        });
      });
    }
  }

  getBody() {
    if(this.state.repositoryList.length) {
      const { repositoryList } = this.state;
      const repository = repositoryList;
        return (
          <Container text style={{textAlign: 'center'}}>
          <Header size='huge'>{repository.name}</Header>
        </Container>
      );
    }
  }

  render() {
    const wizardBodyStyle = {
      padding: '20px'
    };

    return (
      <Grid.Row divided>
        <WizardSidebar title="Repositorios">
          <RepositorySidebarContent repositoryList={this.state.repositoryList}/>
        </WizardSidebar>
        <Grid.Column width={13} style={wizardBodyStyle}>
          {this.getBody()}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

RepositoryView.propTypes = {
  searchValue: PropTypes.string
}

export default RepositoryView;
