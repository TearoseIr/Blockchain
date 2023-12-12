//переменная хранения массива кандидатов
let candidates = [];

//получение данных из data.json при первоначальной загрузке страницы
(async function fetchJson(){
    let response = await fetch('./data.json');
    let dataObj = await response.json();
    candidates = [...dataObj]; //копия массива кандидатов
    console.log(candidates);

    if (candidates.length) {
        createTable();

        //заполняем таблицу данными, //заполняем выпадающий список
       candidates.forEach((el,ind)=>{
           fillTable(el,ind);
           fillDropdown(el);
        });
    }else{
        noData();
    }
})();

//создаем шапку таблицы и tbody (пустое)
function createTable(){
    let table = document.createElement('table');
    table.classList.add('table', 'w-75', 'mx-auto', 'fs-5', 'border');
    table.innerHTML = `<thead>\n
        <tr>\n
           <th scope=\"col\">#</th>\n
           <th scope=\"col\">Name</th>\n
           <th scope=\"col\">Votes</th>\n
       </tr>\n
    </thead>\n
    <tbody></tbody>`;
    const tableBlock = document.getElementById('table_block');
    console.log(tableBlock); //для контроля
    tableBlock.append(table);
}

//если у нас нет списка кандидатов
function noData(){
    let div = document.createElement('div');
    const tableBlock = document.getElementById('table_block');
    tableBlock.append(div);
    div.innerHTML = `<p class = "text-center fs-3">Нет данных</p>`;
}

//заполнение таблицы данными
function fillTable(el,ind){
    let tbodyEl = document.querySelector('tbody');
    let candidateRow = document.createElement('tr');
    let num = ind+1;
    candidateRow.innerHTML = `<th scope="row">${num}</th>\n
        <td>${el.candidate}</td>\n
        <td>${el.vote}</td>\n`;
    tbodyEl.append(candidateRow);
}

//заполнение выпадающего списка
function fillDropdown(el){
    const selectEl = document.querySelector('select');
    let newOption = new Option(el.candidate,el.candidate);
    selectEl.append(newOption);
}

//увеличение голосов при клике на кнопке Vote
function votesIncrease(){
    const candidateSelectedIndex = candidates.findIndex((el) => el.candidate === optionSelected);
    console.log('нашли кандидата в массиве: ', candidateSelectedIndex); //для контроля
    candidates.forEach((el,index)=>{
        if(index === candidateSelectedIndex){
            el.vote++;
        }
    });
}

//обработчик события на кнопке Vote
const voteButtonEl = document.getElementById('vote_button');
let optionSelected = '';
voteButtonEl.addEventListener('click',(e)=>{
    //console.log(e);
    console.log('выбранный кандидат: ', optionSelected); //для контроля
    votesIncrease();
    console.log(candidates); //для контроля
});

//обработчик события выбора кандидата из выпадающего списка
//блокирование и разблокирование кнопки Vote
const selectEl = document.querySelector('select');
selectEl.addEventListener('change',(e)=>{
    console.log(e.target.value); //для контроля
    console.log(e.target.selectedIndex); //для контроля
    if(e.target.selectedIndex){
        voteButtonEl.removeAttribute('disabled');
        optionSelected = e.target.value;
    }else{
        voteButtonEl.setAttribute('disabled', true);
    }
});

//обработчик события на кнопке Data Update
const updateButtonEl = document.getElementById('update_button');
updateButtonEl.addEventListener('click', (e)=>{
    console.log('Кнопка update, событие клика: ');
    console.log(e);
    updateVote();
 });

//обновление данных при клике на Data Update
function updateVote(){
    setTimeout(()=>{
        const tbodyEl = document.querySelector('tbody');
        console.log(tbodyEl); //для контроля
        const trCollection=tbodyEl.querySelectorAll('tr');
        console.log(trCollection); //для контроля
        candidates.forEach((el,index)=>{
            const tdLast = trCollection[index].lastElementChild;
            console.log(tdLast); //для контроля
            tdLast.innerHTML=el.vote;
        });
     },500);
}
