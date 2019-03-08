
const fs =  require('fs');

var fetchCustomers = () => {
  try {                          //if file won't exist
    var customersString = fs.readFileSync('customers-data.json')
    return JSON.parse(customersString);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('customers-data.json',JSON.stringify(customers));
};

var addCustomer = (customerID,customerName,customerEmail,customerPhone) => {   
    var customers = fetchCustomers();
    var customer = {customerID,customerName,customerEmail,customerPhone};

    var duplicateCustomers =  customers.filter((customer) => { // to check if customer entry already exists
      return customer.customerID === customerID;
    });

    if (duplicateCustomers.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer
    }

  };
  var logCustomer = (customer) => { 
  console.log('--');
  console.log(`Customer ID: ${customer.customerID}`);
  console.log(`Name: ${customer.customerName}`);
  console.log(`Email address: ${customer.customerEmail}`);
  console.log(`Phone number: ${customer.customerPhone}`);
};

  
module.exports = {
  addCustomer,logCustomer
};
  