import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { SEARCH_BY } from 'constants/searchTypes';
import classNames from 'classnames';

const WizardFooter = ({actions, searchBy, currentStep}) => {
    let visibleOrBackButtons = true;
    let visibleNextButton = true;

    if ( currentStep === 2 && searchBy === SEARCH_BY.REPOSITORIES) {
        visibleOrBackButtons = false;
    } else if(currentStep === 1 && searchBy === SEARCH_BY.USERS) {
        visibleOrBackButtons = false;
    } else if( currentStep === 3) {
        visibleNextButton = false;
    }

    return (
        <Grid.Row style={{ padding: '10px', display: 'inline-block'}}>
            <Button
                onClick={actions.onCancelClicked}
                color="red"
                size='medium'
                floated="left">
                Cancelar
            </Button>
            <Button.Group floated="right" size='medium' >
                <Button style={{visibility: visibleOrBackButtons ? 'visible' : 'hidden'}} onClick={actions.onPreviousClicked}>Anterior</Button>
                <Button.Or style={{visibility: visibleOrBackButtons ? 'visible' : 'hidden'}} />
                <Button
                    style={{visibility: visibleNextButton ? 'visible' : 'hidden'}}
                    color="blue"
                    onClick={actions.onNextClicked}>Siguiente</Button>
            </Button.Group >
        </Grid.Row >
    );
}

export default WizardFooter;
