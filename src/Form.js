import { useState } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';


export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [charge, setCharge] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [passw, setPassw] = useState('');
  const [confPassw, setConfPassw] = ('');
  const [sadmin, setSAdmin] = useState('');
  const [jefe, setJefe] = useState('');
  const [formErrors, setFormErrors] = useState({
                                        firstName:'',
                                        secondName:'',
                                        email: '',
                                        charge: '',
                                        phone:'',
                                        avatar: '',
                                        passw: '',
                                        confPassw:'',    
                                        sadmin: '',
                                        jefe:'', 
                                      })
  const [fieldValid, setFieldValid] = useState({
                                        firstNameValid: false,
                                        secondNameValid: false,
                                        emailValid: false,
                                        chargeValid: false,
                                        phoneValid: false,
                                        avatarValid: false,
                                        passwValid: false,
                                        confPasswValid: false,    
                                         
                                      })
  const [formValid, setFormValid] = useState(false);

  
  function handleSubmit(){
  var requestOptions = {
    method: 'POST',
    headers: 'myHeaders',
    body: {
      "nombre": firstName,
      "email": email,
      "apellido": secondName,
      "password": passw,
      "confirmar": confPassw,
      "esSuperAdmin": sadmin,
      "telefono": phone,
      "cargo": charge 
    },
    redirect: 'follow'
  };
  
  fetch("https://colegios.delmartg.com:8080/api/test/store", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    //falta aqui el response y el tratamiento de errores                                    
  }

  function handleUserInputAvatar(e){
      const elem = e.target;
      const file = elem.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file)
      
      reader.onloadend = ()=>{
          setAvatar(reader.result.toString())
      }
  }
  
  function handleUserInput(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    
    let fieldValidationErrors = formErrors;
    let emailValid = fieldValid.emailValid;
    let passwordValid = fieldValid.passwordValid;
    let confPasswordValid = fieldValid.confPasswValid;
    let firstNameValid = fieldValid.firstNameValid;
    let secondNameValid = fieldValid.secondNameValid;
    let chargeValid = fieldValid.chargeValid;
    let phoneValid = fieldValid.phoneValid;
    

    switch(fieldName) {
      case 'firstName':
        firstNameValid = value.length >=2;
        fieldValidationErrors.firstName = firstNameValid ? '' : 'the name is too short';
        setFirstName(value);
        setFieldValid(...fieldValid, firstNameValid);
        break;
      case 'secondName':
        secondNameValid = value.length >=2;
        fieldValidationErrors.secondName = secondNameValid ? '' : 'the second name is too short'
        setSecondName(value);
        setFieldValid(...fieldValid, secondNameValid);
        break;
      case 'charge':
        chargeValid = value.length >=2;
        fieldValidationErrors.charge = chargeValid ? '' : 'the charge must be valid'
        setCharge(value);
        setFieldValid(...fieldValid, chargeValid);
        break;
      case 'phone':
        phoneValid = value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
        fieldValidationErrors.phone = phoneValid ? '' : 'Type a valid phone number'
        setPhone(value);
        setFieldValid(...fieldValid, phoneValid);
        break;          
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        setEmail(value);
        setFieldValid(...fieldValid, emailValid);
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' is too short';
        setPassw(value);
        setFieldValid(...fieldValid, passwordValid);
        break;
      case 'confpassword' ://revisar
        confPasswordValid = (value && value===passw);
        fieldValidationErrors.confPassw = confPasswordValid ? '': ' password to confirm is not match';
        setConfPassw(value);
        setFieldValid(...fieldValid, confPasswordValid);
        break;
      case 'sadmin':
        setSAdmin(e.target.checked);
        break;
      case 'esjefe':
        setJefe(e.target.checked);
        break;     
      default:
        break;
    }
    
    validateForm();
    
  }

  function validateForm(){
    setFieldValid({ formValid: fieldValid.firstNameValid && 
                              fieldValid.secondNameValid &&
                              fieldValid.emailValid &&
                              fieldValid.chargeValid &&
                              fieldValid.passwValid &&
                              fieldValid.confPasswValid &&
                              fieldValid.phoneValid
                              
                            });
  }

  function errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  
    return (
      <form className="styleForm" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        
        <div className="panel panel-">
          <FormErrors formErrors={formErrors} />
        </div>

        <div className={`form-group ${errorClass(formErrors.firstName)}`}>
          <label htmlFor="firstName">Nombre</label>
          <input type="text" required className="form-control" name="firstName"
            placeholder="Nombre"
            value={firstName}
            onChange={handleUserInput}  />
        </div>
        
        <div className={`form-group ${errorClass(formErrors.secondName)}`}>
          <label htmlFor="secondName">Apellido</label>
          <input type="text" required className="form-control" name="secondName"
            placeholder="Apellido"
            value={secondName}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.email)}`}>
          <label htmlFor="email">Email</label>
          <input type="text" required className="form-control" name="email"
            placeholder="Email"
            value={email}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.charge)}`}>
          <label htmlFor="charge">Cargo</label>
          <input type="text" required className="form-control" name="charge"
            placeholder="Cargo"
            value={charge}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.phone)}`}>
          <label htmlFor="phone">Teléfono</label>
          <input type="phone" required className="form-control" name="phone"
            placeholder="teléfono"
            value={phone}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.avatar)}`}>
          <label htmlFor="avatar">Avatar</label>
          <input type="file" required className="form-control" name="avatar"
            placeholder=""
            value={avatar}
            onChange={handleUserInputAvatar}  />
        </div>
        
        <div className={`form-group ${errorClass(formErrors.passw)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={passw}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.confPassw)}`}>
          <label htmlFor="confpassword">Confirmar </label>
          <input type="password" className="form-control" name="confpassword"
            placeholder="Confirmar contraseña"
            value={confPassw}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.sadmin)}`}>
          <label htmlFor="sadmin">Super admin</label>
          <input type="checkbox" className="form-control" name="sadmin"
            value={sadmin}
            onChange={handleUserInput}  />
        </div>

        <div className={`form-group ${errorClass(formErrors.jefe)}`}>
          <label htmlFor="esjefe">Es jefe</label>
          <input type="checkbox" className="form-control" name="esjefe"
            value={jefe}
            onChange={handleUserInput}  />
        </div>
        
        <button type="submit" className="" disabled={!formValid} >Registrar</button>
      
      </form>
    )
  }



