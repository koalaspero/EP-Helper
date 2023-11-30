const loginFields=[
    {
        labelText:"Nombre de usuario",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Ingrese su usuario"   
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
        id:"first-name",
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
        placeholder:"Password"   
    },
    {
        labelText:"Confirm Password",
        labelFor:"confirm-password",
        id:"confirm-password",
        name:"confirm-password",
        type:"password",
        autoComplete:"confirm-password",
        isRequired:true,
        placeholder:"Confirm Password"   
    }
]

export {loginFields,signupFields,passwords}