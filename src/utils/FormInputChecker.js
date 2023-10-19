
const formInputChecker = (e, setError, optional_inputs = []) => {
    const input_types = ['INPUT', 'TEXTAREA', 'SELECT']
    const elements = e.target.elements
    for (let x in elements){
        if(input_types.includes(elements[x].nodeName)){
            if(!optional_inputs.includes(elements[x].name) && elements[x].name !== 'placeholder' && !elements[x].value
            && elements[x].type !== 'file'){
                setError(elements[x].name)
                return true
            }
            if(elements[x].value === 'placeholder'){
                setError(elements[x].name)
                return true
            }
            if(!optional_inputs.includes(elements[x].name) && elements[x].type === 'file' &&
            !elements[x].files){
                setError(elements[x].name)
                return true
            }
        }
    }
    return false
}




// when looping through elements, compare current element to values in optionalInputs
// if element id is in optionalInputs   

const ValidateForm = (form, optionalInputs = [], ) => {
    let pass;
    let error;

    for (const element of form.target.elements) {
        let isOptional = optionalInputs.includes(element.id)
        if(!element.value && !isOptional && element.type !== 'submit'){
            pass = false
            error = element.name
            return {pass, error}
        }
    }
    pass = true
    error = null
    return {pass, error}
}


const validateFormCheckboxes = (form=null, passingNumber=0, optionalInputs=[]) => {
    let count = 0
    for (const element of form.target.elements){
        if(!element.type === 'checkbox') return

        if(element.checked ) {
            count = count + 1
        }
    }
    if(count >= passingNumber) return true

    return false
}


export default formInputChecker