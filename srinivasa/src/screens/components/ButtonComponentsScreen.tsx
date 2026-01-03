import React, {useCallback, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import BaseViewComponent from '../../layouts/BaseViewComponent.tsx';
import CustomButton from '../../components/ButtonComponent.tsx';
import {moderateScale} from 'react-native-size-matters';
import {Colors, ImageConfig} from '../../utils';
import {LocalStorage} from '../../services';

const ButtonComponentsScreen = () => {
    const [text, setText] = useState<any>('');

    const getLocalStorageHandler = useCallback(async () => {
        const textValue = await LocalStorage.getItem('text');
        setText(textValue);
    }, []);

    useEffect(() => {
        getLocalStorageHandler();
    }, [getLocalStorageHandler]);
    return (
        <BaseViewComponent>
            <Text>{text}</Text>
            <View style={{}}>
                <Text>HomeScreen</Text>
                <CustomButton Icon={ImageConfig.FavoriteIcon} iconColor={Colors.backgroundColor} type={'normal'}
                              class={'secondary'} title={'Secondary Button'}/>
                <CustomButton type={'normal'} class={'primary'} title={'Primary Button'}/>
                <CustomButton Icon={ImageConfig.FavoriteIcon} iconPosition={'left'} iconColor={Colors.primary}
                              type={'outline'} class={'primary'} title={'Primary Button'}/>
                <CustomButton type={'outline'} class={'secondary'} title={'Secondary Button'}/>
            </View>
            <View style={{alignItems: 'center'}}>
                <CustomButton autoWidth={true} type={'normal'} class={'secondary'} title={'Secondary Button'}/>
                <CustomButton autoWidth={true} type={'normal'} class={'primary'} title={'Primary Button'}/>
                <CustomButton autoWidth={true} type={'outline'} class={'primary'} title={'Primary Button'}/>
                <CustomButton autoWidth={true} type={'outline'} class={'secondary'} title={'Secondary Button'}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'normal'}
                              class={'secondary'} title={'Secondary Button'}/>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'normal'}
                              class={'secondary'} title={'Secondary Button'}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'normal'}
                              class={'primary'} title={'Primary Button'}/>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'normal'}
                              class={'primary'} title={'Primary Button'}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'outline'}
                              class={'primary'} title={'Primary Button'}/>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'outline'}
                              class={'secondary'} title={'Secondary Button'}/>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'outline'}
                              class={'secondary'} title={'Secondary Button'}/>
                <CustomButton style={{flex: 1, marginHorizontal: moderateScale(10)}} autoWidth={true} type={'outline'}
                              class={'primary'} title={'Primary Button'}/>
            </View>
        </BaseViewComponent>
    );
};

export default ButtonComponentsScreen;
