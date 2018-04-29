var array = [["Street Address", "City", "Zip Code", "Type", "Class", "Document Date", "Owner", "Plaintiff", "Contact Name", "Contact Telephone", "Contact Type"]];

$("tr#trselectprop").each(function() {
  var address = $(this).find("td#tdAddress")[0].innerText.replace(/,/g, " ");

  var street_address = address.substr(0, address.lastIndexOf("\n"));
  var city = address.substring(address.lastIndexOf("\n") + 1,address.length - 6);
  var zip = address.substr(address.length - 5);
	
  var type = $(this).find("td#tdtype")[0].innerText;
  var property_class = $(this).find("td#tdClass")[0].innerText;
  var doc_date = $(this).find("td#tdDocDate")[0].innerText;
  var owner = $(this).find("td#tdOwner")[0].innerText.replace(/(\r\n\t|\n|\r\t\,)/gm,"").replace(/,/g, " ");
  var plaintiff = $(this).find("td#tdPlaintiff")[0].innerText.replace(/,/g, " ");

  $(this).next().find("tbody tr").each(function() {
    var property_array = [];
    
    var contact_name = $(this).find("td")[0].innerText.replace(/,/g, " "); 
    var contact_telephone = $(this).find("td")[1].innerText;
    var contact_type = $(this).find("td")[2].innerText;
    
    property_array.push(street_address, city, zip, type, property_class, doc_date, owner, plaintiff, contact_name, contact_telephone, contact_type);
    
    array.push(property_array);
  });

});

/* setup comma delimited format */
var csv = array.map(function(d){
	return d.join();
}).join('\n');

/* export to CSV file */
var pom = document.createElement('a');
var csvContent=csv; 
var blob = new Blob([csvContent],{type: 'text/csv;charset=utf-8;'});
var url = URL.createObjectURL(blob);
pom.href = url;
pom.setAttribute('download', 'property_export.csv');
pom.click();
