const systemConfiguration = {
    baseHost: 'https://api.github.com/',
    api: {
        pageSize: 10,
        endpoints: {
            'users': '/users/{user}',
            'userRepositories': '/users/{user}/repos',
            'repositories': '/repos',
            'repositoryIssues': '/repos/{user}/{repository}/issues',
            'issuesCreate': '/repos/{user}/{repo}/issues',
            'authorization': '/authorizations',
            'authorizationDelete': '/authorizations/{authorizationId}'
        }
    }
};

export default systemConfiguration;
