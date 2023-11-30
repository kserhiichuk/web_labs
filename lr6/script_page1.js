function createToast() {
    const title = document.getElementById('toastTitle').value;
    const message = document.getElementById('toastMessage').value;

    // Перевірка, чи title або message не пусті
    if (!title || !message) {
        // Повідомлення про те, що треба ввести текст
        alert('Please enter both title and message.');
        return;
    }

    // Create an object with Toast data
    const toastData = {
        title: title,
        message: message
    };

    alert('yes');

    // Send the data to the server using fetch and PHP
    fetch('saveToast.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(toastData),
    });
}

