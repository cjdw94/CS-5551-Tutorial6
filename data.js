const fs =  require('fs');


// ------------ Begin - Converting objects into JSON using JSON.stringify -----------------
var saveData = (data) => {
  fs.writeFileSync('customerData.json',JSON.stringify(data));
};
// ------------ End - Converting objects into JSON using JSON.stringify -----------------

// ------------ Begin - Converting JSON back into an object using JSON.parse -----------------
var fetchData = () => {
  try {     
    var notesString = fs.readFileSync('customerData.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};
// ------------ End - Converting JSON back into an object using JSON.parse -----------------

// ------------ Begin - Adding -----------------
var addData = (customerID,customerName,customerEmail,customerPhone) => {   
    var data = fetchData();
    var info = {customerID,customerName,customerEmail,customerPhone}

    var duplicateData =  data.filter((info) => { 
	// By using customer ID, we check if the data already exists.
      return info.customerID === customerID;
    });

    if (duplicateData.length === 0){
      data.push(info);
      saveData(data);
      return info
    }

  };
// ------------ End - Adding -----------------

// ------------ Begin - Updating -----------------
var updateData = (customerID,customerName,customerEmail,customerPhone) => {   
    var data = fetchData();
	var updatingDate = data.filter((info) => {
		if (info.customerID === customerID){
			info.customerName = customerName;
			info.customerEmail = customerEmail;
			info.customerPhone = customerPhone;
		} return;
	});	
	saveData(data);
  };
// ------------ End - Updating -----------------

// ------------ Begin - listing -----------------
var getAll = () => {
    return fetchData();
};
// ------------ End - listing -----------------

// ------------ Begin - Reading -----------------
var readData = (customerID) => {
    var data = fetchData();
    var getData =  data.filter((info) => { 
      return info.customerID === customerID;
    });
    return getData[0]
};
// ------------ End - Reading -----------------

// ------------ Begin - Deleting -----------------
var removeData = (customerID) => {
    var data = fetchData();
    var filteredData =  data.filter((info) => {
      return info.customerID !== customerID;
    });
    saveData(filteredData);
    return data.length !== filteredData.length 
};
// ------------ End - Deleting -----------------

// ------------ Begin - Log -----------------
  var logData = (info) => { 
  console.log('\n-- Customer Information -- \n');
  console.log(`ID: ${info.customerID}`);
  console.log(`Name: ${info.customerName}`);
  console.log(`Email: ${info.customerEmail}`);
  console.log(`Phone Number: ${info.customerPhone}`);
};
// ------------ End - Log -----------------

// ------------ Begin - Define the functions -----------------
module.exports = {
  addData,logData, readData, getAll, removeData, updateData
};
// ------------ End - Define the functions -----------------
