class ApiClient{
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async get(endpoint){
        const response = await this.#send(endpoint, 'GET');
        return response;
    };

    async post(endpoint, body, token){
        const response = await this.#send(endpoint, 'POST', body, token);
        return response;
    };

    async #send(endpoint, method, body = null, token = null) {
        const options = {
            method: method,
            headers: {},
        }

        if(body !== null) {
            options.headers['Content-Type'] = 'application/json';
            options.headers.body = JSON.stringify(body);
        }

        if(token !== null) {
            options.headers['R-Auth'] = `${token}`;
        }

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            if(!response.ok) {
                throw new Error(`Fetch Error: ${response}`);
            } else {
                const data = await response.json();
                return data;
            }
        } catch(error) {
            console.log(error);
            return error;
        }
    }
}

export default ApiClient;