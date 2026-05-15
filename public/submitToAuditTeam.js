document.addEventListener('DOMContentLoaded', () => {
    const cancelBtn = document.querySelector('.cancel-btn');
    const submitBtn = document.querySelector('.submit-btn');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.history.back();
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            alert('Assessment submitted to audit team.');
        });
    }
});
