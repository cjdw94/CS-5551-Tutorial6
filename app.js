// ------------ Begin - The block of the code -----------------
const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const DataFile = require('./data.js');
// ------------ End - The block of the code -----------------

// ------------ Begin - command configuration -----------------
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

const customerEmailopt  = {
    describe: 'Customer Email',
    demand : true,
    alias : 'e'
}

const customerPhoneopt  = {
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
	.command('update','Update a customer entry',{
      customerID: customerIDopt,
      customerName: customerNameopt,
	  customerEmail: customerEmailopt,
      customerPhone: customerPhoneopt
    })
    .command('list','List all customers entries')
    .command('read','Read a specific customer information',{
      customerID: customerIDopt
    })
    .command('remove','Remove a customer',{
      customerID: customerIDopt
    })
    .help()
    .argv;
// ------------ End - command configuration -----------------

var command = argv._[0];

// ------------ Begin - Adding -----------------
if (command === 'add'){
    var info = DataFile.addData(argv.customerID,argv.customerName,argv.customerEmail,argv.customerPhone);
    if (info){
      DataFile.logData(info); 
    } else{
      console.log("Data already exists");
    }
}
// ------------ End - Adding -----------------

// ------------ Begin - Updating -----------------
else if (command === 'update'){
 var info = DataFile.updateData(argv.customerID,argv.customerName,argv.customerEmail,argv.customerPhone);
    if (info){
      DataFile.logData(info); 
    } else{
      console.log("Data updated");
    }
}
// ------------ End - Updating -----------------

// ------------ Begin - listing -----------------
else if (command === 'list') {
  var AllData = DataFile.getAll();
    console.log(`Printing ${AllData.length} info(s).`);
    AllData.forEach((info)=>{
    DataFile.logData(info);
  });
}
// ------------ End - listing -----------------

// ------------ Begin - Reading -----------------
else if (command === 'read') {
   var info = DataFile.readData(argv.customerID);
   if(info){
    DataFile.logData(info);      
          }
   else{
    console.log("Data not found");
   }
}
// ------------ End - Reading -----------------

// ------------ Begin - Deleting -----------------
else if (command === 'remove') {
   var info = DataFile.removeData(argv.customerID);
   if(info){
    console.log(`This ID (${argv.customerID}) was deleted successfully`);
          }
   else{
    console.log("Data not found");
   }
}
// ------------ End - Deleting -----------------

else{
  console.log('Please type the right command'); 
}
