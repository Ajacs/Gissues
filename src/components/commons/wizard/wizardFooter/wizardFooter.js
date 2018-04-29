import React from 'react';
import { Button, Grid } from 'semantic-ui-react';

const WizardFooter = ({actions}) => (
  <Grid.Row style={{ padding: '10px', display: 'inline-block'}}>
    <Button color="red" size='medium' floated="left">
      Cancelar
    </Button>
    <Button.Group floated="right" size='medium' >
      <Button>Anterior</Button>
      <Button.Or />
      <Button color="blue">Siguiente</Button>
    </Button.Group >
  </Grid.Row >
);

export default WizardFooter;
