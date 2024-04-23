import {List,Datagrid,TextField, Edit,SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from "react-admin"

export default function warehouseEdit(props){

  return(
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput disabled source="region"/>
        <TextInput source="address"/>
        <TextInput source="capacity"/>
        <ArrayInput source="manager">
            <SimpleFormIterator>
              <TextInput source="user.username"/>
            </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  )
}