function updateToasts() {
    fetch('getToasts.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const toastContainer = document.getElementById('toastContainer');

            // Очищення контейнера перед оновленням
            toastContainer.innerHTML = '';

            // Створення або оновлення Toast для кожного запису даних
            data.forEach(toast => {
                createToast(toast.title, toast.message, toast.id);
            });
        })
        .catch(error => {
            console.error('Error updating toasts:', error);
        });
}

function createToast(title, message, id) {
    const existingToast = document.getElementById(`toast-${id}`);

    if (existingToast) {
        // Оновлення існуючого Toast
        existingToast.querySelector('.toast-title').innerText = title;
        existingToast.querySelector('.toast-body').innerText = message;
    } else {
        // Створення нового Toast
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        const toastHeader = document.createElement('div');
        const toastTitle = document.createElement('strong');
        const closeButton = document.createElement('button');
        const toastBody = document.createElement('div');

        toast.id = `toast-${id}`;
        toast.className = 'toast';
        toastHeader.className = 'toast-header';
        toastTitle.className = 'me-auto toast-title';
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'toast');
        closeButton.setAttribute('aria-label', 'Close');
        toastBody.className = 'toast-body';

        // Додавання тексту
        toastTitle.innerText = title;
        toastBody.innerText = message;

        // Збирання структури
        toastHeader.appendChild(toastTitle);
        toastHeader.appendChild(closeButton);
        toast.appendChild(toastHeader);
        toast.appendChild(toastBody);

        // Додавання Toast до контейнера
        toastContainer.appendChild(toast);
    }
}

// Оновлення Toast кожні 10 секунд
setInterval(updateToasts, 10000);

// Початкове оновлення при завантаженні сторінки
updateToasts();

// Обробник подій для кнопки "close"
document.addEventListener('click', function (event) {
    const closeButton = event.target.closest('.btn-close');

    if (closeButton) {
        // Отримати id тосту з атрибута даних
        const toastId = closeButton.closest('.toast').id.replace('toast-', '');

        // Викликати функцію для видалення тосту
        deleteToast(toastId);
    }
});

// Функція для видалення тосту
function deleteToast(toastId) {
    // Викликати PHP-скрипт 
    fetch(`deleteToast.php?id=${toastId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                // Видалити тост з DOM
                const toastElement = document.getElementById(`toast-${toastId}`);
                if (toastElement) {
                    toastElement.remove();
                }
            } else {
                console.error('Error deleting toast:', data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting toast:', error);
        });
}
