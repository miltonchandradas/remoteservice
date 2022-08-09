const cds = require("@sap/cds");

module.exports = async (srv) => {
   const { Employees, Orders } = srv.entities;

   // connect to remote service
   const northwindService = await cds.connect.to("northwind");

   srv.on("READ", Orders, async (req, next) => {
      return await northwindService.run(SELECT.from(Orders));
   });

   srv.on("READ", Employees, async (req, next) => {
      if (!req.query.SELECT.columns) return await next();

      const expandIndex = req.query.SELECT.columns.findIndex(
         ({ expand, ref }) => expand && ref[0] === "orders"
      );

      if (expandIndex < 0) return await next();

      try {
         let employees = await next();
         employees = Array.isArray(employees) ? employees : [employees];

         await Promise.all(
            employees.map(async (employee) => {
               const orders = await northwindService.run(
                  SELECT.from(Orders).where({ EmployeeID: employee.id })
               );
               employee.orders = orders;
            })
         );
      } catch (error) {
         console.log("Error: ", error);
      }
   });
};
