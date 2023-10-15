//import { INames, IItems, IClientOrder, IOrderItem, StoredData } from "./interfaces";

interface INames{
    Id : number,
    EName : string,
    AName : string,
}

interface IItems extends INames{
    Price : number,
}

interface IClientOrder{
    ClientId: Number,
    Order : IOrderItem []
}

interface IOrderItem{
    ItemId: number,
    Quantity: number
}

enum language {
    en = 'en',
    ar = 'ar'
}

enum settingType {
    client = 'N',
    item = 'T'
}

interface StoredData{
    content : INames[],
    clients : INames[],
    totalOrder : number,
    cheque : number,
    types : IItems[],
    orders : IClientOrder[],
    totalOrderItems : IOrderItem[],
    lang : language
}



// System Language
let content : INames[] = [
    {
        Id : 1,
        EName : 'Add New Order',
        AName : 'أضف طلب جديد'
    },
    {
        Id : 2,
        EName : 'Name',
        AName : 'الاسم'
    },
    {
        Id : 3,
        EName : 'Order',
        AName : 'الطلب'
    },
    {
        Id : 4,
        EName : 'Add',
        AName : 'أضف'
    },
    {
        Id : 5,
        EName : 'Remove',
        AName : 'حذف'
    },
    {
        Id : 6,
        EName : 'Cancel',
        AName : 'الغاء'
    },
    {
        Id : 7,
        EName : 'Total Order', 
        AName : 'الطلب الكلى'
    },
    {
        Id : 8,
        EName : 'EP',
        AName : 'ج'
    },
    {
        Id : 9,
        EName : 'ع', 
        AName : 'E'
    },
    {
        Id : 10,
        EName : 'Client Total',
        AName : 'اجمالى العميل'
    },
    {
        Id : 11,
        EName :'En Name', 
        AName : 'الاسم بالانجليزية'
    },
    {
        Id : 12,
        EName : 'Ar Name', 
        AName : 'الاسم بالعربية'
    },
    {
        Id : 13,
        EName : 'Price', 
        AName : 'السعر'
    },
    {
        Id : 14,
        EName : 'Add New Type', 
        AName : 'اضافة صنف جديد'
    },
    {
        Id : 15,
        EName : 'Add New Name', 
        AName : 'اضافة اسم جديد'
    },
    {
        Id : 16,
        EName : 'Submit', 
        AName : 'إرسال'
    },
    {
        Id : 17,
        EName : 'Names', 
        AName : 'الأسماء'
    },
    {
        Id : 18,
        EName : 'Types',
        AName : 'الأصناف'
    }
]

// clients names
let clients : INames[] = [
    {
        Id : 1,
        EName : 'Ahmed',
        AName : 'احمد'
    },
    {
        Id : 2,
        EName : 'Islam Ibrahim',
        AName : 'اسلام ابراهيم'
    },
    {
        Id : 3,
        EName : 'Islam Anwer', 
        AName : 'اسلام أنور'
    },
    {
        Id : 4,
        EName : 'Sameh', 
        AName : 'سامح'
    },
    {
        Id : 5,
        EName : 'Mohamed Ashraf', 
        AName : 'محمد أشرف'
    },
    {
        Id : 6,
        EName : 'Mohamed Abdallah', 
        AName : 'محمد عبد الله'
    },
    {
        Id : 7,
        EName : 'Ahmed Adel', 
        AName : 'أحمد عادل'
    },
    {
        Id : 8,
        EName : 'Raafat',
        AName : 'رأفت'
    },
    {
        Id : 9,
        EName : 'Abdelrhman', 
        AName : 'عبدالرحمن'
    }
]
let nextClientId = 10;

// Item List
let types : IItems[] = [
    { Id : 1, EName: 'Fool', AName: 'فول', Price: 3 },
    { Id : 2, EName: 'Ta3mia', AName: 'طعمية', Price: 3.5 },
    { Id : 3, EName: 'Potatoes', AName: 'بطاطس', Price: 4 },
    { Id : 4, EName: 'Chease', AName: 'جبنة', Price: 4 },
    { Id : 5, EName: 'Egg', AName: 'بيض', Price: 4 },
    { Id : 6, EName: 'Papa', AName: 'بابا', Price: 4 },
    { Id : 7, EName: 'FoolWTa3mia', AName: 'فول بالطعمية', Price: 3.5 },
    { Id : 8, EName: 'FoolWEgg', AName: 'فول بالبيض', Price: 4 },
    { Id : 9, EName: 'Ta3miaWEgg', AName: 'طعمية بالبيض', Price: 4 }
]
let nextTypetId = 10;

let totalOrder : number = 0;
let cheque : number = 0;

let orders : IClientOrder[] = [];

let totalOrderItems : IOrderItem[] = [];

let lang : language = language.en;


// add option to select element
function setOptionsArr(element : HTMLSelectElement, content : INames[]) : void {
    content.forEach(names => {
        const tag : HTMLOptionElement = document.createElement('option') as HTMLOptionElement;
        tag.value = names.Id.toString();
        if (lang == language.en) {
            tag.innerHTML = names.EName;
            } else {
                tag.innerHTML = names.AName;
            }
        element.appendChild(tag);
    });
}

// add new order row for new client
function addOrderRow() {
    let fristTag : HTMLTableRowElement = document.createElement('tr');
    let i : number;
    if (lang == language.en) {
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
    var secondTag : HTMLTableRowElement = document.createElement('tr');
    secondTag.innerHTML = `
    <tr>
        <td class="totalclient">
        <input onchange="paied()" type="checkbox" name="paied"><span>${(i) ? content[9].AName : content[9].EName}: </span>
            <span class="totalclientVal">0</span> 
            <span>${language.ar ? content[7].AName : content[7].EName}</span>
        </td>
    </tr>
    `;
    const rowsWarpper : HTMLTableSectionElement = document.getElementById('rows') as HTMLTableSectionElement;
    rowsWarpper.appendChild(fristTag);
    setOptionsArr(fristTag.querySelector("#clientName") as HTMLSelectElement, clients);
    setOptionsArr(fristTag.querySelector("#typeOptions") as HTMLSelectElement, types);
    rowsWarpper.appendChild(secondTag);
}

// add new item to order
function addTypeCol(param : number, element? : HTMLTableCellElement) {
    let tag = document.createElement('div');
    tag.className = 'typesWarp';
    tag.innerHTML = `
        <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">
        </select>
        <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + 'px';CalculateTotals();" name="count" id="count" min="0">
    `;
    if(param == 2 && typeof element !== 'undefined')
        element.appendChild(tag);
    else
        (window?.event?.currentTarget as HTMLElement).parentElement?.parentElement?.querySelector('#types')?.appendChild(tag);
    setOptionsArr(tag.querySelector("#typeOptions") as HTMLSelectElement, types);
}

// Calculate the total order
function calculateTotalOrderItems() {
    totalOrderItems = [];
    orders.forEach(ClientOrder => {
        ClientOrder.Order.forEach(orderItem => {
            if (totalOrderItems.filter(totOI => totOI.ItemId == orderItem.ItemId).length === 0 ) {
                totalOrderItems.push(orderItem);
            } else {
                const index = totalOrderItems.map(totOI => totOI.ItemId).indexOf(orderItem.ItemId);
                totalOrderItems[index].Quantity += orderItem.Quantity;
            }
        });
    });
    let itemsHolder = document.querySelector('#totalOrderItems') as HTMLTableRowElement;
    let itemsContainer = ``;
    totalOrderItems.forEach( orderItem => {
        itemsContainer += ` <span class ="orderItem"> ${lang == language.ar? types.filter(t => t.Id == orderItem.ItemId)[0].AName : types.filter(t => t.Id == orderItem.ItemId)[0].EName} ${orderItem.Quantity} </span>`;
    });
    itemsHolder.innerHTML = itemsContainer;
}

// Calculate each Order
function CalculateTotals() {
    orders = [];

    const collect = document.querySelectorAll('td#types') ;

    totalOrder = 0;

    collect.forEach(row => {

        let totalClient = 0;

        const clientOrderRow = row.querySelectorAll('select.typeOptions') as NodeListOf<HTMLSelectElement>;  
        
        let clientOrder : IClientOrder = {} as IClientOrder;

        let clientName = clientOrderRow[0]?.parentElement?.parentElement?.parentElement?.querySelector('#clientName') as HTMLSelectElement; 

        if(clientName === undefined){
            cancelOrder();
            return;
        }
            
        clientOrder.ClientId = parseInt(clientName.value);
        clientOrder.Order = [];

        clientOrderRow.forEach(t => {

            const orderQuantity = Number.isNaN(parseInt((t.nextElementSibling as HTMLInputElement).value)) ? 0 : parseInt((t.nextElementSibling as HTMLInputElement).value);

            totalClient += ( types.filter(type => type.Id == parseInt(t.value))[0].Price * orderQuantity );

            let OrderItem :  IOrderItem = {ItemId : parseInt(t.value), Quantity : orderQuantity };

            clientOrder.Order.push(OrderItem);
        });

        orders.push(clientOrder);

        totalOrder += totalClient;
        if (totalClient > 0) {
            (row?.parentElement?.nextElementSibling?.querySelector('span.totalclientVal') as HTMLSpanElement).innerHTML = `
                ${totalClient} + 1 = <span class='totToPay'>${totalClient + 1}</span>
            `;
        } else {
            (row?.parentElement?.nextElementSibling?.querySelector('span.totalclientVal') as HTMLSpanElement).innerHTML = totalClient.toString();
        }
    });

    cheque = totalOrder + orders.length; // Total Order +  1$ Delivary fees for each order

    if (totalOrder > 0) {
        (document.querySelector('#totalPriceVal') as HTMLSpanElement).innerHTML = totalOrder + ' + ' + (orders.length) + ' = ' + cheque;
    }
    calculateTotalOrderItems();
}

// Remove Item From Client Order
function removeTypeCol() {
    var types = (window?.event?.currentTarget as HTMLElement).parentElement?.parentElement?.querySelector('#types');
    types?.removeChild(types.lastElementChild as HTMLElement);
    CalculateTotals();
}

// Cancel Client Order
function cancelOrder() {
    var row = (window?.event?.currentTarget as HTMLElement).parentElement?.parentElement;
    if(row)
    {
        row.nextElementSibling?.remove();
        row.remove();
    }
    CalculateTotals();
}

// dispay clients on settings
function displayNameRows(array : INames[]) {
    const rowsWarpper = document.getElementById('nameRows') as HTMLTableSectionElement;
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
function displayTypeRows(array : IItems[]) {
    const rowsWarpper = document.getElementById('typeRows') as HTMLTableSectionElement ;
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
function removeSettingRow(array: IItems[], rows: string, dis: settingType) {
    const row = (window?.event?.currentTarget as HTMLElement).parentElement?.parentElement  as HTMLTableRowElement;
    if ((row.firstElementChild as HTMLTableCellElement).innerText != '*') {
        let thisArray = array;
        thisArray.splice(parseInt((row.firstElementChild as HTMLTableCellElement).innerText) - 1, 1);
        (document.getElementById(rows) as HTMLTableSectionElement).innerHTML = '';
        if (dis == settingType.client) {
            displayNameRows(thisArray);
        } else if (dis == settingType.item) {
            displayTypeRows(thisArray);
        }
    } else {
        row.remove();
    }
}

// add new row in setting (Name or Items)
function addSettingRow(dis : settingType) {
    let rowsWarpper! : HTMLTableSectionElement;
    let tag! : HTMLTableRowElement
    if (dis == settingType.client) {
        rowsWarpper = document.getElementById('nameRows') as HTMLTableSectionElement;
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
    } else if (dis == settingType.item) {
        rowsWarpper = document.getElementById('typeRows') as HTMLTableSectionElement;
        tag = document.createElement('tr');
        tag.innerHTML =  `
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
function changeDirection(element : HTMLElement) {
    if (lang == language.ar) {
        element.style.direction = 'rtl';
    } else {
        element.style.direction = 'ltr';
    }
}

// Create new order table
function createOrderTable() {
    const orders = document.querySelector('.orders') as HTMLDivElement ;
    let i;
    if (lang == language.en) {
        i = 0;
    } else {
        i = 1;
    }
    orders.innerHTML = `
    <div class="addOrderwarpper">
    <button class="addOrder" id="addOrder" onclick="addOrderRow();" type="button">${language.ar ? content[0].AName : content[0].EName}</button>
    <button id="changeLang" onclick="changeLang();" type="button">${language.ar ? content[8].AName : content[8].EName}</button>
    <button id="openFloat">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    </button>
    </div>
    <table>
    <thead>

        <tr>
        <th style="max-width: 20%;width: 15%;">${language.ar ? content[1].AName : content[1].EName}</th>
        <th>${language.ar ? content[2].AName : content[2].EName}</th>
        <th>${language.ar ? content[3].AName : content[3].EName}</th>
        <th>${language.ar ? content[4].AName : content[4].EName}</th>
        <th>${language.ar ? content[5].AName : content[5].EName}</th>
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
            <span>${language.ar ? content[6].AName : content[6].EName} : </span>
            <span id="totalPriceVal">0</span> <span id="totalPriceVal">${language.ar ? content[7].AName : content[7].EName}</span>
        </td>
        </tr>
    </tfoot>
    </table>
    `
    changeDirection(orders);

}

// Create Setting Section
function createSettingsPart() {
    const float = document.querySelector('.float') as HTMLElement ;
    float.innerHTML = ``;
    float.innerHTML = `
    <div class="pages">
        <button class="pagesBtn active" id="namePage">${language.ar ? content[16].AName : content[16].EName}</button>
        <button class="pagesBtn" id="typePage">${language.ar ? content[17].AName : content[17].EName}</button>
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
                ${language.ar ? content[14].AName : content[14].EName}
                </button>
                <button
                class="sumbitNames"
                id="sumbitNames"
                onclick=" submitSettings('N')"
                type="button"
                >
                ${language.ar ? content[15].AName : content[15].EName}
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>${language.ar ? content[10].AName : content[10].EName}</th>
                    <th>${language.ar ? content[11].AName : content[11].EName}</th>
                    <th>${language.ar ? content[4].AName : content[4].EName}</th>
                </tr>
                </thead>
                <tbody id="nameRows"></tbody>
            </table>
        </div>
        <div class="types">
            <div class="addOrderwarpper">
                <button class="addOrder" id="addType" onclick="addSettingRow('T')" type="button">
                ${language.ar ? content[13].AName : content[13].EName}
                </button>
                <button
                class="sumbitNames"
                id="sumbittypes"
                onclick="submitSettings('T')"
                type="button"
                >
                ${language.ar ? content[15].AName : content[15].EName}
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>${language.ar ? content[10].AName : content[10].EName}</th>
                    <th>${language.ar ? content[11].AName : content[11].EName}</th>
                    <th>${language.ar ? content[12].AName : content[12].EName}</th>
                    <th>${language.ar ? content[4].AName : content[4].EName}</th>
                </tr>
                </thead>
                <tbody id="typeRows"></tbody>
            </table>
        </div>
    </div>
    `;
    changeDirection(float);
    const closer = document.getElementById('closeFloat') as HTMLElement;
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
    const typePage = document.querySelector('.pages #typePage') as HTMLElement;
    typePage.addEventListener('click', () => {
        (document.querySelector('.settings .names') as HTMLElement ).style.display = 'none';
        (document.querySelector('.settings .types') as HTMLElement ).style.display = 'flex';
    });
    const namePage = document.querySelector('.pages #namePage') as HTMLElement;
    namePage.addEventListener('click', () => {
        (document.querySelector('.settings .names') as HTMLElement ).style.display = 'flex';
        (document.querySelector('.settings .types') as HTMLElement ).style.display = 'none';
    });
}

// Change app language 
function changeLang() {
    if (lang == language.ar) {
        lang = language.en;
    } else {
        lang = language.ar;
    }
    const orders = document.querySelector('.orders') as HTMLDivElement ;
    changeDirection(orders);
    createSettingsPart();
    
    const clientSelectors = document.querySelectorAll('.clientName') as NodeListOf<HTMLSelectElement>;
    clientSelectors.forEach(clientSelector => {
        const val = clientSelector.value;
        clientSelector.innerHTML = '';
        setOptionsArr(clientSelector, clients);
        clientSelector.value = val;
    });

    const typeSelectors = document.querySelectorAll('.typeOptions') as NodeListOf<HTMLSelectElement>;
    typeSelectors.forEach(typeSelector => {
        const val = typeSelector.value;
        typeSelector.innerHTML = '';
        setOptionsArr(typeSelector, types);
        typeSelector.value = val;
    });

    (orders.querySelector('#addOrder') as HTMLButtonElement).innerHTML = language.ar ? content[0].AName : content[0].EName;
    (orders.querySelector('#changeLang') as HTMLButtonElement).innerHTML = language.ar ? content[8].AName : content[8].EName;
    orders.querySelectorAll('th').forEach((element, index) => {
        element.innerHTML = language.ar ? content[index + 1].AName : content[index + 1].EName;
    });
    orders.querySelectorAll('.totalclient').forEach((element) => {
        (element.querySelector('input + span') as HTMLElement).innerHTML = language.ar ? content[9].AName : content[9].EName; + ' : ';
        (element.lastElementChild as HTMLElement).innerHTML = language.ar ? content[7].AName : content[7].EName;
    });
    ((orders.querySelector('.totalPrice') as HTMLElement).firstElementChild as HTMLElement).innerHTML = language.ar ? content[6].AName : content[6].EName; + ' : ';
    ((orders.querySelector('.totalPrice') as HTMLElement).lastElementChild as HTMLElement).innerHTML = language.ar ? content[7].AName : content[7].EName;

    CalculateTotals();
}

function paied() {
    const currentTarget = window?.event?.currentTarget as HTMLInputElement;
    const val = currentTarget.parentElement?.querySelector('.totToPay') as HTMLSpanElement ;
    if (currentTarget.checked && val !== null) {
        (currentTarget.parentElement as HTMLElement ).style.textDecoration = 'line-through';
        cheque -= parseFloat(val.innerHTML);
        totalOrder
    } else if (val !== null) {
        (currentTarget.parentElement as HTMLElement ).style.textDecoration = 'none';
        cheque += parseFloat(val.innerHTML);
    }
}

function submitSettings(dis : settingType) {
    if (dis == settingType.client) {
        const rows = document.querySelectorAll('.settings #nameRows tr');
        clients = [];
        
        rows.forEach(row => {
            let client : INames = {
                Id : 0,
                EName : '',
                AName : ''
            };
            client.Id = parseInt((row.querySelector('input[name="id"]') as HTMLInputElement ).value);
            client.AName = (row.querySelector('td input[name="arName"]') as HTMLInputElement ).value;
            client.EName = (row.querySelector('td input[name="enName"]') as HTMLInputElement ).value
            clients.push(client);
        });
        const clientSelectors = document.querySelectorAll('.clientName') as NodeListOf<HTMLSelectElement>;
        clientSelectors.forEach(clientSelector => {
            const val = clientSelector.value;
            clientSelector.innerHTML = '';
            setOptionsArr(clientSelector, clients);
            clientSelector.value = val;
        });
    } else if (dis == settingType.item) {
        const rows = document.querySelectorAll('.settings #typeRows tr') as NodeListOf<HTMLTableRowElement>;
        types = [];
        
        rows.forEach(row => {
            let type : IItems = {
                Id : 0,
                EName : '',
                AName : '',
                Price : 0
            }
            type.Id = parseInt((row.querySelector('input[name="id"]') as HTMLInputElement ).value);
            type.AName = (row.querySelector('td input[name="arName"]') as HTMLInputElement ).value;
            type.EName = (row.querySelector('td input[name="enName"]') as HTMLInputElement ).value;
            type.Price = parseInt((row.querySelector('td input[name="price"]') as HTMLInputElement ).value);
            types.push(type);
        });
        const typeSelectors = document.querySelectorAll('.typeOptions') as NodeListOf<HTMLSelectElement>;
        typeSelectors.forEach(typeSelector => {
            const val = typeSelector.value;
            typeSelector.innerHTML = '';
            setOptionsArr(typeSelector, types);
            typeSelector.value = val;
        });
    }
    alert('Setting Saved');
}

function addStoredOrderRow(this : void, orders : IClientOrder[]) {
    const rowsWarpper = document.getElementById('rows') as HTMLTableSectionElement;
    orders.forEach(order => {
        addOrderRow();
        let thisRow = (rowsWarpper.lastElementChild as HTMLOptionElement ).previousElementSibling as HTMLTableRowElement;
        (thisRow.querySelector('#clientName') as HTMLSelectElement ).value = order.ClientId.toString();
        let types = thisRow.querySelector('#types') as HTMLTableCellElement;
        order.Order.forEach((ele, index) => {
                    if (index > 1) {
                        addTypeCol(2, types);
                    }
                    ((types.lastElementChild as HTMLDivElement).firstElementChild as HTMLSelectElement).value = ele.ItemId.toString();
                    ((types.lastElementChild as HTMLDivElement).lastElementChild as HTMLInputElement).value = ele.Quantity.toString();
        });
    });
    
}

function displayStored(this : void) {
    addStoredOrderRow(orders);
    CalculateTotals();
}

window.onunload = () =>{
    let myData! : StoredData;
    myData.content = content;
    myData.clients = clients;
    myData.totalOrder = totalOrder;
    myData.cheque = cheque;
    myData.types = types;
    myData.orders = orders;
    myData.totalOrderItems = totalOrderItems;
    myData.lang = lang;
    window.localStorage.setItem('appData', JSON.stringify(myData));
    JSON.parse(window.localStorage.getItem('appData') as string);
}


window.onload = function WindowLoad(event) {
    let myData = JSON.parse(window.localStorage.getItem('appData') as string);
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
        createSettingsPart()
        displayStored();
    }else{
        createOrderTable();
        createSettingsPart()
        addOrderRow();
    }

    var float = document.querySelector('.float') as HTMLElement;;

    const opener = document.getElementById('openFloat') as HTMLElement;
    opener.addEventListener('click', () => {
        float.style.display = 'grid';
        displayNameRows(clients);
        displayTypeRows(types);
    });
    
    
}