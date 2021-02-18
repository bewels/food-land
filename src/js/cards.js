function cards() {
    class Menu {
        constructor(img, alt, title, text, price, parentSelector, ...classes) {
            this.imgURL = img;
            this.alt = alt;
            this.title = title;
            this.classes = classes;
            this.text = text;
            this.parent = document.querySelector(parentSelector);
            this.price = price * 70;
        }

        createMenu() {
            const menuBlock = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                menuBlock.classList.add(this.classes);
            } else {
                this.classes.forEach(item => menuBlock.classList.add(item));
            }
            menuBlock.innerHTML = `
            <img src=${this.imgURL} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.text} </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.parent.append(menuBlock);
        }
    }
    const getResurces = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`status ${res.status}`);
        }

        return await res.json();
    };

    getResurces('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new Menu(img, altimg, title, descr, price, '.menu .container').createMenu();
        });
    });
}

export default cards;