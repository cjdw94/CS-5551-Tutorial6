const fs =  require('fs');

var fetchData = () => {
  try {     
    var notesString = fs.readFileSync('customerData.json')
    return JSON.parse(notesString);
  } catch(e){
    return [];
  }
};
//JSON.stringify to convert objects into JSON.
//JSON.parse to convert JSON back into an object.
var saveData = (data) => {
  fs.writeFileSync('customerData.json',JSON.stringify(data));
};

// ------------ Begin - Adding -----------------
var addData = (customerID,customerName,customerEmail,customerPhone) => {   
    var data = fetchData();
    var info = {customerID,customerName,customerEmail,customerPhone}

    var duplicateData =  data.filter((info) => { 
	// to check if info already exists
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
  console.log('-- Customer Information -- ');
  console.log(`ID: ${info.customerID}`);
  console.log(`Name: ${info.customerName}`);
  console.log(`Email: ${info.customerEmail}`);
  console.log(`Phone Number: ${info.customerPhone}`);
};
// ------------ End - Log -----------------

module.exports = {
  addData,logData, readData, getAll, removeData, updateData
};