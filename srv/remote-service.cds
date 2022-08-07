using {demo} from '../db/schema';

@path : 'service/remote'
service RemoteService {
    entity Employees as select from demo.Employees;

    @readonly
    entity Orders as select from demo.Orders;
}
