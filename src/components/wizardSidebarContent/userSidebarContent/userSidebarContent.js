import React from 'react';
import {Image, List} from 'semantic-ui-react';

const UserSidebarContent = ({user}) => {
    return (
        <List.Item>
            <Image avatar src={user.get('avatar_url')}/>
            <List.Content>
                <List.Header>{user.get('name') || user.get('login')}</List.Header>
            </List.Content>
        </List.Item>
    );
};

export default UserSidebarContent;
