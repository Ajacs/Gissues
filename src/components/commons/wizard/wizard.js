import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';
import PropTypes from 'proptypes';
import {
  Divider,
  Grid,
  List,
  Image,
  Header,
  Label,
  Segment,
  Button
} from 'semantic-ui-react';

class Wizard extends Component {

  constructor(props) {
    super(props);
  }

  createUserList() {
    const userList = [
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/helen.jpg',
        name: 'Helen'
      },
      {
        avatarUrl: 'https://react.semantic-ui.com/assets/images/avatar/small/christian.jpg',
        name: 'Christian'
      }
    ];
    return userList.map( user => (
      <List.Item>
        <Image avatar src={user.avatarUrl} />
        <List.Content>
          <List.Header>{user.name}</List.Header>
        </List.Content>
      </List.Item>
    ));
  }

  render() {
    const {
      fluid,
      steps
    } = this.props;
    const bodyStyle = {
      border: '1px solid rgba(34, 36, 38, 0.15)',
      borderTop: 'none',
      marginBottom: 0
    };

    const footerStyle = {
      border: '1px solid rgba(34, 36, 38, 0.15)',
      borderTop: 'none',
      paddingTop: '10'
    }

    const wizardStyle = {
      margin: '20px'
    };

    const stepStyle = {
      marginBottom: '0'
    };

    const bodyHeaderStyle = {
        height: '50px'
    };

    const gridStyle = {
      margin: '0'
    };

    const wizardBodyStyle = {
      padding: '20px'
    };

    const actionButtonsStyle = {
      float: 'right'
    }
    // =========================================================

    // =========================================================

    const userList = this.createUserList();
    return (
      <div style={wizardStyle}>
        <Step.Group
          attached='top'
          style={stepStyle}
          fluid={fluid}
          items={steps} />
          <Segment attached style={{padding: '0px'}}>

            <Grid celled centered stretched style={{margin: '0px 0px'}}>
              <Grid.Row divided>
                <Grid.Column width={3}>
                  <section style={{overflowY: 'auto', height: '400px'}}>
                    <Header as='h1' className="centered" style={{marginTop: '14px'}}>Issues</Header>
                    <List animated divided selection verticalAlign='middle'>
                      {userList}
                    </List>
                  </section>
                </Grid.Column>
                <Grid.Column width={13} style={wizardBodyStyle}>
                  <section style={bodyHeaderStyle}></section>
                  {this.props.children}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ padding: '10px', display: 'inline-block'}}>
                <Button color="red" size='medium' floated="left">Cancelar</Button>
                <Button.Group floated="right" size='medium' >
                  <Button>Anterior</Button>
                  <Button.Or />
                  <Button color="blue">Siguiente</Button>
                </Button.Group>
              </Grid.Row>
            </Grid>
          </Segment>
      </div>
    );
  }

}

Wizard.propTypes = {
  steps: PropTypes.array,
  fluid: PropTypes.boolean
}

Wizard.defaultProps = {
  fluid: true
}

export default Wizard
