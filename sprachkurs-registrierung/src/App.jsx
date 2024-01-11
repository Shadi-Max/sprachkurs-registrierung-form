import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CountryDropdown } from 'react-country-region-selector';
import React from 'react';
import * as Yup from 'yup';
import './App.css'

const initialValues = {
  vorname: '',
  nachname: '',
  birthdate: '',
  birthplace: '',
  country: '',
  phone: '',
  gender: '',
  datenschutz: '',
};

const phoneRegExp = /^[0-9+]{9,15}$/;

const validationSchema = Yup.object().shape({
  vorname: Yup.string().required('Ihre Vorname bitte eingeben'),
  nachname: Yup.string().required('Ihre Nachname bitte eingeben'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Ungültige Telefonnummer')
    .required('Ihre Telefonnummer bitte eingeben'),
  gender: Yup.string().required('Ein Geschlecht bitte auswählen'),
  datenschutz: Yup.string().required('Bitte die Datenschutzerklärung Zustimmen um registrieren zu können.'),
});

const onSubmit = async (values, { setSubmitting, resetForm}) => {
  await new Promise((r) => setTimeout(r, 500));
  alert(JSON.stringify(values, null, 2));
  console.log(values);
  setSubmitting(false);
};

function App() {

  return (
    <div className='app'>
        <div className='reg-form'>
          <div className="form-title">
            <h1>Sprachkurs Registrierung</h1>
          </div>
          <div className="form-fields">
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
              {({ isSubmitting, values, handleChange, handleBlur }) => (
                <Form>
                  <div className="field-container" id='name'>
                    <label id='first-name'>Name:</label>
                    <div className="name-fields">
                      <div className="first-name">
                        <Field
                        className='field'
                        type="text"
                        name="vorname"
                        placeholder="Vorname"
                        />
                        <ErrorMessage name="vorname" component="div" className='error' />
                      </div>

                      <div className="last-name">
                        <Field
                        className='field'
                        type="text"
                        name="nachname"
                        placeholder="Nachname"
                        />
                        <ErrorMessage name="nachname" component="div" className='error'/>
                      </div>
                    </div>
                  </div>

                  <div className="field-container">
                    <label id='birth-date'>Geburtsdatum:</label>
                    <Field
                      className='field'
                      type="date"
                      name="birthdate"
                      placeholder="Geburtsdatum"
                    />
                    <ErrorMessage name="nachname" component="div" className='error'/>
                  </div>

                  <div className="field-container">
                    <label id='birth-place'>Geburtsort:</label>
                    <Field
                      className='field'
                      type="text"
                      name="birthplace"
                      placeholder="Geburtsort"
                    />
                    <ErrorMessage name="nachname" component="div" className='error'/>
                  </div>

                  <div className='field-container' role="group" aria-labelledby="gender">
                    <label id="gender">Geschlecht:</label>
                    <div role="group" className='gender-group'>
                      <label id='radio'>
                        <Field type="radio" name="gender" value="man" />
                        Männlich
                      </label>
                      <label id='radio'>
                        <Field type="radio" name="gender" value="woman" />
                        Weiblich
                      </label>
                      <label id='radio'>
                        <Field type="radio" name="gender" value="divers" />
                        Divers
                      </label>
                    </div>
                  </div>

                  <div className="field-container">
                    <label id='phone-number'>Telefonnummer:</label>
                    <Field
                      className='field'
                      type="text"
                      name="phone"
                      placeholder="Beispiel: +49 176XXXXXXX"
                    />
                    <ErrorMessage name="nachname" component="div" className='error'/>
                  </div>

                  <div className="field-container">
                    <label id='origin-country'>Herkunftsland:</label>
                    <CountryDropdown
                      className='field'
                      name='country'
                      value={values.country}
                      onChange={(_, e) => handleChange(e)} onBlur={handleBlur}
                    />
                  </div>

                  <div className='field-container'>
                    <label>
                      <Field id='checkbox' type="checkbox" name="datenschutz" />
                      Ich erkläre mich weiter damit einverstanden, dass meine persönlichen Daten elektronisch gespeichert und, wenn notwendig, an Dritte weitergegeben werden.
                    </label>
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    Registrieren
                  </button>
                </Form>
              )}
            </Formik>
          </div>
       </div>
    </div>
  )
}

export default App
