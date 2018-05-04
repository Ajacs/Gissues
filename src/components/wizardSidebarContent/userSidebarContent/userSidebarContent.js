import React from 'react';
import {Image, List} from 'semantic-ui-react';

const UserSidebarContent = ({userList}) => {
    return userList.map(user => (
        <List.Item>
            <Image avatar src={user.avatar_url}/>
            <List.Content>
                <List.Header>{user.name || user.login}</List.Header>
            </List.Content>
        </List.Item>
    ));
};

export default UserSidebarContent;
