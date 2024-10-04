
// --- адаптив статистики ---
const statsData = {
    plus: 647,
    equal: 29,
    minus: 413,
    roi: 23.9,
    profit: 22820
}

const statsBlockTemplate = `
    <div class="card__stats-item card__stats-item--green">
        <div>+</div>
        <div class="card__stats-info">${statsData.plus}</div>
    </div>

    <div class="card__stats-item card__stats-item--grey">
        <div>=</div>
        <div class="card__stats-info">${statsData.equal}</div>
    </div>

    <div class="card__stats-item card__stats-item--red">
        <div>—</div>
        <div class="card__stats-info">${statsData.minus}</div>
    </div>

    <div class="card__stats-item card__stats-item--default">
        <div>ROI, %</div>
        <div class="card__stats-info">${statsData.roi}%</div>
    </div>

    <div class="card__stats-item card__stats-item--default">
        <div>Прибыль</div>
        <div class="card__stats-info">+${new Intl.NumberFormat("ru", {style: "decimal"}).format(statsData.profit)}</div>
    </div>
`

const statsBlockTemplateMobile = `
    <div class="card__stats-item card__stats-item--green">
        ${statsData.plus} <span>/</span>
    </div>

    <div class="card__stats-item card__stats-item--grey">
        ${statsData.equal} <span>/</span>
    </div>

    <div class="card__stats-item card__stats-item--red">
        ${statsData.minus} <span>/</span>
    </div>

    <div class="card__stats-item card__stats-item--default">
        ROI ${statsData.roi}%
    </div>
`

const container = document.querySelector('.js-container')
const containerMobile = document.querySelector('.js-container-mobile')
let delay = 250, throttled = false;

// Отрисовка разных шаблонов статистики в зависимости от ширины монитора 
const resizeHandler = () => {
    const windowWidth = window.screen.width

    if (windowWidth >= 745) {
        container.innerHTML = statsBlockTemplate
        containerMobile.innerHTML = ''
    } else {
        containerMobile.innerHTML = statsBlockTemplateMobile
        container.innerHTML = ''
    }
}

// Троттлинг для оптимизации
window.addEventListener('resize', function() {
    // resizeHandler();
    if (!throttled) {
      resizeHandler();
      throttled = true;

      setTimeout(function() {
        throttled = false;
      }, delay);
    }  
});

window.addEventListener('DOMContentLoaded', () => {
    resizeHandler()
})

// --- обработка раскрытия/закрытия карточки ---

const btn = document.getElementById('showMore')
const cardBody = document.getElementById('cardBody')

function handleCollapse(element) {
    const elHeight = element.scrollHeight;

    requestAnimationFrame(function() {
        element.style.height = elHeight + 'px';
        requestAnimationFrame(function() {
            element.style.height = 120 + 'px';
        });
    });
    
    element.setAttribute('data-collapsed', 'true');
}

function handleExpand(element) {
    const elHeight = element.scrollHeight;

    element.style.height = elHeight + 'px';
    element.setAttribute('data-collapsed', 'false');
}

btn.addEventListener('click', function(e) {
    const section = document.querySelector('.card__body-text');
    const isCollapsed = section.getAttribute('data-collapsed') === 'true';
    
    if(isCollapsed) {
        handleExpand(section)
        section.setAttribute('data-collapsed', 'false')
        cardBody.classList.add('open')
        cardBody.classList.remove('gradient')
    } else {
        handleCollapse(section)
        cardBody.classList.remove('open')
        cardBody.classList.add('gradient')
    }
});
