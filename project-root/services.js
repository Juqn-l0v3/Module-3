const baseURL = 'http://localhost:3000'

export async function get(path) {
    try {
        const response = await fetch(`${baseURL}${path}`);
        const data = await response.json();
        
        return data;
    } catch (err) {
        console.error(err);
    }
}

export async function post(path, obj) {
    try {
        const response = await fetch(`${baseURL}${path}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            const error_text = await response.text();
            throw new Error(`Error ${response.status}: ${error_text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en POST:", error.message || error);
        throw error;
    }
}

export async function put(path, id, obj) {
    try {
        const response = await fetch(`${baseURL}${path}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            const error_text = await response.text();
            throw new Error(`Error ${response.status}: ${error_text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en PUT:", error.message || error);
        throw error;
    }
}


export async function deletes(path, id) {
    try {
        const response = await fetch(`${baseURL}${path}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const error_text = await response.text();
            throw new Error(`Error ${response.status}: ${error_text}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en DELETE:", error.message || error);
        throw error;
    }
}