namespace demo;

entity Employees {
    key id     : Integer;
        name   : String;
        orders : Association to many Orders;
}

using {northwind} from '../srv/external/northwind.csn';

entity Orders as projection on northwind.Orders {
    key OrderID     as id,
        EmployeeID  as employeeId,
        ShipName    as shipName,
        ShipAddress as shipAddress
}
