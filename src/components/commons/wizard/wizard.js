import React, {Component} from 'react';
import {Step} from 'semantic-ui-react';
import PropTypes from 'proptypes';
import {
    Grid,
    Segment
} from 'semantic-ui-react';
import WizardFooter from 'components/commons/wizard/wizardFooter/wizardFooter';

class Wizard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            actions,
            fluid,
            steps,
            currentStep
        } = this.props;
        const bodyStyle = {
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderTop: 'none',
            marginBottom: 0
        };

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
                    items={steps}/>
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
    fluid: PropTypes.boolean,
    currentStep: PropTypes.number,
    sidebarData: PropTypes.array,
    dataList: PropTypes.array,
    actions: PropTypes.array
};

Wizard.defaultProps = {
    fluid: true
};

export default Wizard
