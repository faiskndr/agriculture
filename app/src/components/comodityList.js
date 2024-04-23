import { List,Datagrid,TextField,EditButton,DeleteButton, TextInput } from "react-admin";

const comodityFilter=[
  <TextInput label="cari" source="q" alwaysOn/>
]

export default function comodityList(props){
    return (
      <List {...props} filters={comodityFilter} >
        <Datagrid>
          <TextField source="name" sortable={false}/>
          <TextField source="amount"/>
          <TextField source="status"/>
          <TextField source="price"/>
          <TextField source="warehouse.address" sortable={false}/>
          <TextField source="created_at"/>
          <TextField source="updated_at"/>
          <EditButton basePath="/comodity"/>
          <DeleteButton/>
        </Datagrid>
      </List>
    )
}