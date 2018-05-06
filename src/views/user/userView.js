// @vendor
import React, {Component} from 'react';
import PropTypes from 'proptypes';
import {
    Container,
    Grid,
    Header,
    Image,
    Message
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
// @components
import UserSidebarContent from 'components/wizardSidebarContent/userSidebarContent/userSidebarContent';
import WizardSidebar from 'components/commons/wizard/wizardSidebar/wizardSidebar';

// @actions
import {fetchUserData} from 'actions/user';

class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }

    componentDidMount() {
        const {searchValue} = this.props;
        this.props.fetchUserData({username: searchValue});
    }

    getBody() {
        const {immUser} = this.props;
        const user = immUser.get('user');
        return (
            <Container style={{textAlign: 'center'}}>
                <Message>
                    <Image className="centered" src={user.get('avatar_url')} size='small' circular/>
                    <Header size='huge'>{user.get('name') || user.get('login')}</Header>
                </Message>
            </Container>
        );

    }

    render() {
        const { immUser } = this.props;
        const user = immUser.get('user');
        const wizardBodyStyle = {
            padding: '20px'
        };

        return (
            <Grid.Row divided>
                <WizardSidebar title="Users">
                    <UserSidebarContent user={user}/>
                </WizardSidebar>
                <Grid.Column width={13} style={wizardBodyStyle}>
                    {this.getBody()}
                </Grid.Column>
            </Grid.Row>
        )
    }
}

UserView.propTypes = {
    immSearch: PropTypes.object,
    fetchUserData: PropTypes.func,
    searchValue: PropTypes.string
};

export default withRouter(connect(
    state => ({
        immUser: state.user,
        immSearch: state.search
    }),
    {
        fetchUserData: fetchUserData
    }
)(UserView));