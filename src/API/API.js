const url = 'http://localhost:8080/anime'
export default {
    addNewAnimeCharacter: async (characterData) => {

        try {
            const response = await fetch(`${url}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Другие необходимые заголовки...
                },
                body: JSON.stringify(characterData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }

            const data = await response.json();
            console.log('Пользователь успешно добавлен:', data);

            // Вернуть данные, чтобы их можно было использовать вне этой функции
            return data;
        } catch (error) {
            console.error('Ошибка при добавлении пользователя:', error);
            // Обработка ошибки

            // Вернуть null (или другое значение) в случае ошибки, если нужно
            return null;
        }
    },
    deleteCharacter: (id)=>{

        fetch(`${url}/delete/${id}`, {
            method: 'DELETE', // Метод запроса для удаления
            headers: {
                'Content-Type': 'application/json',
                // Другие необходимые заголовки...
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Ошибка сети: ${response.status}`);
                }
                console.log('Пользователь успешно удален');
                // Обработка успешного удаления пользователя
            })
            .catch(error => {
                console.error('Ошибка при удалении пользователя:', error);
                // Обработка ошибки
            });
    },
    updateAnimeCharacterById: async (id, updatedData) => {
        try {
            const response = await fetch(`${url}/update/${id}`, {
                method: 'PUT', // Используем метод PUT для обновления данных
                headers: {
                    'Content-Type': 'application/json',
                    // Другие необходимые заголовки...
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status}`);
            }

            const data = await response.json();
            console.log('Пользователь успешно обновлен:', data);

            // Вернуть данные, чтобы их можно было использовать вне этой функции
            return data;
        } catch (error) {
            console.error('Ошибка при обновлении пользователя:', error);
            // Обработка ошибки

            // Вернуть null (или другое значение) в случае ошибки, если нужно
            return null;
        }
    }

}