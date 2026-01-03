import {Field, FieldProps, Formik, FormikHelpers} from 'formik';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import * as yup from 'yup';
import {Colors} from '../utils';
import BaseViewComponent from '../layouts/BaseViewComponent.tsx';
import FormikInputComponent from '../components/form-components/FormikTextInputComponent.tsx';
import FormikDropdownComponent from '../components/form-components/FormikDropdownComponent.tsx';
import FormikDatepickerComponent from '../components/form-components/FormikDatePickerComponent.tsx';
import FormikToggleSwitchComponent from '../components/form-components/FormikToggleSwitchComponent.tsx';
import FormikCheckboxComponent from '../components/form-components/FormikCheckBoxComponent.tsx';
import FormikRadioGroupComponent from '../components/form-components/FormikRadioButtonComponent.tsx';
import CustomButton from '../components/ButtonComponent.tsx';

const data: any = [
  {label: 'Age 1', value: '1'},
  {label: 'Age 2', value: '2'},
  {label: 'Age 3', value: '3'},
  {label: 'Age 4', value: '4'},
  {label: 'Age 5', value: '5'},
  {label: 'Age 6', value: '6'},
  {label: 'Age 7', value: '7'},
  {label: 'Age 8', value: '8'},
];

export interface formInitialValues {
  cngLpg: boolean;
  toggle: boolean;
  dateOfBirth: any;
  firstName: string;
  lastName: string;
  slider: number;
}

const FormikFormComponentsScreen = () => {
  // const [value, setValue] = useState(null);
  // const [toggle, setToggle] = useState(false);

  const submitValues = useCallback(
    (val: any, formikHelpers: FormikHelpers<formInitialValues>) => {
      formikHelpers.setSubmitting(false);
      console.log(val, 'values');
    },
    [],
  );

  return (
    <BaseViewComponent>
      {/*<DropdownComponent*/}
      {/*  data={data}*/}
      {/*  value={value}*/}
      {/*  onUpdate={val => {*/}
      {/*    setValue(val);*/}
      {/*    console.log(val, 'jhgfghgf');*/}
      {/*  }}*/}
      {/*/>*/}
      {/*<DatePickerComponent />*/}
      {/*<ToggleSwitchComponent*/}
      {/*  label={'vaerf'}*/}
      {/*  onToggle={isOn => {*/}
      {/*    console.log(isOn, 'serfgserfer');*/}
      {/*  }}*/}
      {/*/>*/}
      <View>
        <View style={{flexGrow: 1}}>
          <Formik
            // @ts-ignore
            onSubmit={submitValues}
            validationSchema={yup.object().shape({
              firstName: yup.string().required('Required'),
              lastName: yup.string().required('Required!!!'),
              dateOfBirth: yup.string().required('Required'),
              cngLpg: yup.boolean().required('Required'),
              age: yup.string().required('Required'),
              toggle: yup.boolean().required('Required'),
              slider: yup.string().required('Required'),
              severityRange: yup.string().required('Required'),
            })}
            validateOnBlur={true}
            initialValues={{
              firstName: '',
              lastName: '',
              dateOfBirth: '',
              cngLpg: true,
              age: '',
              toggle: true,
              slider: 5,
              severityRange: undefined,
            }}>
            {({handleSubmit, isSubmitting}) => (
              <View style={styles.contentStyle}>
                <View>
                  <View style={{marginVertical: 20}}>
                    <Field name={'firstName'}>
                      {(field: FieldProps) => (
                        <FormikInputComponent
                          labelText="First Name"
                          trimLeft={true}
                          inputProperties={{
                            placeholder: 'Enter First Name',
                            maxLength: 50,
                            keyboardType: 'default',
                          }}
                          formikField={field}
                        />
                      )}
                    </Field>
                    <Field name={'lastName'}>
                      {(field: FieldProps) => (
                        <FormikInputComponent
                          labelText="Last Name"
                          trimLeft={true}
                          inputProperties={{
                            placeholder: 'Enter Last Name',
                            maxLength: 50,
                            keyboardType: 'default',
                          }}
                          formikField={field}
                        />
                      )}
                    </Field>
                    <Field name={'age'}>
                      {(field: FieldProps) => (
                        <FormikDropdownComponent
                          data={data}
                          formikField={field}
                          labelText={'Data'}
                        />
                      )}
                    </Field>
                    <Field name={'dateOfBirth'}>
                      {(field: FieldProps) => (
                        <FormikDatepickerComponent
                          formikField={field}
                          labelText={'DateOfBirth'}
                        />
                      )}
                    </Field>
                    <Field name={'toggle'}>
                      {(field: FieldProps) => (
                        <FormikToggleSwitchComponent
                          formikField={field}
                          labelText={'Toggle'}
                          onColor={Colors.primary}
                          onUpdate={val => {
                            console.log(val, 'toggle value');
                          }}
                        />
                      )}
                    </Field>

                    <Field name={'cngLpg'}>
                      {(field: FieldProps) => (
                        <FormikCheckboxComponent
                          formikField={field}
                          // labelText={'Check'}
                          label={'CngLpg'}
                        />
                      )}
                    </Field>
                    <Field name={'severityRange'}>
                      {(field: FieldProps) => (
                        <FormikRadioGroupComponent
                          formikField={field}
                          labelText={'Severity Range:'}
                          radioButtons={[
                            {id: '1', title: '1'},
                            {id: '2', title: '2'},
                            {id: '3', title: '3'},
                          ]}
                        />
                      )}
                    </Field>
                  </View>
                </View>
                <CustomButton
                  style={{marginTop: 60}}
                  class={'primary'}
                  title={'Next'}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                />
              </View>
            )}
          </Formik>
        </View>
      </View>
    </BaseViewComponent>
  );
};

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});

export default FormikFormComponentsScreen;
