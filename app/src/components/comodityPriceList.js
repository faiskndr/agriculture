import { Datagrid, List, TextField } from "react-admin";


export default function comodityPriceList(props){
  return(
    <List {...props}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="name"/>
        <TextField source="price"/>
        <TextField source="created_at"/>
      </Datagrid>
    </List>
  );
}