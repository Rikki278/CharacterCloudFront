import axios from "../axios";

export default {
    getAnimeCharactersByUserId: async (userId) => {
        try {
            console.log(userId)
            const response = await axios.get(`/anime/user/${userId}/anime-title`)

            console.log('User added successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            // Обработка ошибки
            return null;
        }
    },
    getAllAnimeCharacters: async (userId) => {
        try {
            console.log(userId)
            const response = await axios.get(`anime/all`)

            console.log('Character added successfully:', response);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            // Обработка ошибки
            return null;
        }
    },
    addNewAnimeCharacter: async (characterData) => {
        try {
            const response = await axios.post(`/anime/add`, characterData)

            console.log('User added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding user:', error);
            // Обработка ошибки
            return null;
        }
    },
    deleteCharacter: async (id) => {
        try {
            const response = await axios.delete(`anime/delete/${id}`, )

            console.log('User deleted successfully');
            // Обработка успешного удаления пользователя
            return true;
        } catch (error) {
            console.error('Error when deleting user:', error);
            // Обработка ошибки

            return false;
        }
    },
    updateAnimeCharacterById : async (id, updatedData) => {
        try { //айди поста
            const response = await axios.put(`/anime/update/${id}`, updatedData)

            console.log('User updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            // Обработка ошибки

            return null;
        }
    },
    loginUser : async (values) =>{
        try {
            const response = await axios.post('/auth/login', values)
            console.log(response)

            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);

            return null;
        }
    },
    registerUser : async (values) =>{
        try {
            const response = await axios.post('/auth/register', values)

            console.log('The user has successfully registered in:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error register user:', error);
            // Обработка ошибки
            return null;
        }
    }
}