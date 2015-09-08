var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");
var itemModel = require("./item-model")

var tasks = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;
var listView;

exports.onPageLoaded = function(args) {
    page = args.object;
    pageData.set("task", "");
    pageData.set("tasks", tasks);
    listView = page.getViewById("listView");
    listView.items = tasks;
    page.bindingContext = pageData;
};

exports.add = function() {
	name = pageData.get("task");
    tasks.push( new itemModel.ItemModel(name, "", 0, 100, listView) ); //{ name: pageData.get("task")  } //new itemModel.ItemModel(name, "", 0, 100, listView )
    pageData.set("task", "");
    viewModule.getViewById( page, "task" ).dismissSoftInput();
};

exports.removeQuantityTap = function (args) { 
  //The only way I could get to update the quantity text (while also updating item quantity)
  //Programmatically created items have a different binding context
  //Than the viewModel!!!
  dockLayout = args.object.parent;
  quantity = parseInt(dockLayout.getViewById("itemQuantityTF").text);
  if(quantity > 0)
    quantity -= 1;
  dockLayout.getViewById("itemQuantityTF").text = String(quantity);  
};

exports.addQuantityTap = function (args) {
  dockLayout = args.object.parent;
  quantity = parseInt(dockLayout.getViewById("itemQuantityTF").text);
  quantity += 1;
  dockLayout.getViewById("itemQuantityTF").text = String(quantity);  
};

exports.removeItemTap = function (args) {
  dockLayout = args.object.parent;
  itemName = dockLayout.getViewById("itemNameLabel").text;
  itemLot = dockLayout.getViewById("itemLotLabel").text;
  console.log("removing " + itemName + " with lot " + itemLot);

  for(i=0; i<items.length; i++) {
    currItemName = items.getItem(i).itemName;
    currItemLot = items.getItem(i).itemLot;
    console.log("current: " + currItemName + " with lot " + currItemLot);
    if(currItemName === itemName && currItemLot === itemLot){
      console.log("Found the deletion = " + i);
      items.splice(i, 1);
      break;
    }
  }
};