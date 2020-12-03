const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

function clearCalender() { //前のカレンダーを削除
                           //と共に<td>追加前に存在していた要素を追加復元
    document.getElementById("calender").innerHTML = '';
    document.getElementById("calender").innerHTML ='<th rowspan="2">root</th><th rowspan="2">name</th>';

    document.getElementById("week").innerHTML = '';

    document.getElementById("tbody1").innerHTML = '';
    document.getElementById("tbody1").innerHTML = '<tr id="row0"><th>2009</th><th>yu-ki</th></tr><tr id="row1"><th>2010</th><th>aya</th></tr><tr id="row2"><th>2011</th><th>rino</th></tr><tr id="row3"><th>2012</th><th>den</th></tr><tr id="row4"><th>2014</th><th>petie</th></tr><tr id="row5"><th>STR</th><th>tanaka</th></tr><tr id="row6"><th>STR</th><th>yoshida</th></tr>';
}

function renderTitle() {//年月を表示
    const title = document.getElementById('title');
    title.textContent = `${year}/${String(month + 1).padStart(2, '0')}`;
}

function getCalender() {  //日数分のセルを生成しtextContentで日付を入れる
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
        const tdDate = document.createElement('td');
        tdDate.textContent = i;
        document.getElementById('calender').appendChild(tdDate);
        if (new Date(year, month, i).getDay() === 6) {
            tdDate.classList.add('sat');
        }
        if (new Date(year, month, i).getDay() === 0) {
            tdDate.classList.add('sun');
        }
    }
}

function getWeek() {//当月の曜日を取得しセルを生成
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let n = 1; n <= lastDate; n++) {
        const tdDay = document.createElement('td');
        let wObj = ["日", "月", "火", "水", "木", "金", "土"][new Date(year, month, n).getDay()];//指定した日付の曜日を文字列で取得
        tdDay.textContent = wObj;
        document.getElementById('week').appendChild(tdDay);
        if (tdDay.textContent==="土") {
            tdDay.classList.add('sat');
        } 
        if (tdDay.textContent==="日") {
            tdDay.classList.add('sun');
        }
    }
}

function addCell(id) {//シフト用のセルを生成
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let n = 1; n <= lastDate; n++) {
        const td = document.createElement('td');
        td.textContent = '○';
        document.getElementById(id).appendChild(td);
        td.addEventListener('click', () => {
            if (td.textContent==='○') {
                td.textContent = '休';
            } else if (td.textContent==='休') {
                td.textContent = '○';
            }
        });
    }
}

function ph(rowId, phId) {//個人の休みをカウントする
    const row = document.getElementById(rowId);
    const td = row.querySelectorAll('td');
    const phValue = document.getElementById(phId);
    let phCount = 0;
    // console.log(td);
    td.forEach(function(item){
        item.addEventListener('click', () => { //tdはquerySelectorAllで複数個になっててforEachで要素１こをitemとして
            if (item.textContent==='○') {      //もらっているのでif文はitem.textContentを見ないといけない
                phCount--;
                phValue.textContent = phCount;
            } else if (item.textContent==='休') {
                phCount++;
                phValue.textContent = phCount;
            };
        });
    });
}

function resetPh() { // これが無いと月が替わったとき休みの数がどこかクリックするまで、前の値で残るバグがでる
    let phValue = document.getElementById('phValue0');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue1');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue2');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue3');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue4');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue5');
    phValue.textContent = 0;
    phValue = document.getElementById('phValue6');
    phValue.textContent = 0;
}

function bundling() {
    clearCalender();
    renderTitle();
    getCalender();
    getWeek();
    addCell('row0');
    addCell('row1');
    addCell('row2');
    addCell('row3');
    addCell('row4');
    addCell('row5');
    addCell('row6');
    resetPh();
    ph('row0', 'phValue0');
    ph('row1', 'phValue1');
    ph('row2', 'phValue2');
    ph('row3', 'phValue3');
    ph('row4', 'phValue4');
    ph('row5', 'phValue5');
    ph('row6', 'phValue6');
}


function init(){
    document.getElementById('prev').addEventListener('click', () => {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }
        bundling();
    });

    document.getElementById('next').addEventListener('click', () => {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }
        bundling();
    });

    

    
    bundling();
}