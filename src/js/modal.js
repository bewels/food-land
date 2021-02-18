function modal () {
    const modal = document.querySelector('.modal'),
    modalBtns = document.querySelectorAll('[data-modal]');


    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimer);
    }
    modalBtns.forEach(item => {
        item.addEventListener('click', () => {
            showModal();
        });
    });
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });


    const modalTimer = setTimeout(showModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;