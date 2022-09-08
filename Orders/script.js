// Data
const content = [
  ['Add New Order', 'أضف طلب جديد'],
  ['Name', 'الاسم'],
  ['Order', 'الطلب'],
  ['Add', 'أضف'],
  ['Remove', 'حذف'],
  ['Cancel', 'الغاء'],
  ['Total Order', 'الطلب الكلى'],
  ['EP', 'ج'],
  ['ع', 'E'],
  ['Client Total','اجمالى العميل'],
]

let clients = [
  ['Ahmed Salama', 'احمد سلامة'],
  ['Islam Ibrahim', 'اسلام ابراهيم'],
  ['Islam Anwer','اسلام أنور'],
  ['Mohamed Ashraf', 'محمد أشرف'],
  ['Mohamed Abdallah','محمد عبد الله'],
  ['Sameh', 'سامح'],
  ['Ahmed Adel','أحمد عادل'],
  ['Raafat', 'رأفت'],
  ['Abdelrhman','عبدالرحمن']
]

// clients.sort();

let types = [
  ['Foool','فول',3],
  ['Ta3mia','طعمية',3.5],
  ['Potatoes','بطاطس',4],
  ['Chease','جبنة',4],
  ['Egg','بيض',4],
  ['Papa','بابا',4],
  ['FoolWTa3mia','فول بالطعمية',3.5],
  ['FoolWEgg','فول بالبيض',4],
  ['Ta3miaWEgg','طعمية بالبيض',4]
]

let orders = []

let totalOrderItems = {}

let lang = 'ar';
// Functins
function setOptionsArr(element, content) {
  for (let i = 0; i < content.length; i++) {
    var tag = document.createElement('option');
    tag.value = i + 1;
    if (lang == 'en') {
      tag.innerHTML = content[i][0];
    } else {
      tag.innerHTML = content[i][1];
    }
    element.appendChild(tag);
  }
}

function setOptionsObj(element, content) {
  for (const key in content) {
    var tag = document.createElement('option');
    tag.value = key;
    tag.innerHTML = key;
    element.appendChild(tag);
  }
}

function addOrderRow() {
  var fristTag = document.createElement('tr');
  let i;
  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }
  fristTag.innerHTML = `
  <td rowspan="2" class="name">
    <select class="clientName" name="clientName" id="clientName">
    </select>
  </td>

  <td id="types">
    <div class = "typesWarp">
      <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">
      </select>
      <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    </div>
  </td>

  <td rowspan="2" class="add">
    <button class="addType" onclick="addTypeCol();">
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>
    </button>
  </td>

  <td rowspan="2" class="remove">
    <button class="removeType" onclick="removeTypeCol()">
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
    </button>
  </td>

  <td rowspan="2" class="cancel">
    <button class="cancelOrder" onclick="cancelOrder()">
      <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
    </button>
  </td>
  `;
  var secondTag = document.createElement('tr');
  secondTag.innerHTML = `
  <tr>
    <td class="totalclient">
    <input onchange="paied();" type="checkbox" name="paied"><span>${content[9][i]}: </span>
      <span class="totalclientVal">0</span> 
      <span class="totalclientVal">${content[7][i]}</span>
    </td>
  </tr>
  `;
  const rowsWarpper = document.getElementById('rows');
  rowsWarpper.appendChild(fristTag);
  setOptionsArr(fristTag.querySelector("#clientName"), clients);
  setOptionsArr(fristTag.querySelector("#typeOptions"), types);
  rowsWarpper.appendChild(secondTag);
}

function addTypeCol() {
  var tag = document.createElement('div');
  tag.className = 'typesWarp';
  tag.innerHTML = `
      <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">
      </select>
      <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    `;
  this.event.currentTarget.parentElement.parentElement.querySelector('#types').appendChild(tag);
  setOptionsArr(tag.querySelector("#typeOptions"), types);
}

function removeTypeCol() {
  var types = this.event.currentTarget.parentElement.parentElement.querySelector('#types');
  types.removeChild(types.lastElementChild);
  CalculateTotals();
}

function cancelOrder() {
  var row = this.event.currentTarget.parentElement.parentElement;
  row.nextElementSibling.remove();
  row.remove();
  CalculateTotals();
}

function CalculateTotals() {
  orders = [];
  var collect = document.querySelectorAll('td#types');
  let totalOrder = 0;
  collect.forEach(e => {
    let totalClient = 0;
    const clientOrder = e.querySelectorAll('select.typeOptions');
    let orderItem = {};
    clientOrder.forEach(t => {
      totalClient += (types[t.value-1][2] * t.nextElementSibling.value);
      orderItem[t.value] = parseInt(t.nextElementSibling.value)
    });
    orders.push(orderItem);
    totalOrder += totalClient;
    e.parentElement.nextElementSibling.querySelector('span.totalclientVal').innerHTML = totalClient;
  });
  document.querySelector('#totalPriceVal').innerHTML = totalOrder;
  calculateTotalOrderItems(orders);
}

function calculateTotalOrderItems() {
  totalOrderItems = {};
  let i;
  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }
  orders.forEach(order => {
    for (const key in order) {
      if (typeof(totalOrderItems[types[key-1][i]]) === 'undefined') {
        if (!isNaN(order[key])) {
          totalOrderItems[types[key-1][i]] = order[key];
        }
      }else{
        if (!isNaN(order[key])) {
          totalOrderItems[types[key-1][i]] += order[key];
        }
      }
    }
  });
  let itemsHolder = document.querySelector('#totalOrderItems');
  let itemsContainer = ``;
  for (const key in totalOrderItems) {
    itemsContainer += ` <span class ="orderItem"> ${key} ${totalOrderItems[key]} </span>`;
  }
  itemsHolder.innerHTML = itemsContainer;
}

function displayNameRows() {
  const rowsWarpper = document.getElementById('nameRows');
  clients.forEach((client, index) => {
    var tag = document.createElement('tr');
    tag.innerHTML  = `
    <td>${index+1}</td>
    <td>
      <input type="text" name="enName" id="enName" value="${client[0]}">
    </td>
    <td>
      <input type="text" name="enName" id="enName" value="${client[1]}">
    </td>
    <td class="remove">
      <button class="removeType" onclick="removeNameRow()">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  });
}

function displayTypeRows() {
  const rowsWarpper = document.getElementById('typeRows');
  types.forEach(type => {
    
    var tag = document.createElement('tr');
    tag.innerHTML  = `
    <td>
      <input type="text" name="enName" id="enName" value="${type[0]}">
    </td>
    <td>
      <input type="text" name="enName" id="enName" value="${type[1]}">
    </td>
    <td>
      <input type="number" name="enName" id="enName" value="${type[2]}">
    </td>
    <td class="remove">
      <button class="removeType" onclick="">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  });
}

function removeNameRow() {
  const row = this.event.currentTarget.parentElement.parentElement;
  clients.splice(parseInt(row.firstElementChild.innerText)-1, 1);
  document.getElementById('nameRows').innerHTML = '';
  displayNameRows();
}

function createOrderTable() {
  const orders = document.querySelector('.orders');
  let i;
  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }
  orders.innerHTML = `
<div class="addOrderwarpper">
  <button class="addOrder" id="addOrder" onclick="addOrderRow();" type="button">${content[0][i]}</button>
  <button id="changeLang" onclick="changeLang();" type="button">${content[8][i]}</button>
  <button id="openFloat">
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
  </button>
</div>
<table>
  <thead>

    <tr>
      <th style="max-width: 20%;width: 15%;">${content[1][i]}</th>
      <th>${content[2][i]}</th>
      <th>${content[3][i]}</th>
      <th>${content[4][i]}</th>
      <th>${content[5][i]}</th>
    </tr>

  </thead>
  <tbody id="rows">

  </tbody>
  <tfoot>
    <tr>
      <td colspan="5" id="totalOrderItems">
        
      </td>
    </tr>
    <tr>
      <td colspan="5" class="totalPrice">
        <span>${content[6][i]} : </span>
        <span id="totalPriceVal">0</span> <span id="totalPriceVal">${content[7][i]}</span>
      </td>
    </tr>
  </tfoot>
</table>
  `
  changeDirection(orders);
  
}
function changeDirection(element) {
  if (lang == 'ar') {
    element.style.direction = 'rtl';
  }else{
    element.style.direction = 'ltr';
  }
}

function changeLang() {
  if (lang == 'ar') {
    lang = 'en';
  }else{
    lang = 'ar';
  }

  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }

  const orders = document.querySelector('.orders');
  changeDirection(orders);

  const clientSelectors = document.querySelectorAll('.clientName');
  clientSelectors.forEach(clientSelector => {
    const val = clientSelector.value;
    clientSelector.innerHTML = '';
    setOptionsArr(clientSelector, clients);
    clientSelector.value = val;
  });

  const typeSelectors = document.querySelectorAll('.typeOptions');
  typeSelectors.forEach(typeSelector => {
    const val = typeSelector.value;
    typeSelector.innerHTML = '';
    setOptionsArr(typeSelector, types);
    typeSelector.value = val;
  });

  orders.querySelector('#addOrder').innerHTML = content[0][i];
  orders.querySelector('#changeLang').innerHTML = content[8][i];
  orders.querySelectorAll('th').forEach((element, index) => {
    element.innerHTML = content[index+1][i];
  });
  orders.querySelectorAll('.totalclient').forEach((element) => {
    element.firstElementChild.innerHTML = content[9][i] + ' : ';
    element.lastElementChild.innerHTML = content[7][i];
  });
  orders.querySelector('.totalPrice').firstElementChild.innerHTML = content[6][i] + ' : ';
  orders.querySelector('.totalPrice').lastElementChild.innerHTML = content[7][i];

  CalculateTotals();
}




// Events
window.onload = function WindowLoad(event) {
  createOrderTable();
  displayNameRows();
  displayTypeRows();
  addOrderRow();
}

var float = document.querySelector('.float');

// const closer = document.getElementById('closeFloat');
// closer.addEventListener('click', () => {
//   float.style.display  = 'none';
// });

// const opener = document.getElementById('openFloat');
// opener.addEventListener('click',() => {
//   float.style.display  = 'grid';
// });

