using {demo} from '../db/schema';

@path : 'service/remote'
service DemoService {
    entity Employees as select from demo.Employees;
}
