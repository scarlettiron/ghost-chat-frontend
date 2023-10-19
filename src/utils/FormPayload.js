//takes in form event and returns dictionary of
//form input values with form input id's as the keys
//{
//    e.target.id:e.target.value
//}
const FormPayload = (e) => {
    const input_types = ['INPUT', 'TEXTAREA', 'SELECT']
    const elements = e.target.elements
    const payload = {}
    for (let x in elements){
        if(input_types.includes(elements[x].nodeName)){
            
            payload[elements[x].id] = elements[x].value
            }
        }
    console.log(payload)
    return payload
}

export default FormPayload