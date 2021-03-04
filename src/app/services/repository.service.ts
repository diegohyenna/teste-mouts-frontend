export class RepositoryService {
  baseUrl = 'https://test-mouts.herokuapp.com/';

  protected fetchAPI(url: string, options: any, errorMessage: string) {
    return fetch(url, options)
      .then((response) => response.json())
      .then((response) => ({
        error: false,
        result: response,
      }))
      .catch(() => ({
        error: true,
        message: errorMessage,
      }));
  }

  protected get(url: string, errorMessage: string) {
    let options = { method: 'GET' };

    return this.fetchAPI(url, options, errorMessage);
  }

  protected post(url: string, errorMessage: string, body: {}) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    body = JSON.stringify(body);

    let options = {
      method: 'POST',
      headers: myHeaders,
      body: body,
    };

    return this.fetchAPI(url, options, errorMessage);
  }

  protected put(url: string, errorMessage: string, body: {}) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    body = JSON.stringify(body);

    let options = {
      method: 'PUT',
      headers: myHeaders,
      body: body,
    };

    return this.fetchAPI(url, options, errorMessage);
  }

  protected delete(url: string, errorMessage: string) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let options = {
      method: 'DELETE',
      headers: myHeaders,
    };

    return this.fetchAPI(url, options, errorMessage);
  }
}
