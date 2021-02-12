import React from "react"
import { List, Datagrid, TextField, EmailField} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
           
            
            <EmailField source="email"/>
            <TextField source="telephones" />
            <TextField source="role" />
            <TextField source="trades" />
        </Datagrid>
    </List>
);