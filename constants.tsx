
import { Role, User } from './types';

export const DISTRICTS = [
  'Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri', 'Sangareddy', 'Warangal', 
  'Nizamabad', 'Khammam', 'Karimnagar', 'Mahabubnagar', 'Nalgonda'
];

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Srinivas Rao', role: Role.COMMISSIONER, mobile: '9876543210', email: 'comm-labour@telangana.gov.in', district: 'Statewide' },
  { id: '2', name: 'M. Venkat Ramana', role: Role.JCL, superiorId: '1', mobile: '9876543211', email: 'jcl.hyd@telangana.gov.in', district: 'Hyderabad' },
  { id: '3', name: 'K. Sridevi', role: Role.DCL, superiorId: '2', mobile: '9876543212', email: 'dcl.hyd@telangana.gov.in', district: 'Hyderabad', division: 'Division-I' },
  { id: '4', name: 'R. Krishna', role: Role.ACL, superiorId: '3', mobile: '9876543213', email: 'acl.hyd1@telangana.gov.in', district: 'Hyderabad', division: 'Division-I', circle: 'Circle-A' },
  { id: '5', name: 'S. Mahesh', role: Role.ALO, superiorId: '4', mobile: '9876543214', email: 'alo.hyd.ca@telangana.gov.in', district: 'Hyderabad', division: 'Division-I', circle: 'Circle-A' },
];

export const COLORS = {
  primary: '#0f172a',
  secondary: '#334155',
  accent: '#0891b2',
  success: '#10b981',
  warning: '#f59e0b',
};
