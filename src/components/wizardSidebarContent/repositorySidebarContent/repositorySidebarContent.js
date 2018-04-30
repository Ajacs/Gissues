import React from 'react';
import { Image, Label, List } from 'semantic-ui-react';
const RepositorySidebarContent = ({repositoryList}) => {
  return repositoryList.map( repository => (
      <List.Item key={repository.id}>
        <List.Content>
          <List.Header>{repository.name}</List.Header>
        </List.Content>
      </List.Item>
    ));
};

export default RepositorySidebarContent;
