function tabs () {
    const tabs = document.querySelectorAll('.tabheader__item'),
        content = document.querySelectorAll('.tabcontent'),
        tabHeader = document.querySelector('.tabheader');
    
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        content[i].style.display = 'block';        
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabHeader.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}
export default tabs;