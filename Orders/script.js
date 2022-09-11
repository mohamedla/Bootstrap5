// Data
let content = [
  ['Add New Order', 'أضف طلب جديد'],
  ['Name', 'الاسم'],
  ['Order', 'الطلب'],
  ['Add', 'أضف'],
  ['Remove', 'حذف'],
  ['Cancel', 'الغاء'],
  ['Total Order', 'الطلب الكلى'],
  ['EP', 'ج'],
  ['ع', 'E'],
  ['Client Total', 'اجمالى العميل'],
]

let clients = [
  ['Ahmed Salama', 'احمد سلامة'],
  ['Islam Ibrahim', 'اسلام ابراهيم'],
  ['Islam Anwer', 'اسلام أنور'],
  ['Mohamed Ashraf', 'محمد أشرف'],
  ['Mohamed Abdallah', 'محمد عبد الله'],
  ['Sameh', 'سامح'],
  ['Ahmed Adel', 'أحمد عادل'],
  ['Raafat', 'رأفت'],
  ['Abdelrhman', 'عبدالرحمن']
]

let totalOrder = 0;
let cheque = 0;

let types = [
  ['Foool', 'فول', 3],
  ['Ta3mia', 'طعمية', 3.5],
  ['Potatoes', 'بطاطس', 4],
  ['Chease', 'جبنة', 4],
  ['Egg', 'بيض', 4],
  ['Papa', 'بابا', 4],
  ['FoolWTa3mia', 'فول بالطعمية', 3.5],
  ['FoolWEgg', 'فول بالبيض', 4],
  ['Ta3miaWEgg', 'طعمية بالبيض', 4]
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
    <input onchange="paied()" type="checkbox" name="paied"><span>${content[9][i]}: </span>
      <span class="totalclientVal">0</span> 
      <span>${content[7][i]}</span>
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
function addTypeCol2(element) {
  var tag = document.createElement('div');
  tag.className = 'typesWarp';
  tag.innerHTML = `
      <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">
      </select>
      <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    `;
  element.appendChild(tag);
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
  totalOrder = 0;
  collect.forEach(e => {
    let totalClient = 0;
    const clientOrder = e.querySelectorAll('select.typeOptions');
    let orderItem = [];
    orderItem.push(parseInt(clientOrder[0].parentElement.parentElement.parentElement.querySelector('#clientName').value));
    clientOrder.forEach(t => {
      totalClient += (types[t.value - 1][2] * t.nextElementSibling.value);
      orderItem.push([t.value, parseInt(t.nextElementSibling.value)]);
    });
    orders.push(orderItem);
    totalOrder += totalClient;
    if (totalClient > 0) {
      e.parentElement.nextElementSibling.querySelector('span.totalclientVal').innerHTML = `
        ${totalClient} + 1 = <span class='totToPay'>${totalClient + 1}</span>
      `;
    } else {
      e.parentElement.nextElementSibling.querySelector('span.totalclientVal').innerHTML = totalClient;
    }
  });
  cheque = totalOrder + orders.length;
  if (totalOrder > 0) {
    document.querySelector('#totalPriceVal').innerHTML = totalOrder + ' + ' + (orders.length) + ' = ' + cheque;
  }
  calculateTotalOrderItems();
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
    order.forEach(ele => {
      if (typeof(ele) == 'object') {
        if (typeof (totalOrderItems[types[ele[0] - 1][i]]) === 'undefined') {
          if (!isNaN(ele[1])) {
            totalOrderItems[types[ele[0] - 1][i]] = ele[1];
          }
        } else {
          if (!isNaN(ele[1])) {
            totalOrderItems[types[ele[0] - 1][i]] += ele[1];
          }
        }
      }
    });
  });
  let itemsHolder = document.querySelector('#totalOrderItems');
  let itemsContainer = ``;
  for (const key in totalOrderItems) {
    itemsContainer += ` <span class ="orderItem"> ${key} ${totalOrderItems[key]} </span>`;
  }
  itemsHolder.innerHTML = itemsContainer;
}

function displayNameRows(array) {
  const rowsWarpper = document.getElementById('nameRows');
  rowsWarpper.innerHTML = '';
  array.forEach((client, index) => {
    var tag = document.createElement('tr');
    tag.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <input type="text" name="enName" id="enName" value="${client[0]}">
    </td>
    <td>
      <input type="text" name="enName" id="enName" value="${client[1]}">
    </td>
    <td class="remove">
      <button class="removeType" onclick="removeSettingRow(clients, 'nameRows', 'N')">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  });
}

function displayTypeRows(array) {
  const rowsWarpper = document.getElementById('typeRows');
  array.forEach((type, index) => {

    var tag = document.createElement('tr');
    tag.innerHTML = `
    <td>${index + 1}</td>
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
      <button class="removeType" onclick="removeSettingRow(types, 'typeRows', 'T')">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  });
}

function removeSettingRow(array, rows, dis) {
  const row = this.event.currentTarget.parentElement.parentElement;
  if (row.firstElementChild.innerText != '*') {
    let thisArray = array;
    thisArray.splice(parseInt(row.firstElementChild.innerText) - 1, 1);
    document.getElementById(rows).innerHTML = '';
    if (dis == 'N') {
      displayNameRows(thisArray);
    } else if (dis == 'T') {
      displayTypeRows(thisArray);
    }
  } else {
    row.remove();
  }
}

function addSettingRow(dis) {
  let rowsWarpper;
  if (dis == 'N') {
    rowsWarpper = document.getElementById('nameRows');
    var tag = document.createElement('tr');
    tag.innerHTML = `
    <td>*</td>
    <td>
      <input type="text" name="enName" id="enName">
    </td>
    <td>
      <input type="text" name="enName" id="enName">
    </td>
    <td class="remove">
      <button class="removeType" onclick="removeSettingRow(clients, 'nameRows', 'N')">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
  } else if (dis == 'T') {
    debugger;
    rowsWarpper = document.getElementById('typeRows');
    var tag = document.createElement('tr');
    tag.innerHTML =  `
    <td>*</td>
    <td>
      <input type="text" name="enName" id="enName">
    </td>
    <td>
      <input type="text" name="enName" id="enName">
    </td>
    <td>
      <input type="number" name="enName" id="enName">
    </td>
    <td class="remove">
      <button class="removeType" onclick="removeSettingRow(types, 'typeRows', 'T')">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
  }
  rowsWarpper.appendChild(tag);

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
  } else {
    element.style.direction = 'ltr';
  }
}

function changeLang() {
  if (lang == 'ar') {
    lang = 'en';
  } else {
    lang = 'ar';
  }

  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }

  const orders = document.querySelector('.orders');
  changeDirection(orders);
  changeDirection(document.querySelector('.types table'));
  changeDirection(document.querySelector('.names table'));

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
    element.innerHTML = content[index + 1][i];
  });
  orders.querySelectorAll('.totalclient').forEach((element) => {
    debugger;
    element.querySelector('input + span').innerHTML = content[9][i] + ' : ';
    element.lastElementChild.innerHTML = content[7][i];
  });
  orders.querySelector('.totalPrice').firstElementChild.innerHTML = content[6][i] + ' : ';
  orders.querySelector('.totalPrice').lastElementChild.innerHTML = content[7][i];

  CalculateTotals();
}

function paied() {
  const currentTarget = this.event.currentTarget;
  const val = currentTarget.parentElement.querySelector('.totToPay');
  if (currentTarget.checked && val !== null) {
    currentTarget.parentElement.style.textDecoration = 'line-through';
    cheque -= parseFloat(val.innerHTML);
    totalOrder
  } else if (val !== null) {
    currentTarget.parentElement.style.textDecoration = 'none';
    cheque += parseFloat(val.innerHTML);
  }
}

function submitSettings(dis) {
  if (dis == 'N') {
    const rows = document.querySelectorAll('.settings #nameRows tr');
    clients = [];
    let client = [];
    rows.forEach(row => {
      client = [];
      row.querySelectorAll('td input').forEach(val => {
        client.push(val.value);
      });
      clients.push(client);
    });
    const clientSelectors = document.querySelectorAll('.clientName');
    clientSelectors.forEach(clientSelector => {
      const val = clientSelector.value;
      clientSelector.innerHTML = '';
      setOptionsArr(clientSelector, clients);
      clientSelector.value = val;
    });
  } else if (dis == 'T') {
      const rows = document.querySelectorAll('.settings #typeRows tr');
      types = [];
      let type = [];
      rows.forEach(row => {
        type = [];
        row.querySelectorAll('td input').forEach(val => {
          type.push(val.value);
        });
        types.push(type);
      });
      const typeSelectors = document.querySelectorAll('.typeOptions');
      typeSelectors.forEach(typeSelector => {
        const val = typeSelector.value;
        typeSelector.innerHTML = '';
        setOptionsArr(typeSelector, types);
        typeSelector.value = val;
      });
  }
alert('Setting Saved');
}

function displayStored() {
  const mydata = JSON.parse(window.localStorage.getItem('appData'));
  // diplay total item
  // const totalOrderItems = mydata.totalOrderItems;
  // let itemsHolder = document.querySelector('#totalOrderItems');
  // let itemsContainer = ``;
  // for (const key in totalOrderItems) {
  //   itemsContainer += ` <span class ="orderItem"> ${key} ${totalOrderItems[key]} </span>`;
  // }
  // itemsHolder.innerHTML = itemsContainer;
  // diplay total cost
  // if (totalOrder > 0) {
  //   document.querySelector('#totalPriceVal').innerHTML = totalOrder + ' + ' + (orders.length) + ' = ' + cheque;
  // }
  // display orders
  addStoredOrderRow(orders);
  CalculateTotals();
}

function addStoredOrderRow(orders) {
  const rowsWarpper = document.getElementById('rows');
  let i;
  if (lang == 'en') {
    i = 0;
  } else {
    i = 1;
  }
  orders.forEach(order => {
    addOrderRow();
    let thisRow = document.querySelector('#rows').lastElementChild.previousElementSibling;
    thisRow.querySelector('#clientName').value = order[0];
    let types = thisRow.querySelector('#types');
    order.forEach((ele, index) => {
      if (index > 0) {
        if (index > 1) {
          addTypeCol2(types);
        }
        types.lastElementChild.firstElementChild.value = ele[0];
        types.lastElementChild.lastElementChild.value = ele[1];
      }
    });
  });
  
}

// Events
window.onunload = () =>{
  let myData = {}
    myData.content = content;
    myData.clients = clients;
    myData.totalOrder = totalOrder;
    myData.cheque = cheque;
    myData.types = types;
    myData.orders = orders;
    myData.totalOrderItems = totalOrderItems;
    myData.lang = lang;
    window.localStorage.setItem('appData', JSON.stringify(myData));
    JSON.parse(window.localStorage.getItem('appData'));
}

window.onload = function WindowLoad(event) {
  let myData = JSON.parse(window.localStorage.getItem('appData'));
  if (myData != null) {
    content = myData.content;
    clients = myData.clients;
    totalOrder = myData.totalOrder;
    cheque = myData.cheque;
    types = myData.types;
    orders = myData.orders;
    totalOrderItems =  myData.totalOrderItems;
    lang =  myData.lang;
    createOrderTable();
    displayStored();
  }else{
    createOrderTable();
    addOrderRow();
  }

  var float = document.querySelector('.float');

  const opener = document.getElementById('openFloat');
  opener.addEventListener('click', () => {
    float.style.display = 'grid';
    displayNameRows(clients);
    displayTypeRows(types);
  });

  const closer = document.getElementById('closeFloat');
  closer.addEventListener('click', () => {
    float.style.display = 'none';
  });

  let pageActive = 0;
  const pagesBtns = document.querySelectorAll('.pages .pagesBtn');
  pagesBtns.forEach((pagesBtn, index) => {
    pagesBtn.addEventListener('click', () => {
      pagesBtns[pageActive].classList.remove("active");
      pagesBtn.classList.add("active");
      pageActive = index;
    });
  });
  const typePage = document.querySelector('.pages #typePage');
  typePage.addEventListener('click', () => {
    document.querySelector('.settings .names').style.display = 'none';
    document.querySelector('.settings .types').style.display = 'flex';
  });
  const namePage = document.querySelector('.pages #namePage');
  namePage.addEventListener('click', () => {
    document.querySelector('.settings .names').style.display = 'flex';
    document.querySelector('.settings .types').style.display = 'none';
  });
}




