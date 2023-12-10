import candidateData from "./data.json" assert {type: "json"};
const candidates = candidateData;
console.log(candidates);

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
    document.body.append(table);
}

function noData(){
    let div = document.createElement('div');
    document.body.append(div);
    div.innerHTML = `<p class = "text-center fs-3">Нет данных</p>`;
}

if (candidates.length) {
    createTable();
    let tbodyEl = document.querySelector('tbody');
    candidates.forEach((el,ind)=>{
        let candidateRow = document.createElement('tr');
        let num = ind+1;
        candidateRow.innerHTML = `<th scope="row">${num}</th>\n
        <td>${el.candidate}</td>\n
        <td>${el.vote}</td>\n`;
        tbodyEl.append(candidateRow);
    });
    }else{
    noData();
        }

