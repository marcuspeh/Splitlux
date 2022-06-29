# Entity Relation Diagram (ERD)

## Software
This is used to generate the ERD :[https://www.comp.nus.edu.sg/~cs2102/Tools/ERD/](https://www.comp.nus.edu.sg/~cs2102/Tools/ERD/)
Simply copy and paste the [code](#Codes) section below into the tool to generate the diagram

## Codes 
[User](ID*, name, email, password, is_admin);
[Group](ID*, name, is_closed, code_id);
<Owner>();
<Members>();
User --- Owner;
Group ==> Owner;
User --- Members;
Group === Members;

[Payment](ID*, amount);
<Payer>();
<Payee>();
User ==> Payer;
Payment ==> Payer;
User ==> Payee;
Payment ==> Payee;

<To_Pay_List>();
Payment ==> To_Pay_List;
Group --- To_Pay_List;

[Transaction](ID*, title, total_amount);
<Payers>(amount);
<Expenses>(amount);
Transaction --- Payers;
Transaction --- Expenses;
User --- Payers;
User --- Expenses;



