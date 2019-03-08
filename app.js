const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const customers = require('./customer.js');

const customerIDopt = {
    describe: 'Customer ID number',
    demand : true,
    alias : 'i'
}

const customerNameopt = {
    describe: 'Customer name',
    demand : true,
    alias : 'n'
}

const customerEmailopt = {
    describe: 'Customer email address',
    demand : true,
    alias : 'e'
}

const customerPhoneopt = {
    describe: 'Customer phone number',
    demand : true,
    alias : 'p'
}

const argv =  yargs

    .command('add','Add a new customer entry',{
      customerID: customerIDopt,
      customerName: customerNameopt,
	  customerEmail: customerEmailopt,
	  customerPhone: customerPhoneopt
    })
    .command('list','List all customer entries')
    .command('read','Retrieve a customer',{
      customerID: customerIDopt
    })
    .command('remove','Remove a customer',{
      customerID: customerIDopt
    })
    .help()
    .argv;

var command = argv._[0];

if (command === 'add'){
    var customer = customers.addCustomer(argv.customerID, argv.customerName, argv.customerEmail, argv.customerPhone);
    if (customer){
      customers.logCustomer(customer);                                //add a new customer
    } else{
      console.log("Customer already exists");
    }
} else if (command === 'list') {
  var AllCustomers = customers.getAll();
  console.log(`Printing ${AllCustomers.length} customer(s).`);
  AllCustomers.forEach((customer)=>{                                //list all customer(s)
    customers.logCustomer(customer);
  });
}