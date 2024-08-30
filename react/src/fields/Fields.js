const {__} = wp.i18n
import CheckBox from "./CheckBox"
import Toggle from "./Toggle"
import Text from "./Text";
import Color from "./Color";
import Number from "./Number";
import Dimension from "./Dimension";
import Select from "./Select";
import Radio from "./Radio";
import Typography from "./Typography";
import {cssGenerate} from "../helper/cssGenerate";
const Fields = (props) => {
    const {
        settings,
        formData,
        setFormData,
        dropDown,
        openDropDown,
        colorPicker,
        openColorPicker,
    } = props

    const fieldContent = (key, settingsData) => {
        let options = settingsData['options'];
        let optionKeys = options ?
            Object.keys(options).sort((a, b) => {
                if (a === '' && b !== '') {
                    return -1; // Move empty values to the top
                } else if (a !== '' && b === '') {
                    return 1; // Keep non-empty values in their current position
                } else {
                    return 0; // Maintain the current order for both empty and non-empty values
                }
        }) : [];
        let value = formData && key in formData
            ? formData[key]
            : settingsData['default'] ? settingsData['default'] : ''
        const fieldParams = {
            k: key,
            value: value,
            settingsData: settingsData,
            formData: formData,
            colorPicker: colorPicker,
            openColorPicker: openColorPicker,
            setData: (val) => {
                let valObject = {[key]: val}

                //Set settings for dependent key
                if(settingsData['variations'] && settingsData['variations'][val]) {
                    let variation = settingsData['variations'][val];
                    (Object.keys(variation)).map((k) => {
                        valObject = {
                            ...valObject,
                            [k] : variation[k]
                        }
                    });
                }

                //Generate and get css
                if( settingsData['css'] && val ) {
                    valObject = {
                        ...valObject,
                        'cssObj' : { ...formData['cssObj'], [key] : cssGenerate(key, val, settingsData) }
                    }
                }
                setFormData({
                    ...formData,
                    ...valObject
                })
            }
        }
        switch(settingsData['type']) {
            case 'checkbox' :
                return <CheckBox {...fieldParams} />
            case 'toggle' :
                return <Toggle {...fieldParams} />
            case 'radio' :
                return <Radio {...fieldParams} />
            case 'text' :
                return <Text {...fieldParams} />
            case 'color' :
                if( settingsData?.fields ) {
                    return (
                        <>
                            <label htmlFor={key} className="qmt-scroll-label">{settingsData['label']}</label>
                            <div className="qmt-scroll-color-group">
                                {
                                    Object.keys(settingsData?.fields).map((fieldKey) => {
                                        let field = settingsData.fields[fieldKey]
                                        let value = formData && fieldKey in formData
                                            ? formData[fieldKey]
                                            : field['default'] ? field['default'] : ''
                                        let setData = (val) => {
                                            let valObject = {[fieldKey]: val}
                                            if( field['css'] && val ) {
                                                valObject = {
                                                    ...valObject,
                                                    'cssObj' : { ...formData['cssObj'], [fieldKey] : cssGenerate(fieldKey, val, field) }
                                                }
                                            }
                                            setFormData({
                                                ...formData,
                                                ...valObject
                                            })
                                        };
                                        return <Color
                                            key={fieldKey}
                                            {...fieldParams}
                                            k={fieldKey}
                                            value={value}
                                            settingsData={field}
                                            setData={setData}
                                        />
                                    })
                                }
                            </div>
                        </>
                    )
                } else {
                    return <Color {...fieldParams} />
                }
            case 'number' :
                return <Number {...fieldParams} />
            case 'dimension' :
                return <Dimension {...fieldParams} />
            case 'icon' :
            case 'select' :
                if (optionKeys.length) {
                    const selectParams = {
                        ...fieldParams,
                        dropDown: dropDown,
                        openDropDown: openDropDown,
                        options: options,
                        optionKeys: optionKeys,
                    }
                    return <Select {...selectParams} />
            }
            case 'typography':
                return <Typography {...fieldParams} />
            case 'container' :
            return settingsData['attr'] &&
                <Fields
                    {...props}
                    settings={settingsData}
                    formData={formData}
                    setFormData={setFormData}
                    dropDown={dropDown}
                    openDropDown={openDropDown}
                />
        }
    }

    const dependCheck = (conditionData) => {
        let dependsValue = formData && conditionData?.key in formData
            ? formData[conditionData?.key]
            : ''

        if( dependsValue !== '' && conditionData?.value !== '' ) {
            if( ! ( conditionData?.value === dependsValue )  ) {
                return false
            }
        }
        return true;
    }
    return (
        <>
            {settings?.attr &&
                Object.keys(settings?.attr).map((key) => {
                    const settingsData = settings?.attr[key];
                    if (settingsData['depends']) {
                        let conditionPassed = false;
                        if(Array.isArray(settingsData['depends'])) {
                            conditionPassed = settingsData['depends'].every((conditionData) => {
                                return dependCheck(conditionData);
                            })
                        }else {
                            conditionPassed = dependCheck(settingsData?.depends);
                        }
                        if(!conditionPassed) {
                            return;
                        }
                    }
                    let noChildAttr = ! settingsData['attr'] && settingsData['type'] !== 'tab';
                    let wrapperClass = `qmt-scroll-field-${settingsData['type']}` + (noChildAttr ? ' qmt-scroll-field' : '');
                    return (
                        <div className={wrapperClass} key={key}>
                            {noChildAttr
                                ? <div className="qmt-scroll-wrap">{fieldContent(key, settingsData)}</div>
                                : fieldContent(key, settingsData)
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default Fields;