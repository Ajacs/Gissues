import React from 'react';
import { List } from 'semantic-ui-react';
const RepositorySidebarContent = ({repositoryList, actions}) => {
  return repositoryList.map( (repository, index) => (
      <List.Item id={index} key={repository.id} onClick={actions.onRepositoryClick}>
        <List.Content id={index}>
          <List.Header>{repository.name}</List.Header>
        </List.Content>
      </List.Item>
    ));
};

export default RepositorySidebarContent;
