import cards from './cards';
import modal from './modal';
import tabs from './tabs';
import timer from './timer';

window.addEventListener('DOMContentLoaded', () => {
    
    cards();
    modal();
    tabs();
    timer();


            //Forms

            const forms = document.querySelectorAll('form');
            forms.forEach(item => {
                bindPostData(item);
            });

            const postData = async (url, data) => {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                });
                

                return await res.json();
            };


            const message = {
                loading: 'img/spinner.svg',
                success: 'ok!',
                failure: 'error'
            };

            function bindPostData(form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();

                    const statusMassage = document.createElement('img');
                    statusMassage.src = message.loading;
                    statusMassage.style.cssText = `
                        display: block;
                        margin: 0 auto;
                    `;
                    form.insertAdjacentElement  ('afterend', statusMassage);

                    const formData = new FormData(form);

                    const json = JSON.stringify(Object.fromEntries(formData.entries()));
                    console.log(json);
                    postData('http://localhost:3000/requests', json)
                    .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        statusMassage.remove();  
                    }).catch(() => {
                        showThanksModal(message.failure);
                    }).finally(() => {
                        form.reset();
                    });

                });
            }
            function showThanksModal(status) {
                const prevModalDialog = document.querySelector('.modal__dialog');
                prevModalDialog.classList.add('hide');
                showModal();
                const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                    <div class="modal__content">
                        <div data-close class="modal__close">&times;</div>
                        <div class="modal__title">${status}</div>
                    </div>
                `;

                document.querySelector('.modal').append(thanksModal);

                setTimeout(() => {
                    thanksModal.remove();
                    prevModalDialog.classList.remove('hide');
                    prevModalDialog.classList.add('show');

                    closeModal();
                }, 4000);
            }


            // slider

            const currentNum = document.querySelector('#current'),
                totalNum = document.querySelector('#total'),
                sliderAll = document.querySelector('.offer__slider'),
                slideNext = document.querySelector('.offer__slider-next'),
                slidePrev = document.querySelector('.offer__slider-prev'),
                slides = document.querySelectorAll('.offer__slide'),
                slider = document.querySelector('.offer__slider-wrapper'),
                sliderCarusel = document.querySelector('.slider-carusel'),
                width = window.getComputedStyle(slider).width;
                let offset = 0,
                slideNum = 1,
                dots = [];

            if (slides.length < 10) {
                totalNum.textContent = `0${slides.length}`;
                currentNum.textContent = `0${slideNum}`;
            } else {
                totalNum.textContent = slides.length;
                totalNum.textContent = slideNum;
            }

            function getZeroCurrent() {
                if (slideNum < 10) {
                    slideNum = `0${slideNum}`;
                } else {
                    slideNum = slideNum;
                }
                return slideNum;
            }

            function changeCurrentNumN() {

                if (slideNum == slides.length) {
                    slideNum = 1;
                } else {
                    slideNum++;
                }
                getZeroCurrent();
                currentNum.textContent = slideNum;
                changeActivDot(slideNum);
                
            }
            function changeCurrentNumP() {
                if (slideNum == 1) {
                    slideNum = slides.length;
                } else {
                    slideNum--;
                }
                getZeroCurrent();
                currentNum.textContent = slideNum;
                changeActivDot(slideNum);
            }

            function replaceWidth(num) {
                return +num.replace(/\D/g, '');
            }
            
            sliderCarusel.style.width = 100 * slides.length + '%';
            sliderCarusel.style.display = 'flex';
            sliderCarusel.style.transition = 'transform .3s linear';

            slides.forEach(slide => {
                slide.style.width = width;
            });

            sliderAll.style.position = 'relative';
            const indicators = document.createElement('ol');
            indicators.style.cssText = `
                position: absolute;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 15;
                display: flex;
                justify-content: center;
                margin-right: 15%;
                margin-left: 15%;
                list-style: none;
            `;
            sliderAll.append(indicators);

            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('li');
                dot.setAttribute('data-to', i + 1);
                dot.style.cssText = `
                    box-sizing: content-box;
                    flex: 0 1 auto;
                    width: 30px;
                    height: 6px;
                    margin-right: 3px;
                    margin-left: 3px;
                    cursor: pointer;
                    background-color: #fff;
                    background-clip: padding-box;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    opacity: .5;
                    transition: opacity .6s ease;
                `;

                indicators.append(dot);

                dots.push(dot);
            }

            function changeActivDot(curr = 1) {
                dots.forEach(item => item.style.opacity = 0.5);
                dots[curr - 1].style.opacity = 1;
            }

            changeActivDot();

            slider.style.overflow = 'hidden';

            slideNext.addEventListener('click', () => {
                if (offset == replaceWidth(width) * (slides.length - 1)) {
                    offset = 0;
                } else {
                    offset += replaceWidth(width);
                }
                sliderCarusel.style.transform = `translateX(-${offset}px)`;
                changeCurrentNumN();
            });

            slidePrev.addEventListener('click', () => {
                if (offset === 0) {
                    offset = replaceWidth(width) * (slides.length - 1);
                } else {
                    offset -= replaceWidth(width);
                }

                sliderCarusel.style.transform = `translateX(-${offset}px)`;
                changeCurrentNumP();

            });

            dots.forEach(dot => {
                    dot.addEventListener('click', (e) => {
                        const dataTo = e.target.getAttribute('data-to');

                        offset = replaceWidth(width) * (dataTo - 1);
                        sliderCarusel.style.transform = `translateX(-${offset}px)`;
                            slideNum = dataTo - 1;
                            changeCurrentNumN();
                    });   
            });

                // function showSlide(i) {

                //     slides.forEach(item => {
                //         item.classList.remove('show');
                //     });

                //     slides[i].classList.add('show');

                //     if (slides.length < 10) {
                //         currentNum.textContent = `0${i + 1}`;
                //     } else {
                //         currentNum.textContent = i + 1;
                //     }
                // }

                // if (slides.length < 10) {
                //     totalNum.textContent = `0${slides.length}`;
                // } else {
                //     totalNum.textContent = slides.length;
                // }

                // showSlide(slideNum);

                // slideNext.addEventListener('click', () => {
                //     slideNum++;

                //     if (slideNum >= slides.length) {
                //         slideNum = 0;
                //     }

                //     showSlide(slideNum);
                // });

                // slidePrev.addEventListener('click', () => {
                //     if (slideNum <= 0) {
                //         slideNum = slides.length - 1;
                //     } else {
                //         slideNum--;
                //     }

                //     showSlide(slideNum);
                // });

                // calc
                const constituons = document.querySelectorAll('.calculating__choose_medium input'),
                    calculatingResult = document.querySelector('.calculating__result span'),
                    male = document.querySelector('#male'),
                    famale = document.querySelector('#famale'),
                    activity = document.querySelectorAll('.calculating__choose_big div');

                function clacTabs (parentSelector, active) {
                    const parentBlock = document.querySelector(parentSelector);
                    parentBlock.addEventListener('click', (e) => {
                        if (e.target.classList.contains('calculating__choose-item')){
                            document.querySelectorAll(parentSelector + ' div').forEach(item => {
                                item.classList.remove(active.replace(/\./, ''));
                            });
                            e.target.classList.add(active.replace(/\./, ''));
                        }
                        calculatingRes();
                    });
                }
                constituons.forEach(item => {
                    item.addEventListener('input', () => {
                        calculatingRes();
                    });
                });
                clacTabs('#gender', '.calculating__choose-item_active');
                clacTabs('.calculating__choose_big', '.calculating__choose-item_active');

                function calculatingRes() {
                    let activityKef = 0,
                    result = 0;
                    if (!constituons[0].value || !constituons[1].value || !constituons[2].value) {
                        calculatingResult.textContent = '0';
                    } else {
                        if (male.classList.contains('calculating__choose-item_active')){
                            activity.forEach(item => {
                                if (item.classList.contains('calculating__choose-item_active')) {
                                    activityKef = +item.getAttribute('data-active');
                                }
                                result = (88.36 + (13.4 * +constituons[1].value) + (4.8 * +constituons[0].value) - (5.7 * +constituons[2].value)) * activityKef;
                            });
                        } else if (famale.classList.contains('calculating__choose-item_active')) {
                            activity.forEach(item => {
                                if (item.classList.contains('calculating__choose-item_active')) {
                                    activityKef = +item.getAttribute('data-active');
                                }
                                result = (447.6 + (9.2 * +constituons[1].value) + (3.1 * +constituons[0].value) - (4.3 * +constituons[2].value)) * activityKef;
                        });
                    }
                        calculatingResult.textContent = Math.round(Math.round(result / 100) + '00');
                    }

                }
                calculatingRes();
}); 