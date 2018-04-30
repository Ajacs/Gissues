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
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';
import WizardFooter from 'components/commons/wizard/wizardFooter/wizardFooter';
import UserSidebarContent from 'components/wizardSidebarContent/userSidebarContent/userSidebarContent';

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
    return <UserSidebarContent userList={userList}/>
  }

  getSidebarTitle() {
    let sidebarTitle = '';
    switch (this.props.currentStep) {
      case 1:
        sidebarTitle = 'Users'; //TODO: All this 'hardcoded' strings need to be in the locale file, using i18n
        break;
      case 2:
        sidebarTitle = 'Repositories';
        break;
      default:
        sidebarTitle = 'Issues';
        break;

    }
    return sidebarTitle;
  }

  getSidebarbody() {
    let sidebarBody = '';
    switch (this.props.currentStep) {
      case 1:
        sidebarBody = this.createUserList();
        break;
      case 2:
        sidebarBody = 'Repositories';
        break;
      default:
        sidebarBody = 'Issues';
        break;

    }
    return sidebarBody;
  }

  render() {
    const {
      fluid,
      steps,
      currentStep
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
    const sidebarTitle = this.getSidebarTitle();
    const sidebarBody = this.getSidebarbody();

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
                <WizardSidebar title={sidebarTitle}>
                  {sidebarBody}
                </WizardSidebar>
                <Grid.Column width={13} style={wizardBodyStyle}>
                  <section style={bodyHeaderStyle}></section>
                  {this.props.children}
                </Grid.Column>
              </Grid.Row>
                <WizardFooter />
            </Grid>
          </Segment>
      </div>
    );
  }

}

Wizard.propTypes = {
  steps: PropTypes.array,
  fluid: PropTypes.boolean,
  currentStep: PropTypes.number,
  sidebarData: PropTypes.array
}

Wizard.defaultProps = {
  fluid: true
}

export default Wizard
