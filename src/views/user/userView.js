import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
// @components
import UserSidebarContent from 'components/wizardSidebarContent/userSidebarContent/userSidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';

// @services
import { listUsers } from 'services/api';

class Userview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    }
  }

  componentDidMount() {
    const { searchValue } = this.props;
    if(searchValue) {
      listUsers({user: searchValue}).then( response => {
        this.setState({
          userList: [response]
        });
      });
    }
  }

  getBody() {
    if(this.state.userList.length) {
      const { userList } = this.state;
      const user = userList[0];
        return (
          <Container text style={{textAlign: 'center'}}>
          <Image className="centered" src={user.avatar_url} size='small' circular />
          <Header size='huge'>{user.name || user.login}</Header>
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
        <WizardSidebar title="Users">
          <UserSidebarContent userList={this.state.userList}/>
        </WizardSidebar>
        <Grid.Column width={13} style={wizardBodyStyle}>
          {this.getBody()}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

Userview.propTypes = {
  searchValue: PropTypes.string
};

export default Userview;
