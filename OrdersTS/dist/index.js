"use strict";
//import { INames, IItems, IClientOrder, IOrderItem, StoredData } from "./interfaces";
var language;
(function (language) {
    language["en"] = "en";
    language["ar"] = "ar";
})(language || (language = {}));
var settingType;
(function (settingType) {
    settingType["client"] = "N";
    settingType["item"] = "T";
})(settingType || (settingType = {}));
// System Language
var content = [
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
var clients = [
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
var nextClientId = 10;
// Item List
var types = [
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
var nextTypetId = 10;
var totalOrder = 0;
var cheque = 0;
var orders = [];
var totalOrderItems = [];
var lang = language.en;
// add option to select element
function setOptionsArr(element, content) {
    content.forEach(function (names) {
        var tag = document.createElement('option');
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
    var fristTag = document.createElement('tr');
    var i;
    if (lang == language.en) {
        i = 0;
    }
    else {
        i = 1;
    }
    fristTag.innerHTML = "\n    <td rowspan=\"2\" class=\"name\">\n        <select class=\"clientName\" name=\"clientName\" id=\"clientName\">\n        </select>\n    </td>\n\n    <td id=\"types\">\n        <div class = \"typesWarp\">\n            <select onchange=\"CalculateTotals();\" class=\"typeOptions\" name=\"typeOptions\" id=\"typeOptions\">\n            </select>\n            <input type=\"number\" step=\"1\" onchange=\"this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();\" name=\"count\" id=\"count\" min=\"0\">\n        </div>\n    </td>\n\n    <td rowspan=\"2\" class=\"add\">\n        <button class=\"addType\" onclick=\"addTypeCol();\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z\" clip-rule=\"evenodd\"></path></svg>\n        </button>\n    </td>\n\n    <td rowspan=\"2\" class=\"remove\">\n        <button class=\"removeType\" onclick=\"removeTypeCol()\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z\" clip-rule=\"evenodd\"></path></svg>\n        </button>\n    </td>\n\n    <td rowspan=\"2\" class=\"cancel\">\n        <button class=\"cancelOrder\" onclick=\"cancelOrder()\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z\" clip-rule=\"evenodd\"></path></svg>\n        </button>\n    </td>\n    ";
    var secondTag = document.createElement('tr');
    secondTag.innerHTML = "\n    <tr>\n        <td class=\"totalclient\">\n        <input onchange=\"paied()\" type=\"checkbox\" name=\"paied\"><span>".concat((i) ? content[9].AName : content[9].EName, ": </span>\n            <span class=\"totalclientVal\">0</span> \n            <span>").concat(language.ar ? content[7].AName : content[7].EName, "</span>\n        </td>\n    </tr>\n    ");
    var rowsWarpper = document.getElementById('rows');
    rowsWarpper.appendChild(fristTag);
    setOptionsArr(fristTag.querySelector("#clientName"), clients);
    setOptionsArr(fristTag.querySelector("#typeOptions"), types);
    rowsWarpper.appendChild(secondTag);
}
// add new item to order
function addTypeCol(param, element) {
    var _a, _b, _c, _d;
    var tag = document.createElement('div');
    tag.className = 'typesWarp';
    tag.innerHTML = "\n        <select onchange=\"CalculateTotals();\" class=\"typeOptions\" name=\"typeOptions\" id=\"typeOptions\">\n        </select>\n        <input type=\"number\" step=\"1\" onchange=\"this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();\" name=\"count\" id=\"count\" min=\"0\">\n    ";
    if (param == 2 && typeof element !== 'undefined')
        element.appendChild(tag);
    else
        (_d = (_c = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('#types')) === null || _d === void 0 ? void 0 : _d.appendChild(tag);
    setOptionsArr(tag.querySelector("#typeOptions"), types);
}
// Calculate the total order
function calculateTotalOrderItems() {
    totalOrderItems = [];
    orders.forEach(function (ClientOrder) {
        ClientOrder.Order.forEach(function (orderItem) {
            if (totalOrderItems.filter(function (totOI) { return totOI.ItemId == orderItem.ItemId; }).length === 0) {
                totalOrderItems.push(orderItem);
            }
            else {
                var index = totalOrderItems.map(function (totOI) { return totOI.ItemId; }).indexOf(orderItem.ItemId);
                totalOrderItems[index].Quantity += orderItem.Quantity;
            }
        });
    });
    var itemsHolder = document.querySelector('#totalOrderItems');
    var itemsContainer = "";
    totalOrderItems.forEach(function (orderItem) {
        itemsContainer += " <span class =\"orderItem\"> ".concat(lang == language.ar ? types.filter(function (t) { return t.Id == orderItem.ItemId; })[0].AName : types.filter(function (t) { return t.Id == orderItem.ItemId; })[0].EName, " ").concat(orderItem.Quantity, " </span>");
    });
    itemsHolder.innerHTML = itemsContainer;
}
// Calculate each Order
function CalculateTotals() {
    orders = [];
    var collect = document.querySelectorAll('td#types');
    totalOrder = 0;
    collect.forEach(function (row) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var totalClient = 0;
        var clientOrderRow = row.querySelectorAll('select.typeOptions');
        var clientOrder = {};
        var clientName = (_d = (_c = (_b = (_a = clientOrderRow[0]) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.querySelector('#clientName');
        if (clientName === undefined) {
            cancelOrder();
            return;
        }
        clientOrder.ClientId = parseInt(clientName.value);
        clientOrder.Order = [];
        clientOrderRow.forEach(function (t) {
            var orderQuantity = Number.isNaN(parseInt(t.nextElementSibling.value)) ? 0 : parseInt(t.nextElementSibling.value);
            totalClient += (types.filter(function (type) { return type.Id == parseInt(t.value); })[0].Price * orderQuantity);
            var OrderItem = { ItemId: parseInt(t.value), Quantity: orderQuantity };
            clientOrder.Order.push(OrderItem);
        });
        orders.push(clientOrder);
        totalOrder += totalClient;
        if (totalClient > 0) {
            ((_f = (_e = row === null || row === void 0 ? void 0 : row.parentElement) === null || _e === void 0 ? void 0 : _e.nextElementSibling) === null || _f === void 0 ? void 0 : _f.querySelector('span.totalclientVal')).innerHTML = "\n                ".concat(totalClient, " + 1 = <span class='totToPay'>").concat(totalClient + 1, "</span>\n            ");
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
    var rowsWarpper = document.getElementById('nameRows');
    rowsWarpper.innerHTML = '';
    array.forEach(function (client, index) {
        var tag = document.createElement('tr');
        tag.innerHTML = "\n        <td>".concat(index + 1, "</td>\n        <input type=\"number\" hidden name=\"id\" value=\"").concat(client.Id, "\">\n        <td>\n            <input type=\"text\" name=\"enName\" value=\"").concat(client.EName, "\">\n        </td>\n        <td>\n            <input type=\"text\" name=\"arName\" value=\"").concat(client.AName, "\">\n        </td>\n        <td class=\"remove\">\n            <button class=\"removeType\" onclick=\"removeSettingRow(clients, 'nameRows', 'N')\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z\" clip-rule=\"evenodd\"></path></svg>\n            </button>\n        </td>");
        rowsWarpper.appendChild(tag);
    });
}
// dispay Items on settings
function displayTypeRows(array) {
    var rowsWarpper = document.getElementById('typeRows');
    rowsWarpper.innerHTML = '';
    array.forEach(function (type, index) {
        var tag = document.createElement('tr');
        tag.innerHTML = "\n        <td>".concat(index + 1, "</td>\n        <input type=\"number\" hidden name=\"id\" value=\"").concat(type.Id, "\">\n        <td>\n            <input type=\"text\" name=\"enName\"  value=\"").concat(type.EName, "\">\n        </td>\n        <td>\n            <input type=\"text\" name=\"arName\" value=\"").concat(type.AName, "\">\n        </td>\n        <td>\n            <input type=\"number\" name=\"price\" value=\"").concat(type.Price, "\">\n        </td>\n        <td class=\"remove\">\n            <button class=\"removeType\" onclick=\"removeSettingRow(types, 'typeRows', 'T')\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z\" clip-rule=\"evenodd\"></path></svg>\n            </button>\n        </td>");
        rowsWarpper.appendChild(tag);
    });
}
// Remove new row in setting (Name or Items)
function removeSettingRow(array, rows, dis) {
    var _a, _b;
    var row = (_b = ((_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget).parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
    if (row.firstElementChild.innerText != '*') {
        var thisArray = array;
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
    var rowsWarpper;
    var tag;
    if (dis == settingType.client) {
        rowsWarpper = document.getElementById('nameRows');
        tag = document.createElement('tr');
        tag.innerHTML = "\n        <td>".concat(clients.length + 1, "</td>\n        <input type=\"number\" hidden name=\"id\" value=\"").concat(nextClientId, "\">\n\n        <td>\n            <input type=\"text\" name=\"enName\">\n        </td>\n        <td>\n            <input type=\"text\" name=\"arName\">\n        </td>\n        <td class=\"remove\">\n            <button class=\"removeType\" onclick=\"removeSettingRow(clients, 'nameRows', 'N')\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z\" clip-rule=\"evenodd\"></path></svg>\n            </button>\n        </td>");
        nextClientId++;
    }
    else if (dis == settingType.item) {
        rowsWarpper = document.getElementById('typeRows');
        tag = document.createElement('tr');
        tag.innerHTML = "\n        <td>".concat(types.length + 1, "</td>\n        <input type=\"number\" hidden name=\"id\" value=\"").concat(nextTypetId, "\">\n        <td>\n            <input type=\"text\" name=\"enName\">\n        </td>\n        <td>\n            <input type=\"text\" name=\"arName\">\n        </td>\n        <td>\n            <input type=\"number\" name=\"price\">\n        </td>\n        <td class=\"remove\">\n            <button class=\"removeType\" onclick=\"removeSettingRow(types, 'typeRows', 'T')\">\n            <svg fill=\"currentColor\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" d=\"M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z\" clip-rule=\"evenodd\"></path></svg>\n            </button>\n        </td>");
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
    var orders = document.querySelector('.orders');
    var i;
    if (lang == language.en) {
        i = 0;
    }
    else {
        i = 1;
    }
    orders.innerHTML = "\n    <div class=\"addOrderwarpper\">\n    <button class=\"addOrder\" id=\"addOrder\" onclick=\"addOrderRow();\" type=\"button\">".concat(language.ar ? content[0].AName : content[0].EName, "</button>\n    <button id=\"changeLang\" onclick=\"changeLang();\" type=\"button\">").concat(language.ar ? content[8].AName : content[8].EName, "</button>\n    <button id=\"openFloat\">\n    <svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\"></path><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\"></path></svg>\n    </button>\n    </div>\n    <table>\n    <thead>\n\n        <tr>\n        <th style=\"max-width: 20%;width: 15%;\">").concat(language.ar ? content[1].AName : content[1].EName, "</th>\n        <th>").concat(language.ar ? content[2].AName : content[2].EName, "</th>\n        <th>").concat(language.ar ? content[3].AName : content[3].EName, "</th>\n        <th>").concat(language.ar ? content[4].AName : content[4].EName, "</th>\n        <th>").concat(language.ar ? content[5].AName : content[5].EName, "</th>\n        </tr>\n\n    </thead>\n    <tbody id=\"rows\">\n\n    </tbody>\n    <tfoot>\n        <tr>\n        <td colspan=\"5\" id=\"totalOrderItems\">\n            \n        </td>\n        </tr>\n        <tr>\n        <td colspan=\"5\" class=\"totalPrice\">\n            <span>").concat(language.ar ? content[6].AName : content[6].EName, " : </span>\n            <span id=\"totalPriceVal\">0</span> <span id=\"totalPriceVal\">").concat(language.ar ? content[7].AName : content[7].EName, "</span>\n        </td>\n        </tr>\n    </tfoot>\n    </table>\n    ");
    changeDirection(orders);
}
// Create Setting Section
function createSettingsPart() {
    var float = document.querySelector('.float');
    float.innerHTML = "";
    float.innerHTML = "\n    <div class=\"pages\">\n        <button class=\"pagesBtn active\" id=\"namePage\">".concat(language.ar ? content[16].AName : content[16].EName, "</button>\n        <button class=\"pagesBtn\" id=\"typePage\">").concat(language.ar ? content[17].AName : content[17].EName, "</button>\n        <button id=\"closeFloat\">\n            <svg\n                class=\"close\"\n                fill=\"none\"\n                stroke=\"currentColor\"\n                viewBox=\"0 0 24 24\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n            >\n                <path\n                stroke-linecap=\"round\"\n                stroke-linejoin=\"round\"\n                stroke-width=\"2\"\n                d=\"M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z\">\n                </path>\n            </svg>\n        </button>\n    </div>\n    <div class=\"settings\">\n        <div class=\"names\">\n            <div class=\"addOrderwarpper\">\n                <button\n                class=\"addOrder\"\n                id=\"addName\"\n                onclick=\"addSettingRow('N')\"\n                type=\"button\"\n                >\n                ").concat(language.ar ? content[14].AName : content[14].EName, "\n                </button>\n                <button\n                class=\"sumbitNames\"\n                id=\"sumbitNames\"\n                onclick=\" submitSettings('N')\"\n                type=\"button\"\n                >\n                ").concat(language.ar ? content[15].AName : content[15].EName, "\n                </button>\n            </div>\n            <table>\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>").concat(language.ar ? content[10].AName : content[10].EName, "</th>\n                    <th>").concat(language.ar ? content[11].AName : content[11].EName, "</th>\n                    <th>").concat(language.ar ? content[4].AName : content[4].EName, "</th>\n                </tr>\n                </thead>\n                <tbody id=\"nameRows\"></tbody>\n            </table>\n        </div>\n        <div class=\"types\">\n            <div class=\"addOrderwarpper\">\n                <button class=\"addOrder\" id=\"addType\" onclick=\"addSettingRow('T')\" type=\"button\">\n                ").concat(language.ar ? content[13].AName : content[13].EName, "\n                </button>\n                <button\n                class=\"sumbitNames\"\n                id=\"sumbittypes\"\n                onclick=\"submitSettings('T')\"\n                type=\"button\"\n                >\n                ").concat(language.ar ? content[15].AName : content[15].EName, "\n                </button>\n            </div>\n            <table>\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>").concat(language.ar ? content[10].AName : content[10].EName, "</th>\n                    <th>").concat(language.ar ? content[11].AName : content[11].EName, "</th>\n                    <th>").concat(language.ar ? content[12].AName : content[12].EName, "</th>\n                    <th>").concat(language.ar ? content[4].AName : content[4].EName, "</th>\n                </tr>\n                </thead>\n                <tbody id=\"typeRows\"></tbody>\n            </table>\n        </div>\n    </div>\n    ");
    changeDirection(float);
    var closer = document.getElementById('closeFloat');
    closer.addEventListener('click', function () {
        float.style.display = 'none';
    });
    var pageActive = 0;
    var pagesBtns = document.querySelectorAll('.pages .pagesBtn');
    pagesBtns.forEach(function (pagesBtn, index) {
        pagesBtn.addEventListener('click', function () {
            pagesBtns[pageActive].classList.remove("active");
            pagesBtn.classList.add("active");
            pageActive = index;
        });
    });
    var typePage = document.querySelector('.pages #typePage');
    typePage.addEventListener('click', function () {
        document.querySelector('.settings .names').style.display = 'none';
        document.querySelector('.settings .types').style.display = 'flex';
    });
    var namePage = document.querySelector('.pages #namePage');
    namePage.addEventListener('click', function () {
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
    var orders = document.querySelector('.orders');
    changeDirection(orders);
    createSettingsPart();
    var clientSelectors = document.querySelectorAll('.clientName');
    clientSelectors.forEach(function (clientSelector) {
        var val = clientSelector.value;
        clientSelector.innerHTML = '';
        setOptionsArr(clientSelector, clients);
        clientSelector.value = val;
    });
    var typeSelectors = document.querySelectorAll('.typeOptions');
    typeSelectors.forEach(function (typeSelector) {
        var val = typeSelector.value;
        typeSelector.innerHTML = '';
        setOptionsArr(typeSelector, types);
        typeSelector.value = val;
    });
    orders.querySelector('#addOrder').innerHTML = language.ar ? content[0].AName : content[0].EName;
    orders.querySelector('#changeLang').innerHTML = language.ar ? content[8].AName : content[8].EName;
    orders.querySelectorAll('th').forEach(function (element, index) {
        element.innerHTML = language.ar ? content[index + 1].AName : content[index + 1].EName;
    });
    orders.querySelectorAll('.totalclient').forEach(function (element) {
        element.querySelector('input + span').innerHTML = language.ar ? content[9].AName : content[9].EName;
        +' : ';
        element.lastElementChild.innerHTML = language.ar ? content[7].AName : content[7].EName;
    });
    orders.querySelector('.totalPrice').firstElementChild.innerHTML = language.ar ? content[6].AName : content[6].EName;
    +' : ';
    orders.querySelector('.totalPrice').lastElementChild.innerHTML = language.ar ? content[7].AName : content[7].EName;
    CalculateTotals();
}
function paied() {
    var _a, _b;
    var currentTarget = (_a = window === null || window === void 0 ? void 0 : window.event) === null || _a === void 0 ? void 0 : _a.currentTarget;
    var val = (_b = currentTarget.parentElement) === null || _b === void 0 ? void 0 : _b.querySelector('.totToPay');
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
        var rows = document.querySelectorAll('.settings #nameRows tr');
        clients = [];
        rows.forEach(function (row) {
            var client = {
                Id: 0,
                EName: '',
                AName: ''
            };
            client.Id = parseInt(row.querySelector('input[name="id"]').value);
            client.AName = row.querySelector('td input[name="arName"]').value;
            client.EName = row.querySelector('td input[name="enName"]').value;
            clients.push(client);
        });
        var clientSelectors = document.querySelectorAll('.clientName');
        clientSelectors.forEach(function (clientSelector) {
            var val = clientSelector.value;
            clientSelector.innerHTML = '';
            setOptionsArr(clientSelector, clients);
            clientSelector.value = val;
        });
    }
    else if (dis == settingType.item) {
        var rows = document.querySelectorAll('.settings #typeRows tr');
        types = [];
        rows.forEach(function (row) {
            var type = {
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
        var typeSelectors = document.querySelectorAll('.typeOptions');
        typeSelectors.forEach(function (typeSelector) {
            var val = typeSelector.value;
            typeSelector.innerHTML = '';
            setOptionsArr(typeSelector, types);
            typeSelector.value = val;
        });
    }
    alert('Setting Saved');
}
function addStoredOrderRow(orders) {
    var rowsWarpper = document.getElementById('rows');
    orders.forEach(function (order) {
        addOrderRow();
        var thisRow = rowsWarpper.lastElementChild.previousElementSibling;
        thisRow.querySelector('#clientName').value = order.ClientId.toString();
        var types = thisRow.querySelector('#types');
        order.Order.forEach(function (ele, index) {
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
window.onunload = function () {
    var myData;
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
window.onload = function WindowLoad(event) {
    var myData = JSON.parse(window.localStorage.getItem('appData'));
    if (myData != null) {
        content = myData.content;
        clients = myData.clients;
        totalOrder = myData.totalOrder;
        cheque = myData.cheque;
        types = myData.types;
        orders = myData.orders;
        totalOrderItems = myData.totalOrderItems;
        lang = myData.lang;
        createOrderTable();
        createSettingsPart();
        displayStored();
    }
    else {
        createOrderTable();
        createSettingsPart();
        addOrderRow();
    }
    var float = document.querySelector('.float');
    ;
    var opener = document.getElementById('openFloat');
    opener.addEventListener('click', function () {
        float.style.display = 'grid';
        displayNameRows(clients);
        displayTypeRows(types);
    });
};
