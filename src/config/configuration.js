const systemConfiguration = {
    baseHost: 'https://api.github.com/',
    api: {
        pageSize: 10,
        endpoints: {
            'users': '/users/{username}',
            'userRepositories': '/users/{username}/repos',
            'repositories': '/repos',
            'repositoriesSearch': '/search/repositories?q={repository}&sort=stars&order=desc',
            'repositoryIssues': '/repos/{user}/{repository}/issues',
            'issuesCreate': '/repos/{user}/{repository}/issues',
            'authorization': '/authorizations',
            'authorizationDelete': '/authorizations/{authorizationId}'
        }
    }
};

export default systemConfiguration;
