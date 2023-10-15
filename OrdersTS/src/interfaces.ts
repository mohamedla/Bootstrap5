export interface INames{
    EName : string,
    AName : string,
}

export interface IItems extends INames{
    Price : number,
}

export interface IClientOrder{
    ClientId: Number,
    Order : IOrderItem []
}

export interface IOrderItem{
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

export interface StoredData{
    content : INames[],
    clients : INames[],
    totalOrder : number,
    cheque : number,
    types : IItems[],
    orders : IClientOrder[],
    totalOrderItems : IOrderItem[],
    lang : language
}