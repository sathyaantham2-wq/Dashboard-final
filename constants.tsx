
import { Role, User } from './types';

export const DISTRICTS = [
  'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 
  'Jangaon', 'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar',
  'Khammam', 'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial',
  'Medak', 'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet',
  'Nirmal', 'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy',
  'Siddipet', 'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
];

export const MOCK_USERS: User[] = [
  { 
    id: '1', 
    username: 'comm_labour', 
    password: 'password123',
    name: 'Dr. Srinivas Rao', 
    role: Role.COMMISSIONER, 
    mobile: '9876543210', 
    email: 'comm-labour@telangana.gov.in', 
    district: 'Statewide',
    status: 'Active'
  },
  { 
    id: '2', 
    username: 'jcl_hyd',
    password: 'password123',
    name: 'M. Venkat Ramana', 
    role: Role.JCL, 
    superiorId: '1', 
    mobile: '9876543211', 
    email: 'jcl.hyd@telangana.gov.in', 
    district: 'Hyderabad',
    status: 'Active'
  },
  { 
    id: '3', 
    username: 'jcl_rr',
    password: 'password123',
    name: 'Shyamsunder Reddy.D', 
    role: Role.JCL, 
    superiorId: '1', 
    mobile: '9492555315', 
    email: 'jcl.rangareddy@gmail.com', 
    district: 'Rangareddy',
    status: 'Active'
  },
  { 
    id: '4', 
    username: 'dcl_rr',
    password: 'password123',
    name: 'Shyamsunder Jaju', 
    role: Role.DCL, 
    superiorId: '3', 
    mobile: '9492555345', 
    email: 'dcl.rangareddy@telangana.gov.in', 
    district: 'Rangareddy',
    status: 'Active'
  },
  { 
    id: '5', 
    username: 'acl_rr',
    password: 'password123',
    name: 'Satyanarayana Reddy', 
    role: Role.ACL, 
    superiorId: '4', 
    mobile: '9492555253', 
    email: 'acl.rangareddy@gmail.com', 
    district: 'Rangareddy',
    status: 'Active'
  },
  { 
    id: '6', 
    username: 'alo_rr',
    password: 'password123',
    name: 'K. Mahesh Kumar', 
    role: Role.ALO, 
    superiorId: '5', 
    mobile: '9492555111', 
    email: 'alo.rangareddy@telangana.gov.in', 
    district: 'Rangareddy',
    status: 'Active'
  }
];

export const COLORS = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#0891b2',
  success: '#10b981',
  warning: '#f59e0b',
  govBlue: '#1e40af',
  govLightBlue: '#eff6ff'
};
