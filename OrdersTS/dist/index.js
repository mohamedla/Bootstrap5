"use strict";
//import { INames, IItems, IClientOrder, IOrderItem, StoredData } from "./interfaces";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var language;
(function (language) {
    language[language["en"] = 1] = "en";
    language[language["ar"] = 2] = "ar";
})(language || (language = {}));
var settingType;
(function (settingType) {
    settingType["client"] = "N";
    settingType["item"] = "T";
})(settingType || (settingType = {}));
var dataFor;
(function (dataFor) {
    dataFor[dataFor["client"] = 1] = "client";
    dataFor[dataFor["item"] = 2] = "item";
    dataFor[dataFor["content"] = 3] = "content";
    dataFor[dataFor["insert"] = 4] = "insert";
})(dataFor || (dataFor = {}));
// System Language
let content = [
    {
        Id: 1,
        EName: 'Add New Order',
        AName: 'أضف طلب جديد'
    },
    {
        Id: 2,
        EName: 'Name',
        AName: 'الاسم'
    },
    {
        Id: 3,
        EName: 'Order',
        AName: 'الطلب'
    },
    {
        Id: 4,
        EName: 'Add',
        AName: 'أضف'
    },
    {
        Id: 5,
        EName: 'Remove',
        AName: 'حذف'
    },
    {
        Id: 6,
        EName: 'Cancel',
        AName: 'الغاء'
    },
    {
        Id: 7,
        EName: 'Total Order',
        AName: 'الطلب الكلى'
    },
    {
        Id: 8,
        EName: 'EP',
        AName: 'ج'
    },
    {
        Id: 9,
        EName: 'ع',
        AName: 'E'
    },
    {
        Id: 10,
        EName: 'Client Total',
        AName: 'اجمالى العميل'
    },
    {
        Id: 11,
        EName: 'En Name',
        AName: 'الاسم بالانجليزية'
    },
    {
        Id: 12,
        EName: 'Ar Name',
        AName: 'الاسم بالعربية'
    },
    {
        Id: 13,
        EName: 'Price',
        AName: 'السعر'
    },
    {
        Id: 14,
        EName: 'Add New Type',
        AName: 'اضافة صنف جديد'
    },
    {
        Id: 15,
        EName: 'Add New Name',
        AName: 'اضافة اسم جديد'
    },
    {
        Id: 16,
        EName: 'Submit',
        AName: 'إرسال'
    },
    {
        Id: 17,
        EName: 'Names',
        AName: 'الأسماء'
    },
    {
        Id: 18,
        EName: 'Types',
        AName: 'الأصناف'
    }
];
// clients names
let clients = [
    {
        Id: 1,
        EName: 'Ahmed',
        AName: 'احمد'
    },
    {
        Id: 2,
        EName: 'Islam Ibrahim',
        AName: 'اسلام ابراهيم'
    },
    {
        Id: 3,
        EName: 'Islam Anwer',
        AName: 'اسلام أنور'
    },
    {
        Id: 4,
        EName: 'Sameh',
        AName: 'سامح'
    },
    {
        Id: 5,
        EName: 'Mohamed Ashraf',
        AName: 'محمد أشرف'
    },
    {
        Id: 6,
        EName: 'Mohamed Abdallah',
        AName: 'محمد عبد الله'
    },
    {
        Id: 7,
        EName: 'Ahmed Adel',
        AName: 'أحمد عادل'
    },
    {
        Id: 8,
        EName: 'Raafat',
        AName: 'رأفت'
    },
    {
        Id: 9,
        EName: 'Abdelrhman',
        AName: 'عبدالرحمن'
    }
];
let nextClientId = 10;
// Item List
let types = [
    { Id: 1, EName: 'Fool', AName: 'فول', Price: 3 },
    { Id: 2, EName: 'Ta3mia', AName: 'طعمية', Price: 3.5 },
    { Id: 3, EName: 'Potatoes', AName: 'بطاطس', Price: 4 },
    { Id: 4, EName: 'Chease', AName: 'جبنة', Price: 4 },
    { Id: 5, EName: 'Egg', AName: 'بيض', Price: 4 },
    { Id: 6, EName: 'Papa', AName: 'بابا', Price: 4 },
    { Id: 7, EName: 'FoolWTa3mia', AName: 'فول بالطعمية', Price: 3.5 },
    { Id: 8, EName: 'FoolWEgg', AName: 'فول بالبيض', Price: 4 },
    { Id: 9, EName: 'Ta3miaWEgg', AName: 'طعمية بالبيض', Price: 4 }
];
let nextTypetId = 10;
let totalOrder = 0;
let cheque = 0;
let orders = [];
let totalOrderItems = [];
let lang = language.en;
// add option to select element
function setOptionsArr(element, content) {
    content.forEach(names => {
        const tag = document.createElement('option');
        tag.value = names.Id.toString();
        if (lang == language.en) {
            tag.innerHTML = names.EName;
        }
        else {
            tag.innerHTML = names.AName;
        }
        element.appendChild(tag);
    });
}
// add new order row for new client
function addOrderRow() {
    let fristTag = document.createElement('tr');
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
        <input onchange="paied()" type="checkbox" name="paied"><span>${lang == language.ar ? content[9].AName : content[9].EName}: </span>
            <span class="totalclientVal">0</span> 
            <span>${lang == language.ar ? content[7].AName : content[7].EName}</span>
        </td>
    </tr>
    `;
    const rowsWarpper = document.getElementById('rows');
    rowsWarpper.appendChild(fristTag);
    setOptionsArr(fristTag.querySelector("#clientName"), clients);
    setOptionsArr(fristTag.querySelector("#typeOptions"), types);
    rowsWarpper.appendChild(secondTag);
}
// add new item to order
function addTypeCol(param, element) {
    var _a, _b, _c, _d;
    let tag = document.createElement('div');
    tag.className = 'typesWarp';
    tag.innerHTML = `
        <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">
        </select>
        <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    `;
    if (param == 2 && typeof element !== 'undefined')
        element.appendChild(tag);
    else
        (_d = (_c = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('#types')) === null || _d === void 0 ? void 0 : _d.appendChild(tag);
    setOptionsArr(tag.querySelector("#typeOptions"), types);
}
// Calculate the total order
function calculateTotalOrderItems() {
    totalOrderItems = [];
    orders.forEach(ClientOrder => {
        ClientOrder.Order.forEach(orderItem => {
            if (totalOrderItems.filter(totOI => totOI.ItemId == orderItem.ItemId).length === 0) {
                totalOrderItems.push(orderItem);
            }
            else {
                const index = totalOrderItems.map(totOI => totOI.ItemId).indexOf(orderItem.ItemId);
                totalOrderItems[index].Quantity += orderItem.Quantity;
            }
        });
    });
    let itemsHolder = document.querySelector('#totalOrderItems');
    let itemsContainer = ``;
    totalOrderItems.forEach(orderItem => {
        itemsContainer += ` <span class ="orderItem"> ${lang == language.ar ? types.filter(t => t.Id == orderItem.ItemId)[0].AName : types.filter(t => t.Id == orderItem.ItemId)[0].EName} ${orderItem.Quantity} </span>`;
    });
    itemsHolder.innerHTML = itemsContainer;
}
// Calculate each Order
function CalculateTotals() {
    orders = [];
    const collect = document.querySelectorAll('td#types');
    totalOrder = 0;
    collect.forEach(row => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let totalClient = 0;
        const clientOrderRow = row.querySelectorAll('select.typeOptions');
        let clientOrder = {};
        let clientName = (_d = (_c = (_b = (_a = clientOrderRow[0]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector('#clientName');
        if (clientName === undefined) {
            cancelOrder();
            return;
        }
        clientOrder.ClientId = parseInt(clientName.value);
        clientOrder.Order = [];
        clientOrderRow.forEach(t => {
            const orderQuantity = Number.isNaN(parseInt(t.nextElementSibling.value)) ? 0 : parseInt(t.nextElementSibling.value);
            totalClient += (types.filter(type => type.Id == parseInt(t.value))[0].Price * orderQuantity);
            let OrderItem = { ItemId: parseInt(t.value), Quantity: orderQuantity };
            clientOrder.Order.push(OrderItem);
        });
        orders.push(clientOrder);
        totalOrder += totalClient;
        if (totalClient > 0) {
            ((_f = (_e = row === null || row === void 0 ? void 0 : row.parentElement) === null || _e === void 0 ? void 0 : _e.nextElementSibling) === null || _f === void 0 ? void 0 : _f.querySelector('span.totalclientVal')).innerHTML = `
                ${totalClient} + 1 = <span class='totToPay'>${totalClient + 1}</span>
            `;
        }
        else {
            ((_h = (_g = row === null || row === void 0 ? void 0 : row.parentElement) === null || _g === void 0 ? void 0 : _g.nextElementSibling) === null || _h === void 0 ? void 0 : _h.querySelector('span.totalclientVal')).innerHTML = totalClient.toString();
        }
    });
    cheque = totalOrder + orders.length; // Total Order +  1$ Delivary fees for each order
    if (totalOrder > 0) {
        document.querySelector('#totalPriceVal').innerHTML = totalOrder + ' + ' + (orders.length) + ' = ' + cheque;
    }
    calculateTotalOrderItems();
}
// Remove Item From Client Order
function removeTypeCol() {
    var _a, _b, _c;
    var types = (_c = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('#types');
    types === null || types === void 0 ? void 0 : types.removeChild(types.lastElementChild);
    CalculateTotals();
}
// Cancel Client Order
function cancelOrder() {
    var _a, _b, _c;
    var row = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    if (row) {
        (_c = row.nextElementSibling) === null || _c === void 0 ? void 0 : _c.remove();
        row.remove();
    }
    CalculateTotals();
}
// dispay clients on settings
function displayNameRows(array) {
    const rowsWarpper = document.getElementById('nameRows');
    rowsWarpper.innerHTML = '';
    array.forEach((client, index) => {
        var tag = document.createElement('tr');
        tag.innerHTML = `
        <td>${index + 1}</td>
        <input type="number" hidden name="id" value="${client.Id}">
        <td>
            <input type="text" name="enName" value="${client.EName}">
        </td>
        <td>
            <input type="text" name="arName" value="${client.AName}">
        </td>
        <td class="remove">
            <button class="removeType" onclick="removeSettingRow(clients, 'nameRows', 'N')">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
        </td>`;
        rowsWarpper.appendChild(tag);
    });
}
// dispay Items on settings
function displayTypeRows(array) {
    const rowsWarpper = document.getElementById('typeRows');
    rowsWarpper.innerHTML = '';
    array.forEach((type, index) => {
        var tag = document.createElement('tr');
        tag.innerHTML = `
        <td>${index + 1}</td>
        <input type="number" hidden name="id" value="${type.Id}">
        <td>
            <input type="text" name="enName"  value="${type.EName}">
        </td>
        <td>
            <input type="text" name="arName" value="${type.AName}">
        </td>
        <td>
            <input type="number" name="price" value="${type.Price}">
        </td>
        <td class="remove">
            <button class="removeType" onclick="removeSettingRow(types, 'typeRows', 'T')">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
        </td>`;
        rowsWarpper.appendChild(tag);
    });
}
// Remove new row in setting (Name or Items)
function removeSettingRow(array, rows, dis) {
    var _a, _b;
    const row = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    if (row.firstElementChild.innerText != '*') {
        let thisArray = array;
        thisArray.splice(parseInt(row.firstElementChild.innerText) - 1, 1);
        document.getElementById(rows).innerHTML = '';
        if (dis == settingType.client) {
            displayNameRows(thisArray);
        }
        else if (dis == settingType.item) {
            displayTypeRows(thisArray);
        }
    }
    else {
        row.remove();
    }
}
// add new row in setting (Name or Items)
function addSettingRow(dis) {
    let rowsWarpper;
    let tag;
    if (dis == settingType.client) {
        rowsWarpper = document.getElementById('nameRows');
        tag = document.createElement('tr');
        tag.innerHTML = `
        <td>${clients.length + 1}</td>
        <input type="number" hidden name="id" value="${nextClientId}">

        <td>
            <input type="text" name="enName">
        </td>
        <td>
            <input type="text" name="arName">
        </td>
        <td class="remove">
            <button class="removeType" onclick="removeSettingRow(clients, 'nameRows', 'N')">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
        </td>`;
        nextClientId++;
    }
    else if (dis == settingType.item) {
        rowsWarpper = document.getElementById('typeRows');
        tag = document.createElement('tr');
        tag.innerHTML = `
        <td>${types.length + 1}</td>
        <input type="number" hidden name="id" value="${nextTypetId}">
        <td>
            <input type="text" name="enName">
        </td>
        <td>
            <input type="text" name="arName">
        </td>
        <td>
            <input type="number" name="price">
        </td>
        <td class="remove">
            <button class="removeType" onclick="removeSettingRow(types, 'typeRows', 'T')">
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            </button>
        </td>`;
        nextTypetId++;
    }
    rowsWarpper.prepend(tag);
}
// Change dispaly direction following lang change
function changeDirection(element) {
    if (lang == language.ar) {
        element.style.direction = 'rtl';
    }
    else {
        element.style.direction = 'ltr';
    }
}
// Create new order table
function createOrderTable() {
    const orders = document.querySelector('.orders');
    orders.innerHTML = `
    <div class="addOrderwarpper">
    <button class="addOrder" id="addOrder" onclick="addOrderRow();" type="button">${lang == language.ar ? content[0].AName : content[0].EName}</button>
    <button id="changeLang" onclick="changeLang();" type="button">${lang == language.ar ? content[8].AName : content[8].EName}</button>
    <button id="openFloat">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    </button>
    </div>
    <table>
    <thead>

        <tr>
        <th style="max-width: 20%;width: 15%;">${lang == language.ar ? content[1].AName : content[1].EName}</th>
        <th>${lang == language.ar ? content[2].AName : content[2].EName}</th>
        <th>${lang == language.ar ? content[3].AName : content[3].EName}</th>
        <th>${lang == language.ar ? content[4].AName : content[4].EName}</th>
        <th>${lang == language.ar ? content[5].AName : content[5].EName}</th>
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
            <span>${lang == language.ar ? content[6].AName : content[6].EName} : </span>
            <span id="totalPriceVal">0</span> <span id="totalPriceVal">${lang == language.ar ? content[7].AName : content[7].EName}</span>
        </td>
        </tr>
    </tfoot>
    </table>
    `;
    changeDirection(orders);
}
// Create Setting Section
function createSettingsPart() {
    const float = document.querySelector('.float');
    float.innerHTML = ``;
    float.innerHTML = `
    <div class="pages">
        <button class="pagesBtn active" id="namePage">${lang == language.ar ? content[16].AName : content[16].EName}</button>
        <button class="pagesBtn" id="typePage">${lang == language.ar ? content[17].AName : content[17].EName}</button>
        <button id="closeFloat">
            <svg
                class="close"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
        </button>
    </div>
    <div class="settings">
        <div class="names">
            <div class="addOrderwarpper">
                <button
                class="addOrder"
                id="addName"
                onclick="addSettingRow('N')"
                type="button"
                >
                ${lang == language.ar ? content[14].AName : content[14].EName}
                </button>
                <button
                class="sumbitNames"
                id="sumbitNames"
                onclick=" submitSettings('N')"
                type="button"
                >
                ${lang == language.ar ? content[15].AName : content[15].EName}
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>${lang == language.ar ? content[10].AName : content[10].EName}</th>
                    <th>${lang == language.ar ? content[11].AName : content[11].EName}</th>
                    <th>${lang == language.ar ? content[4].AName : content[4].EName}</th>
                </tr>
                </thead>
                <tbody id="nameRows"></tbody>
            </table>
        </div>
        <div class="types">
            <div class="addOrderwarpper">
                <button class="addOrder" id="addType" onclick="addSettingRow('T')" type="button">
                ${lang == language.ar ? content[13].AName : content[13].EName}
                </button>
                <button
                class="sumbitNames"
                id="sumbittypes"
                onclick="submitSettings('T')"
                type="button"
                >
                ${lang == language.ar ? content[15].AName : content[15].EName}
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>${lang == language.ar ? content[10].AName : content[10].EName}</th>
                    <th>${lang == language.ar ? content[11].AName : content[11].EName}</th>
                    <th>${lang == language.ar ? content[12].AName : content[12].EName}</th>
                    <th>${lang == language.ar ? content[4].AName : content[4].EName}</th>
                </tr>
                </thead>
                <tbody id="typeRows"></tbody>
            </table>
        </div>
    </div>
    `;
    changeDirection(float);
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
// Change app language 
function changeLang() {
    if (lang == language.ar) {
        lang = language.en;
    }
    else {
        lang = language.ar;
    }
    const orders = document.querySelector('.orders');
    changeDirection(orders);
    createSettingsPart();
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
    orders.querySelector('#addOrder').innerHTML = lang == language.ar ? content[0].AName : content[0].EName;
    orders.querySelector('#changeLang').innerHTML = lang == language.ar ? content[8].AName : content[8].EName;
    orders.querySelectorAll('th').forEach((element, index) => {
        element.innerHTML = lang == language.ar ? content[index + 1].AName : content[index + 1].EName;
    });
    orders.querySelectorAll('.totalclient').forEach((element) => {
        element.querySelector('input + span').innerHTML = lang == language.ar ? content[9].AName : content[9].EName;
        +' : ';
        element.lastElementChild.innerHTML = lang == language.ar ? content[7].AName : content[7].EName;
    });
    orders.querySelector('.totalPrice').firstElementChild.innerHTML = lang == language.ar ? content[6].AName : content[6].EName;
    +' : ';
    orders.querySelector('.totalPrice').lastElementChild.innerHTML = lang == language.ar ? content[7].AName : content[7].EName;
    CalculateTotals();
}
function paied() {
    var _a, _b;
    const currentTarget = (_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget;
    const val = (_b = currentTarget.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.totToPay');
    if (currentTarget.checked && val !== null) {
        currentTarget.parentElement.style.textDecoration = 'line-through';
        cheque -= parseFloat(val.innerHTML);
        totalOrder;
    }
    else if (val !== null) {
        currentTarget.parentElement.style.textDecoration = 'none';
        cheque += parseFloat(val.innerHTML);
    }
}
function submitSettings(dis) {
    if (dis == settingType.client) {
        const rows = document.querySelectorAll('.settings #nameRows tr');
        clients = [];
        rows.forEach(row => {
            let client = {
                Id: 0,
                EName: '',
                AName: ''
            };
            client.Id = parseInt(row.querySelector('input[name="id"]').value);
            client.AName = row.querySelector('td input[name="arName"]').value;
            client.EName = row.querySelector('td input[name="enName"]').value;
            clients.push(client);
        });
        const clientSelectors = document.querySelectorAll('.clientName');
        clientSelectors.forEach(clientSelector => {
            const val = clientSelector.value;
            clientSelector.innerHTML = '';
            setOptionsArr(clientSelector, clients);
            clientSelector.value = val;
        });
    }
    else if (dis == settingType.item) {
        const rows = document.querySelectorAll('.settings #typeRows tr');
        types = [];
        rows.forEach(row => {
            let type = {
                Id: 0,
                EName: '',
                AName: '',
                Price: 0
            };
            type.Id = parseInt(row.querySelector('input[name="id"]').value);
            type.AName = row.querySelector('td input[name="arName"]').value;
            type.EName = row.querySelector('td input[name="enName"]').value;
            type.Price = parseInt(row.querySelector('td input[name="price"]').value);
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
function addStoredOrderRow(orders) {
    const rowsWarpper = document.getElementById('rows');
    orders.forEach(order => {
        addOrderRow();
        let thisRow = rowsWarpper.lastElementChild.previousElementSibling;
        thisRow.querySelector('#clientName').value = order.ClientId.toString();
        let types = thisRow.querySelector('#types');
        order.Order.forEach((ele, index) => {
            if (index > 1) {
                addTypeCol(2, types);
            }
            types.lastElementChild.firstElementChild.value = ele.ItemId.toString();
            types.lastElementChild.lastElementChild.value = ele.Quantity.toString();
        });
    });
}
function displayStored() {
    addStoredOrderRow(orders);
    CalculateTotals();
}
window.onunload = () => {
    let myData;
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
};
function SqlWorker(buf, sqlSentance, dataFor) {
    return __awaiter(this, void 0, void 0, function* () {
        const worker = new Worker("/dist/dist/worker.sql-wasm.js");
        console.log(Worker.toString());
        worker.onmessage = () => {
            console.log('Worker Message');
            worker.onmessage =
                event => {
                    //const { dataFor } = event.data;
                    const { values } = event.data.results[0];
                    switch (dataFor) {
                        case 1:
                            clients = values.length > 0
                                ? values.map((row) => ({
                                    Id: parseInt(row[0]),
                                    EName: row[1].toString(),
                                    AName: row[2].toString(),
                                }))
                                : clients;
                            break;
                        case 2:
                            types = values.length > 0
                                ? values.map((row) => ({
                                    Id: parseInt(row[0]),
                                    EName: row[1].toString(),
                                    AName: row[2].toString(),
                                    Price: parseFloat(row[3]),
                                }))
                                : types;
                            break;
                        case 3:
                            content = values.length > 0
                                ? values.map((row) => ({
                                    Id: parseInt(row[0]),
                                    EName: row[1].toString(),
                                    AName: row[2].toString(),
                                }))
                                : content;
                            break;
                        default:
                            break;
                    }
                    console.log(dataFor.toString() + event.data); // The result of the query
                };
            worker.postMessage({
                id: 2,
                action: "exec",
                sql: sqlSentance, //"SELECT * FROM Clients"
            });
        };
        worker.onerror = e => console.log("Worker error: ", e);
        worker.postMessage({
            id: 1,
            action: "open",
            buffer: buf, /*Optional. An ArrayBuffer representing an SQLite Database file*/
        });
    });
}
window.onload = function WindowLoad(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const sqlPromise = initSqlJs({
            locateFile: file => `/dist/dist/${file}`
        });
        const dataPromise = fetch("/orders.db").then(res => res.arrayBuffer());
        const [SQL, buf] = yield Promise.all([sqlPromise, dataPromise]);
        const dbConnection = new SQL.Database(new Uint8Array(buf));
        yield SqlWorker(buf, "SELECT code, EnName, ArName FROM Content", dataFor.content);
        yield SqlWorker(buf, "SELECT * FROM Clients", dataFor.client);
        yield SqlWorker(buf, "SELECT * FROM Items", dataFor.item);
        createOrderTable();
        createSettingsPart();
        var float = document.querySelector('.float');
        ;
        const opener = document.getElementById('openFloat');
        opener.addEventListener('click', () => {
            float.style.display = 'grid';
            displayNameRows(clients);
            displayTypeRows(types);
        });
    });
};
