import React, { Component } from 'react';
import { Step } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {
  Grid,
  Segment
} from 'semantic-ui-react';
import WizardFooter from 'components/commons/wizard/wizardFooter/wizardFooter';
import UserSidebarContent from 'components/wizardSidebarContent/userSidebarContent/userSidebarContent';

class Wizard extends Component {

  createUserList() {
    const { dataList } = this.props;
    return <UserSidebarContent userList={dataList}/>
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
      actions,
      fluid,
      steps
    } = this.props;

    const wizardStyle = {
      margin: '20px'
    };

    const stepStyle = {
      marginBottom: '0'
    };

    return (
      <div style={wizardStyle}>
        <Step.Group
          attached='top'
          style={stepStyle}
          fluid={fluid}
          items={steps} />
          <Segment attached style={{padding: '0px'}}>
            <Grid celled centered stretched style={{margin: '0px 0px'}}>
                {this.props.children}
                <WizardFooter actions={actions}/>
            </Grid>
          </Segment>
      </div>
    );
  }

}

Wizard.propTypes = {
  steps: PropTypes.array,
  fluid: PropTypes.bool,
  currentStep: PropTypes.number,
  sidebarData: PropTypes.array,
  dataList: PropTypes.array,
  actions: PropTypes.object
}

Wizard.defaultProps = {
  fluid: true
}

export default Wizard
