import React from 'react';
import {Text} from 'react-native';
import BaseViewComponent from '../layouts/BaseViewComponent.tsx';
import TextInputComponent from '../components/form-components/TextInputComponent.tsx';
import DatePickerComponent from '../components/form-components/DatePickerComponent.tsx';
import DropdownComponent from '../components/form-components/DropdownComponent.tsx';
import RadioButtonComponent from '../components/form-components/RadioButtonComponent.tsx';
import CheckBoxComponent from '../components/form-components/CheckBoxComponent.tsx';
import ToggleSwitchComponent from '../components/form-components/ToggleSwitchComponent.tsx';

const FormComponentsScreen = () => {
    const [toggleVal, setToggleVal] = React.useState(false);

    const data = [{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}];

    return (
        <BaseViewComponent>
            <Text>FormComponentsScreen</Text>
            <TextInputComponent
                labelText="First Name"
                isRequired={false}
                placeholder="Enter your first name"
                onUpdate={(value: any) => console.log(value)}
                testID="first-name"/>
            <DatePickerComponent
                labelText="Date of Birth"
                isRequired={false}
                placeHolder="Select your date of birth"/>
            <DropdownComponent
                data={data || []}
                value={'1'}
                onUpdate={(value: any) => console.log(value)}
                labelText="Select a value"/>
            <RadioButtonComponent
                data={data || []}
                value={'1'}
                label={'Select a value'}
                onUpdate={(value: any) => console.log(value)}
                labelText="Select a value"/>
            {/*<SliderComponent minValue={0} maxValue={10} value={5} step={1}/>*/}
            <CheckBoxComponent
                labelText="Select a value"
                onUpdate={(value: any) => console.log(value)}
                label={'Check box'}
            />
            <ToggleSwitchComponent onToggle={(value: any) => {setToggleVal(value);}} isOn={toggleVal} label={'Toggle button'} />
        </BaseViewComponent>
    );
};

export default FormComponentsScreen;
