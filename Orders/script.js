// Data
let clients = [
  'Ahmed Salama',
  'Islam Ibrahim',
  'Islam Anwer',
  'Mohamed Ashraf',
  'Mohamed Abdallah',
  'Sameh',
  'Ahmed Adel',
  'Rafat',
  'Abdelrhman'
]

clients.sort();

let types = {
  Bean: 3,
  Ta3mia: 3.5,
  Potatoes: 4,
  Chease: 4,
  Egg: 4,
  Papa: 4
}

let orders = []

let totalOrderItems = {}

// Functins
function setOptionsArr(element, content) {
  for (let i = 0; i < content.length; i++) {
    var tag = document.createElement('option');
    tag.value = i + 1;
    tag.innerHTML = content[i];
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

  fristTag.innerHTML = `
  <td rowspan="2" class="name">
  <select class="clientName" name="clientName" id="clientName">
  </select>
</td>

<td id="types">
  <select class="typeOptions" name="typeOptions" id="typeOptions">
  </select>
  <input type="number" onchange="this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
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
      <span>Client Total : </span>
      <span class="totalclientVal">00</span> EP
    </td>
  </tr>
  `;
  const rowsWarpper = document.getElementById('rows');
  rowsWarpper.appendChild(fristTag);
  setOptionsArr(fristTag.querySelector("#clientName"), clients);
  setOptionsObj(fristTag.querySelector("#typeOptions"), types);
  rowsWarpper.appendChild(secondTag);
}

function addTypeCol() {
  var tag = document.createElement('td');
  tag.innerHTML = `
      <select class="typeOptions" name="typeOptions" id="typeOptions">
      </select>
      <input type="number" onchange="this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    `;
  this.event.currentTarget.parentElement.parentElement.querySelector('#types').appendChild(tag);
  setOptionsObj(tag.querySelector("#typeOptions"), types);
  CalculateTotals();
}

function removeTypeCol() {
  var types = this.event.currentTarget.parentElement.parentElement.querySelector('#types');
  types.removeChild(types.lastChild);
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
      totalClient += (types[t.value] * t.nextElementSibling.value);
      orderItem[t.value] = parseInt(t.nextElementSibling.value)
    });
    orders.push(orderItem);
    totalOrder += totalClient;
    e.parentElement.nextElementSibling.querySelector('span.totalclientVal').innerHTML = totalClient;
  });
  document.querySelector('#totalPriceVal').innerHTML = totalOrder;
  calculateTotalOrderItems();
}

function calculateTotalOrderItems() {
  totalOrderItems = {}
  orders.forEach(order => {
    for (const key in order) {
      if (typeof(totalOrderItems[key]) === 'undefined') {
        // console.log(typeof(order[key]) + order[key]);
        debugger;
        if (!isNaN(order[key])) {
          totalOrderItems[key] = order[key];
        }
      }else{
        if (!isNaN(order[key])) {
          totalOrderItems[key] += order[key];
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
  clients.forEach(client => {
    var tag = document.createElement('tr');
    tag.innerHTML  = `
    <td>
      <input type="text" name="enName" id="enName" value="${client}">
    </td>
    <td>
      <input type="text" name="enName" id="enName" value="${client}">
    </td>
    <td class="remove">
      <button class="removeType" onclick="">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  });
}
function displayTypeRows() {
  const rowsWarpper = document.getElementById('typeRows');
  for (const key in types) {
    var tag = document.createElement('tr');
    tag.innerHTML  = `
    <td>
      <input type="text" name="enName" id="enName" value="${key}">
    </td>
    <td>
      <input type="text" name="enName" id="enName" value="${key}">
    </td>
    <td>
      <input type="number" name="enName" id="enName" value="${types[key]}">
    </td>
    <td class="remove">
      <button class="removeType" onclick="">
        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
      </button>
    </td>`;
    rowsWarpper.appendChild(tag);
  }
}

// Events
const names = document.getElementById('clientName');
const typeOptions = document.getElementById('typeOptions');
window.onload = function WindowLoad(event) {
  setOptionsArr(names, clients);
  setOptionsObj(typeOptions, types);
  displayNameRows();
  displayTypeRows();
  var addOrderBtn = document.getElementById('addOrder');
}



