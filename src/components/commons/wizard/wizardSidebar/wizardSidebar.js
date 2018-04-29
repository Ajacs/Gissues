import React from 'react';
import {
  Grid,
  Header,
  List
} from 'semantic-ui-react';

const WizardSidebar = ({title, children}) => (
  <Grid.Column width={3}>
    <section style={{overflowY: 'auto', height: '400px'}}>
      <Header as='h1' className="centered" style={{marginTop: '14px'}}>{title}</Header>
      <List animated divided selection verticalAlign='middle'>
        {children}
      </List>
    </section>
  </Grid.Column>
);

export default WizardSidebar;
