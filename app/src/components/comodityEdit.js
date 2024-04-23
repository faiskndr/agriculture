import { Edit, SelectInput, SimpleForm, TextInput } from "react-admin"

export default function comodityEdit(props){
  return(
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput disabled source="name"/>
        <TextInput source="warhouse.region"/>
        <TextInput source="price"/>
        <SelectInput source="status" choices={[
          {id:'pending',name:'pending'},
          {id:'store',name:'store'},  
        ]}/>
      </SimpleForm>
    </Edit>
  )
}