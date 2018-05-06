import React from 'react';
import {List} from 'semantic-ui-react';

const IssueSidebarContent = ({issueList, actions}) => {
    return issueList.map((issue, index) => (
        <List.Item id={index} key={issue.id} onClick={actions.onIssueClick}>
            <List.Content id={index}>
                <List.Header>{issue.title}</List.Header>
            </List.Content>
        </List.Item>
    ));
};

export default IssueSidebarContent;
