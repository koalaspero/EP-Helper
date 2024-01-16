const loginFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Nombre de Usuario"   
    },
    {
        labelText:"Contraseña",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Ingrese su contraseña"   
    }
]

const signupFields=[
    {
        labelText:"Nombre",
        labelFor:"first-name",
        id:"name",
        name:"fname",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Nombre"   
    },  
    {
        labelText:"Apellido",
        labelFor:"last-name",
        id:"last-name",
        name:"lname",
        type:"text",
        autoComplete:"name",
        isRequired:true,
        placeholder:"Apellido"   
    }, 
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Nombre de Usuario"   
    },
]

const passwords = [
    {
        labelText:"Password",
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
        isRequired:true,
        placeholder:"Contraseña"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirma Contraseña"   
    }
]

const apiBasUrl = "http://localhost:8000/"

export {loginFields,signupFields,passwords, apiBasUrl}