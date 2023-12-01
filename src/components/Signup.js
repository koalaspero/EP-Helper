import { useState } from 'react';
import { signupFields, passwords } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;
const passwordsFields= passwords;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');
passwordsFields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const [passwordsState,setPasswordsState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});
  const handlePasswordChange=(e)=>setPasswordsState({...passwordsState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    signupState['password'] = passwordsState['password']
    signupState['confirm-password'] = passwordsState['confirm-password']
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="pl-20">
          {
                  fields.map(field=>
                          <Input
                              key={field.id}
                              handleChange={handleChange}
                              value={signupState[field.id]}
                              labelText={field.labelText}
                              labelFor={field.labelFor}
                              id={field.id}
                              name={field.name}
                              type={field.type}
                              isRequired={field.isRequired}
                              placeholder={field.placeholder}
                      />
                  
                  )
          }
          </div>
          <div className="pl-20">
            {
                    passwordsFields.map(field=>
                            <Input
                                key={field.id}
                                handleChange={handlePasswordChange}
                                value={passwordsState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
            }
          </div>
          
        </div>
        <div className='flex justify-center'>
          <FormAction handleSubmit={handleSubmit} text="Registro" />
        </div>
      </form>
    )
}