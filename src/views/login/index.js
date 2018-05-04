import React from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
    Image,
    Segment,
    Loader
} from 'semantic-ui-react'
import { Redirect } from  'react-router-dom';
import gissuesLogo from 'gissues.png';


const checkForUserLogged = (userLogged) => {
    return userLogged ? <Redirect to="/search" /> : null;
};

const LoginForm = ({onSubmit, onChange, fetching, userLogged}) => {

    checkForUserLogged();

    let mainBody  = null;
    if(fetching) {
        mainBody = (<Loader style={{marginTop: '22%'}} size='massive' active inline='centered'>Loading</Loader>);
    } else {
        mainBody =         (
            <div className='login-form'>
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image style={{width: '90%'}} src={gissuesLogo}/>
                        </Header>
                        <Form size='large' onSubmit={onSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name='username'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    onChange={onChange}
                                />
                                <Form.Input
                                    fluid
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={onChange}
                                />

                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
    return mainBody;
};

export default LoginForm