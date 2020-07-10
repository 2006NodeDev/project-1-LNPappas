/*
  The Role model is used to track what 
  permissions a user has

  imported by User Model
*/

export interface Role {
    roleId: number // primary key
    role: string // not null, unique
}