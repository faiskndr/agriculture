import { List,Datagrid,TextField,EditButton,DeleteButton } from "react-admin";

export default function warhouseList(props){
    return (
      <List {...props}>
        <Datagrid>
          <TextField source="id"/>
          <TextField source="region"/>
          <TextField source="address"/>
          <TextField source="available"/>
          <EditButton basePath="/warehouse"/>
          <DeleteButton/>
        </Datagrid>
      </List>
    )
}