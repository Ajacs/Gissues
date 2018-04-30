import React from 'react';
import { Image, Label, List } from 'semantic-ui-react';
const UserSidebarContent = ({userList}) => {
  return userList.map( user => (
      <List.Item>
        <Image avatar src={user.avatarUrl} />
        <List.Content>
          <List.Header>{user.name} <Label style={{float: 'right'}} circular color="green" empty /></List.Header>
        </List.Content>
      </List.Item>
    ));
};

export default UserSidebarContent;
