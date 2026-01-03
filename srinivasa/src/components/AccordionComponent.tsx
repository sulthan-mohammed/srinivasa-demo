import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors, FontConfig, ImageConfig} from '../utils';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import CommonStyles from '../utils/CommonStyles.tsx';

export interface AccordionComponentProps {
    header: any;
    openIcon?: string;
    closeIcon?: string;
    isOpen?: boolean;
}

const AccordionComponent = (
    props: PropsWithChildren<AccordionComponentProps>,
) => {
    const {header, children, isOpen} = props;
    const [expand, setExpand] = useState(!!isOpen);
    return (
        <View style={styles.accordion}>
            <TouchableOpacity
                testID={'Accordion_Toggle'}
                onPress={() => {
                    setExpand(!expand);
                }}
                style={styles.accordionHeader}>
                <View style={{flex: 1}}>{!!header}</View>
                <View
                    style={CommonStyles.flexRow}>
                    <View style={styles.accordionBody}>
                        <View style={{flex: 1, padding: moderateScale(4)}}>
                            <Text style={styles.headerText}>
                                {props.header}
                            </Text>
                        </View>
                        <View style={{flex: 0}}>
                            <ImageConfig.ArrowIcon
                                color={Colors.borderColor}
                                style={[
                                    {transform: [{rotate: expand ? '0deg' : '180deg'}]},
                                    styles.imageStyle,
                                ]}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            {expand && <View style={styles.accordionDesc}>{children}</View>}
        </View>
    );
};

const styles = StyleSheet.create({
    accordion: {
        marginHorizontal: moderateScale(8),
        borderWidth: 0.5,
        marginVertical: verticalScale(10),
        borderRadius: 4,
    },

    accordionHeader: {
        padding: moderateScale(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'left',
        fontSize: moderateScale(14),
        fontFamily: FontConfig.primary.Medium,
    },
    accordionBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        alignContent: 'center',
    },
    accordionDesc: {
        padding: moderateScale(8),
    },
    imageStyle: {
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: moderateScale(26),
        height: moderateScale(26),
    },
});

export default AccordionComponent;
