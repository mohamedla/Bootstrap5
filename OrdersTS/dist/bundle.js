(()=>{"use strict";var language,settingType;!function(language){language.en="en",language.ar="ar"}(language||(language={})),function(settingType){settingType.client="N",settingType.item="T"}(settingType||(settingType={}));var content=[{Id:1,EName:"Add New Order",AName:"أضف طلب جديد"},{Id:2,EName:"Name",AName:"الاسم"},{Id:3,EName:"Order",AName:"الطلب"},{Id:4,EName:"Add",AName:"أضف"},{Id:5,EName:"Remove",AName:"حذف"},{Id:6,EName:"Cancel",AName:"الغاء"},{Id:7,EName:"Total Order",AName:"الطلب الكلى"},{Id:8,EName:"EP",AName:"ج"},{Id:9,EName:"ع",AName:"E"},{Id:10,EName:"Client Total",AName:"اجمالى العميل"},{Id:11,EName:"En Name",AName:"الاسم بالانجليزية"},{Id:12,EName:"Ar Name",AName:"الاسم بالعربية"},{Id:13,EName:"Price",AName:"السعر"},{Id:14,EName:"Add New Type",AName:"اضافة صنف جديد"},{Id:15,EName:"Add New Name",AName:"اضافة اسم جديد"},{Id:16,EName:"Submit",AName:"إرسال"},{Id:17,EName:"Names",AName:"الأسماء"},{Id:18,EName:"Types",AName:"الأصناف"}],clients=[{Id:1,EName:"Ahmed",AName:"احمد"},{Id:2,EName:"Islam Ibrahim",AName:"اسلام ابراهيم"},{Id:3,EName:"Islam Anwer",AName:"اسلام أنور"},{Id:4,EName:"Sameh",AName:"سامح"},{Id:5,EName:"Mohamed Ashraf",AName:"محمد أشرف"},{Id:6,EName:"Mohamed Abdallah",AName:"محمد عبد الله"},{Id:7,EName:"Ahmed Adel",AName:"أحمد عادل"},{Id:8,EName:"Raafat",AName:"رأفت"},{Id:9,EName:"Abdelrhman",AName:"عبدالرحمن"}],types=[{Id:1,EName:"Fool",AName:"فول",Price:3},{Id:2,EName:"Ta3mia",AName:"طعمية",Price:3.5},{Id:3,EName:"Potatoes",AName:"بطاطس",Price:4},{Id:4,EName:"Chease",AName:"جبنة",Price:4},{Id:5,EName:"Egg",AName:"بيض",Price:4},{Id:6,EName:"Papa",AName:"بابا",Price:4},{Id:7,EName:"FoolWTa3mia",AName:"فول بالطعمية",Price:3.5},{Id:8,EName:"FoolWEgg",AName:"فول بالبيض",Price:4},{Id:9,EName:"Ta3miaWEgg",AName:"طعمية بالبيض",Price:4}],totalOrder=0,cheque=0,orders=[],totalOrderItems=[],lang=language.en;function setOptionsArr(element,content){content.forEach((function(names){var tag=document.createElement("option");tag.value=names.Id.toString(),lang==language.en?tag.innerHTML=names.EName:tag.innerHTML=names.AName,element.appendChild(tag)}))}function addOrderRow(){var i,fristTag=document.createElement("tr");i=lang==language.en?0:1,fristTag.innerHTML='\n    <td rowspan="2" class="name">\n        <select class="clientName" name="clientName" id="clientName">\n        </select>\n    </td>\n\n    <td id="types">\n        <div class = "typesWarp">\n            <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">\n            </select>\n            <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + \'px\';CalculateTotals();" name="count" id="count" min="0">\n        </div>\n    </td>\n\n    <td rowspan="2" class="add">\n        <button class="addType" onclick="addTypeCol();">\n            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path></svg>\n        </button>\n    </td>\n\n    <td rowspan="2" class="remove">\n        <button class="removeType" onclick="removeTypeCol()">\n            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>\n        </button>\n    </td>\n\n    <td rowspan="2" class="cancel">\n        <button class="cancelOrder" onclick="cancelOrder()">\n            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>\n        </button>\n    </td>\n    ';var secondTag=document.createElement("tr");secondTag.innerHTML='\n    <tr>\n        <td class="totalclient">\n        <input onchange="paied()" type="checkbox" name="paied"><span>'.concat(i?content[9].AName:content[9].EName,': </span>\n            <span class="totalclientVal">0</span> \n            <span>').concat(language.ar?content[7].AName:content[7].EName,"</span>\n        </td>\n    </tr>\n    ");var rowsWarpper=document.getElementById("rows");rowsWarpper.appendChild(fristTag),setOptionsArr(fristTag.querySelector("#clientName"),clients),setOptionsArr(fristTag.querySelector("#typeOptions"),types),rowsWarpper.appendChild(secondTag)}function addTypeCol(param,element){var _a,_b,_c,_d,tag=document.createElement("div");tag.className="typesWarp",tag.innerHTML='\n        <select onchange="CalculateTotals();" class="typeOptions" name="typeOptions" id="typeOptions">\n        </select>\n        <input type="number" step="1" onchange="this.value = Math.round(this.value);this.style.width = (((this.value.length + 1) * 8) + 25) + \'px\';CalculateTotals();" name="count" id="count" min="0">\n    ',2==param&&void 0!==element?element.appendChild(tag):null===(_d=null===(_c=null===(_b=(null===(_a=null===window||void 0===window?void 0:window.event)||void 0===_a?void 0:_a.currentTarget).parentElement)||void 0===_b?void 0:_b.parentElement)||void 0===_c?void 0:_c.querySelector("#types"))||void 0===_d||_d.appendChild(tag),setOptionsArr(tag.querySelector("#typeOptions"),types)}function CalculateTotals(){orders=[];var collect=document.querySelectorAll("td#types");totalOrder=0,collect.forEach((function(row){var _a,_b,_c,_d,_e,_f,_g,_h,totalClient=0,clientOrderRow=row.querySelectorAll("select.typeOptions"),clientOrder={},clientName=null===(_d=null===(_c=null===(_b=null===(_a=clientOrderRow[0])||void 0===_a?void 0:_a.parentElement)||void 0===_b?void 0:_b.parentElement)||void 0===_c?void 0:_c.parentElement)||void 0===_d?void 0:_d.querySelector("#clientName");void 0!==clientName?(clientOrder.ClientId=parseInt(clientName.value),clientOrder.Order=[],clientOrderRow.forEach((function(t){var orderQuantity=Number.isNaN(parseInt(t.nextElementSibling.value))?0:parseInt(t.nextElementSibling.value);totalClient+=types.filter((function(type){return type.Id==parseInt(t.value)}))[0].Price*orderQuantity;var OrderItem={ItemId:parseInt(t.value),Quantity:orderQuantity};clientOrder.Order.push(OrderItem)})),orders.push(clientOrder),totalOrder+=totalClient,totalClient>0?(null===(_f=null===(_e=null==row?void 0:row.parentElement)||void 0===_e?void 0:_e.nextElementSibling)||void 0===_f?void 0:_f.querySelector("span.totalclientVal")).innerHTML="\n                ".concat(totalClient," + 1 = <span class='totToPay'>").concat(totalClient+1,"</span>\n            "):(null===(_h=null===(_g=null==row?void 0:row.parentElement)||void 0===_g?void 0:_g.nextElementSibling)||void 0===_h?void 0:_h.querySelector("span.totalclientVal")).innerHTML=totalClient.toString()):function(){var _a,_b,_c,row=null===(_b=(null===(_a=null===window||void 0===window?void 0:window.event)||void 0===_a?void 0:_a.currentTarget).parentElement)||void 0===_b?void 0:_b.parentElement;row&&(null===(_c=row.nextElementSibling)||void 0===_c||_c.remove(),row.remove());CalculateTotals()}()})),cheque=totalOrder+orders.length,totalOrder>0&&(document.querySelector("#totalPriceVal").innerHTML=totalOrder+" + "+orders.length+" = "+cheque),function(){totalOrderItems=[],orders.forEach((function(ClientOrder){ClientOrder.Order.forEach((function(orderItem){if(0===totalOrderItems.filter((function(totOI){return totOI.ItemId==orderItem.ItemId})).length)totalOrderItems.push(orderItem);else{var index=totalOrderItems.map((function(totOI){return totOI.ItemId})).indexOf(orderItem.ItemId);totalOrderItems[index].Quantity+=orderItem.Quantity}}))}));var itemsHolder=document.querySelector("#totalOrderItems"),itemsContainer="";totalOrderItems.forEach((function(orderItem){itemsContainer+=' <span class ="orderItem"> '.concat(lang==language.ar?types.filter((function(t){return t.Id==orderItem.ItemId}))[0].AName:types.filter((function(t){return t.Id==orderItem.ItemId}))[0].EName," ").concat(orderItem.Quantity," </span>")})),itemsHolder.innerHTML=itemsContainer}()}function displayNameRows(array){var rowsWarpper=document.getElementById("nameRows");rowsWarpper.innerHTML="",array.forEach((function(client,index){var tag=document.createElement("tr");tag.innerHTML="\n        <td>".concat(index+1,'</td>\n        <input type="number" hidden name="id" value="').concat(client.Id,'">\n        <td>\n            <input type="text" name="enName" value="').concat(client.EName,'">\n        </td>\n        <td>\n            <input type="text" name="arName" value="').concat(client.AName,'">\n        </td>\n        <td class="remove">\n            <button class="removeType" onclick="removeSettingRow(clients, \'nameRows\', \'N\')">\n            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>\n            </button>\n        </td>'),rowsWarpper.appendChild(tag)}))}function displayTypeRows(array){var rowsWarpper=document.getElementById("typeRows");rowsWarpper.innerHTML="",array.forEach((function(type,index){var tag=document.createElement("tr");tag.innerHTML="\n        <td>".concat(index+1,'</td>\n        <input type="number" hidden name="id" value="').concat(type.Id,'">\n        <td>\n            <input type="text" name="enName"  value="').concat(type.EName,'">\n        </td>\n        <td>\n            <input type="text" name="arName" value="').concat(type.AName,'">\n        </td>\n        <td>\n            <input type="number" name="price" value="').concat(type.Price,'">\n        </td>\n        <td class="remove">\n            <button class="removeType" onclick="removeSettingRow(types, \'typeRows\', \'T\')">\n            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>\n            </button>\n        </td>'),rowsWarpper.appendChild(tag)}))}function changeDirection(element){lang==language.ar?element.style.direction="rtl":element.style.direction="ltr"}function createOrderTable(){var orders=document.querySelector(".orders");language.en,orders.innerHTML='\n    <div class="addOrderwarpper">\n    <button class="addOrder" id="addOrder" onclick="addOrderRow();" type="button">'.concat(language.ar?content[0].AName:content[0].EName,'</button>\n    <button id="changeLang" onclick="changeLang();" type="button">').concat(language.ar?content[8].AName:content[8].EName,'</button>\n    <button id="openFloat">\n    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>\n    </button>\n    </div>\n    <table>\n    <thead>\n\n        <tr>\n        <th style="max-width: 20%;width: 15%;">').concat(language.ar?content[1].AName:content[1].EName,"</th>\n        <th>").concat(language.ar?content[2].AName:content[2].EName,"</th>\n        <th>").concat(language.ar?content[3].AName:content[3].EName,"</th>\n        <th>").concat(language.ar?content[4].AName:content[4].EName,"</th>\n        <th>").concat(language.ar?content[5].AName:content[5].EName,'</th>\n        </tr>\n\n    </thead>\n    <tbody id="rows">\n\n    </tbody>\n    <tfoot>\n        <tr>\n        <td colspan="5" id="totalOrderItems">\n            \n        </td>\n        </tr>\n        <tr>\n        <td colspan="5" class="totalPrice">\n            <span>').concat(language.ar?content[6].AName:content[6].EName,' : </span>\n            <span id="totalPriceVal">0</span> <span id="totalPriceVal">').concat(language.ar?content[7].AName:content[7].EName,"</span>\n        </td>\n        </tr>\n    </tfoot>\n    </table>\n    "),changeDirection(orders)}function createSettingsPart(){var float=document.querySelector(".float");float.innerHTML="",float.innerHTML='\n    <div class="pages">\n        <button class="pagesBtn active" id="namePage">'.concat(language.ar?content[16].AName:content[16].EName,'</button>\n        <button class="pagesBtn" id="typePage">').concat(language.ar?content[17].AName:content[17].EName,'</button>\n        <button id="closeFloat">\n            <svg\n                class="close"\n                fill="none"\n                stroke="currentColor"\n                viewBox="0 0 24 24"\n                xmlns="http://www.w3.org/2000/svg"\n            >\n                <path\n                stroke-linecap="round"\n                stroke-linejoin="round"\n                stroke-width="2"\n                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">\n                </path>\n            </svg>\n        </button>\n    </div>\n    <div class="settings">\n        <div class="names">\n            <div class="addOrderwarpper">\n                <button\n                class="addOrder"\n                id="addName"\n                onclick="addSettingRow(\'N\')"\n                type="button"\n                >\n                ').concat(language.ar?content[14].AName:content[14].EName,'\n                </button>\n                <button\n                class="sumbitNames"\n                id="sumbitNames"\n                onclick=" submitSettings(\'N\')"\n                type="button"\n                >\n                ').concat(language.ar?content[15].AName:content[15].EName,"\n                </button>\n            </div>\n            <table>\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>").concat(language.ar?content[10].AName:content[10].EName,"</th>\n                    <th>").concat(language.ar?content[11].AName:content[11].EName,"</th>\n                    <th>").concat(language.ar?content[4].AName:content[4].EName,'</th>\n                </tr>\n                </thead>\n                <tbody id="nameRows"></tbody>\n            </table>\n        </div>\n        <div class="types">\n            <div class="addOrderwarpper">\n                <button class="addOrder" id="addType" onclick="addSettingRow(\'T\')" type="button">\n                ').concat(language.ar?content[13].AName:content[13].EName,'\n                </button>\n                <button\n                class="sumbitNames"\n                id="sumbittypes"\n                onclick="submitSettings(\'T\')"\n                type="button"\n                >\n                ').concat(language.ar?content[15].AName:content[15].EName,"\n                </button>\n            </div>\n            <table>\n                <thead>\n                <tr>\n                    <th>#</th>\n                    <th>").concat(language.ar?content[10].AName:content[10].EName,"</th>\n                    <th>").concat(language.ar?content[11].AName:content[11].EName,"</th>\n                    <th>").concat(language.ar?content[12].AName:content[12].EName,"</th>\n                    <th>").concat(language.ar?content[4].AName:content[4].EName,'</th>\n                </tr>\n                </thead>\n                <tbody id="typeRows"></tbody>\n            </table>\n        </div>\n    </div>\n    '),changeDirection(float),document.getElementById("closeFloat").addEventListener("click",(function(){float.style.display="none"}));var pageActive=0,pagesBtns=document.querySelectorAll(".pages .pagesBtn");pagesBtns.forEach((function(pagesBtn,index){pagesBtn.addEventListener("click",(function(){pagesBtns[pageActive].classList.remove("active"),pagesBtn.classList.add("active"),pageActive=index}))})),document.querySelector(".pages #typePage").addEventListener("click",(function(){document.querySelector(".settings .names").style.display="none",document.querySelector(".settings .types").style.display="flex"})),document.querySelector(".pages #namePage").addEventListener("click",(function(){document.querySelector(".settings .names").style.display="flex",document.querySelector(".settings .types").style.display="none"}))}function displayStored(){!function(orders){var rowsWarpper=document.getElementById("rows");orders.forEach((function(order){addOrderRow();var thisRow=rowsWarpper.lastElementChild.previousElementSibling;thisRow.querySelector("#clientName").value=order.ClientId.toString();var types=thisRow.querySelector("#types");order.Order.forEach((function(ele,index){index>1&&addTypeCol(2,types),types.lastElementChild.firstElementChild.value=ele.ItemId.toString(),types.lastElementChild.lastElementChild.value=ele.Quantity.toString()}))}))}(orders),CalculateTotals()}window.onunload=function(){undefined.content=content,undefined.clients=clients,undefined.totalOrder=totalOrder,undefined.cheque=cheque,undefined.types=types,undefined.orders=orders,undefined.totalOrderItems=totalOrderItems,undefined.lang=lang,window.localStorage.setItem("appData",JSON.stringify(undefined)),JSON.parse(window.localStorage.getItem("appData"))},window.onload=function(event){var myData=JSON.parse(window.localStorage.getItem("appData"));null!=myData?(content=myData.content,clients=myData.clients,totalOrder=myData.totalOrder,cheque=myData.cheque,types=myData.types,orders=myData.orders,totalOrderItems=myData.totalOrderItems,lang=myData.lang,createOrderTable(),createSettingsPart(),displayStored()):(createOrderTable(),createSettingsPart(),addOrderRow());var float=document.querySelector(".float");document.getElementById("openFloat").addEventListener("click",(function(){float.style.display="grid",displayNameRows(clients),displayTypeRows(types)}))}})();