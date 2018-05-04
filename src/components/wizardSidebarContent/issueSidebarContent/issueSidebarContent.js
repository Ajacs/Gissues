import React from 'react';
import {List} from 'semantic-ui-react';

const IssueSidebarContent = ({issueList}) => {
    return issueList.map((issue, index) => (
        <List.Item id={index} key={issue.id}>
            <List.Content id={index}>
                <List.Header>{issue.title}</List.Header>
            </List.Content>
        </List.Item>
    ));
};

export default IssueSidebarContent;
