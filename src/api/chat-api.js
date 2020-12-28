const BASE_URL = 'http://localhost:8080/api';


export async function getRooms() {
    try {
        const response = await fetch(`${BASE_URL}/rooms`);
        return await response.json();
    } catch(e) {
        console.log('Cannot fetch rooms with error', e);
    }
}

export async function getRoomsDetails(id) {
    try {
        const response = await fetch(`${BASE_URL}/rooms/${id}`);
        return await response.json();
    } catch(e) {
        console.log('Cannot fetch rooms with error', e);
    }
}

export async function getChatMessages(id) {
    try {
        const response = await fetch(`${BASE_URL}/rooms/${id}/messages`);
        return await response.json();
    } catch(e) {
        console.log('Cannot fetch chat messages with error', e);
    }
}

// export async function postChatMessage(id, payload) {
//     try {
//         const response = await fetch(`${BASE_URL}/rooms/${id}/messages`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         });
//         return await response.json();
//     } catch(e) {
//         console.log('Cannot fetch rooms with error', e);
//     }
// }

export async function postChatMessage(id, formData) {
    try {
        const response = await fetch(`${BASE_URL}/rooms/${id}/messages`, {
            method: 'POST',
            body: formData
        });
        return await response.json();
    } catch(e) {
        console.log('Cannot fetch rooms with error', e);
    }
}