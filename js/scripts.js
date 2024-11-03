
const imcData = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

const imcTable = document.querySelector('#imc-table');
const heightInput = document.querySelector('#height');
const weightInput = document.querySelector('#weight');
const calcBtn = document.querySelector('#calc-btn');
const clearBtn = document.querySelector('#clear-btn');
const imcNumber = document.querySelector('#imc-number span');
const imcInfo = document.querySelector('#imc-info span');
const backBtn = document.querySelector('#back-btn');
const calcContainer = document.querySelector('#calc-container');
const resultContainer = document.querySelector('#result-container');

function createTable(data) {
    data.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('table-data')

        const classification = document.createElement('p');
        classification.innerText = item.classification;

        const info = document.createElement('p');
        info.innerText = item.info;

        const obesity = document.createElement('p');
        obesity.innerText = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div);
    });
}

function cleanInputs() {
    heightInput.value = '';
    weightInput.value = '';
    imcNumber.classList = '';
    imcInfo.classList = '';
}

function validDigits(text) {
    const onlyNumbersAndComma = /[^0-9,]/g;
    return text.replace(onlyNumbersAndComma, '');
}

function calcImc(weight, height) {
    const imc = (weight / (height * height));
    return imc.toFixed(1);
}

function showOrHideResults() {
    calcContainer.classList.toggle('hide');
    resultContainer.classList.toggle('hide');
}

function getSituationClassName(info) {
    let className;
    switch (info) {
        case 'Magreza':
            className = 'low';
            break;
        case 'Normal':
            className = 'good';
            break;
        case 'Sobrepeso':
            className = 'low';
            break;
        case 'Obesidade':
            className = 'medium';
            break;
        case 'Obesidade grave':
            className = 'high';
            break;
        default:
            className = '';
    }
    return className;
}

createTable(imcData);

[heightInput, weightInput].forEach(element => {
    element.addEventListener('input', event => {
        const updatedValue = validDigits(event.target.value);
        event.target.value = updatedValue;
    });
});

calcBtn.addEventListener('click', event => {
    event.preventDefault();

    const weight = +weightInput.value.replace(',', '.');
    const height = +heightInput.value.replace(',', '.');

    if (!weight || !height) return;

    const imc = calcImc(weight, height);

    let targetInfo = imcData.find(item => imc > item.min && imc <= item.max);
    if (!targetInfo) return;
    let info = targetInfo.info;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;
    showOrHideResults();

    const className = getSituationClassName(info);
    if (!className) return;

    imcNumber.classList.add(className);
    imcInfo.classList.add(className);
});

clearBtn.addEventListener('click', event => {
    event.preventDefault();
    cleanInputs();
});

backBtn.addEventListener('click', () => {
    cleanInputs();
    showOrHideResults();
})