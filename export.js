var array = [["Street Address", "City", "Zip Code", "Type", "Class", "Document Date", "Amount", "Owner", "Plaintiff", "Auction Info", "Borrower", "Lender", "Contact Name", "Contact Telephone", "Contact Type"]];

$("tr#trselectprop").each(function() {
  console.log("in loop");
  if ($(this).find("td#tdAddress")[0] != undefined) {
  	var address = $(this).find("td#tdAddress")[0].innerText.replace(/,/g, " ");
  } else if ($(this).find("td#Neighborhood")[0] != undefined) {
  	var address = $(this).find("td#Neighborhood")[0].innerText.replace(/,/g, " ");
  } else if ($(this).find("#Address")[0] != undefined) {
  	var address = $(this).find("#Address")[0].innerText.replace(/,/g, " ");
  } else {
  	var address = null;
  }

  var street_address = address.substr(0, address.lastIndexOf("\n"));
  var city = address.substring(address.lastIndexOf("\n") + 1,address.length - 6);
  var zip = address.substr(address.length - 5);
	
  if ($(this).find("td#tdtype")[0] != undefined) {
  	var type = $(this).find("td#tdtype")[0].innerText;
  } else {
  	var type = null;
  }
  
  if ($(this).find("td#tdClass")[0] != undefined) {
  	var property_class = $(this).find("td#tdClass")[0].innerText;
  } else if ($(this).find("#Class")[0] != undefined) {
  	var property_class = $(this).find("#Class")[0].innerText;
  } else if ($(this).find("#Classification")[0] != undefined) {
  	var property_class = $(this).find("#Classification")[0].innerText;
  } else {
    var property_class = null;
  }
  
  if ($(this).find("td#tdDocDate")[0] != undefined) {
  	var doc_date = $(this).find("td#tdDocDate")[0].innerText;
  } else if ($(this).find("#DocDate")[0] != undefined) {
    var doc_date = $(this).find("#DocDate")[0].innerText;
  } else {
  	var doc_date = null;
  }

  if ($(this).find("#Amount")[0] != undefined) {
  	var amount = $(this).find("#Amount")[0].innerText.replace(/,/g, "");
  } else {
  	var amount = null;
  }

  if ($(this).find("td#tdOwner")[0] != undefined) {
  	var owner = $(this).find("td#tdOwner")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"").replace(/,/g, " ");
  } else if ($(this).find("#Owner")[0] != undefined) {
  	var owner = $(this).find("#Owner")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"").replace(/,/g, " ");
  } else {
  	var owner = null;
  }
  
  if ($(this).find("td#tdPlaintiff")[0] != undefined) {
  	var plaintiff = $(this).find("td#tdPlaintiff")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"");
  } else if ($(this).find("#Plaintiff")[0] != undefined){
    var plaintiff = $(this).find("#Plaintiff")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"");
  } else {
  	var plaintiff = null;
  }
  
  if ($(this).find("#tdauctiondate")[0] != undefined) {
  	var auction_info = $(this).find("#tdauctiondate")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm," ").replace(/,/g, " ");
  } else {
  	var auction_info = null;
  }
  
  if ($(this).find("#Borrower")[0] != undefined) {
  	var borrower = $(this).find("#Borrower")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"").replace(/,/g, " ");
  } else {
  	var borrower = null;
  }
  
  if ($(this).find("#Lender")[0] != undefined) {
  	var lender = $(this).find("#Lender")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"").replace(/,/g, " ");
  } else {
  	var lender = null;
  }

  $(this).next().find("tbody tr").each(function() {
    var property_array = [];
    
    var contact_name = $(this).find("td")[0].innerText.replace(/,/g, " "); 
    var contact_telephone = $(this).find("td")[1].innerText;
    var contact_type = $(this).find("td")[2].innerText;
    
    property_array.push(street_address, city, zip, type, property_class, doc_date, amount, owner, plaintiff, auction_info, borrower, lender, contact_name, contact_telephone, contact_type);
    
    array.push(property_array);
  });

});

/* setup comma delimited format */
var csv = array.map(function(d){
	return d.join();
}).join('\n');

/* console.log(csv); */

/* export to CSV file */
var pom = document.createElement('a');
var csvContent=csv; 
var blob = new Blob([csvContent],{type: 'text/csv;charset=utf-8;'});
var url = URL.createObjectURL(blob);
pom.href = url;
pom.setAttribute('download', 'property_export.csv');
pom.click();
