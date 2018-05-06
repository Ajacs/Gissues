import React from 'react';
import {List, Loader} from 'semantic-ui-react';

const IssueSidebarContent = ({issueList, actions, fetching}) => {
    let body = issueList.map((issue, index) => (
        <List.Item id={index} key={issue.id} onClick={actions.onIssueClick}>
            <List.Content id={index}>
                <List.Header>{issue.title}</List.Header>
            </List.Content>
        </List.Item>
    ));
    if(fetching) {
        body = <Loader size='big'>Loading</Loader>;
    }
    return (body);
};

export default IssueSidebarContent;
