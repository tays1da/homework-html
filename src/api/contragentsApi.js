const API_BASE_URL = '/api/contragents';

async function request(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function getContragents() {
    return request(API_BASE_URL);
}

export function createContragent(payload) {
    return request(API_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
}

export function updateContragent(id, payload) {
    return request(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    });
}

export function deleteContragent(id) {
    return request(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
    });
}
