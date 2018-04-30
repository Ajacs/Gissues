import config from 'config/configuration';
import _ from 'lodash';

/**
 * It adds a trailing slash if there isn't one
 */
const normalizeHost = host => {
    if( host.substr(-1) !== '/' ){
        return host + '/';
    }
    return host;
};

/**
 * It removes the slash in the front of the endpoint if there is one
 */
const normalizeEndpoint = endpoint => {
    if( endpoint.substr(0,1) === '/' ){
        return endpoint.substr(1);
    }
    return endpoint;
};

const buildUrl = (path, params) => {
  const { api: { endpoints: endpoints }, baseHost } = config;
  const url = `${normalizeHost(baseHost)}${normalizeEndpoint(endpoints[path])}`;

  if( !params || _.isEmpty(params) ){
    return url;
  }

  let urlWithParams = url;

  _.forOwn(params, (paramValue, paramName) => {
    console.log("PARAMS:");
    console.log(paramValue);
    console.log(paramName);
      urlWithParams = urlWithParams.replace(`{${paramName}}`, paramValue);
  });
  console.log(urlWithParams);
  return urlWithParams;
}

const baseRequest = (path, method, params) => {
  const url = buildUrl(path, params);
  return fetch(url, {
    method
  })
    .then( response => response.json())
    .catch( error => console.log(error)); // Just log the error for the moment
}

const createIssue = (params) => {
  return baseRequest('issuesCreate', 'POST', params);
};

const listRepositoryIssues = params => {
  return baseRequest('repositoryIssues', 'GET', params);
};

const listUsers = params => {
  console.log('listUser params = >', params);
  return baseRequest('users', 'GET', params);
};

const userDetail = () => {

};

const listRepositories = () => {
  return baseRequest('repositories', 'GET');
}

const repositoryDetail = () => {

};

export default listUsers;
