const { __ } = wp.i18n;
import {SketchPicker} from "react-color";
const Color = (props) => {
    const {
        k,
        value,
        settingsData,
        setData,
        parentObj,
        childField,
        colorPicker,
        openColorPicker,
    } = props
    const pickerKey = k +  ( childField ? '_' + childField : '' );
    const handleColorChange = (color) => {
        const rgbCode = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
        setData(childField ? {...parentObj, [childField]: rgbCode} : rgbCode,)
    }
    const resetButton = () => {
        if( childField && settingsData.default?.[childField] === value ) {
            return;
        }else if( settingsData?.default === value ) {
            return;
        }
        return (
            <span
                className="qmt-scroll-reset-settings dashicons dashicons-image-rotate"
                onClick={() => {
                    setData(
                        childField
                        ? {...parentObj, [childField] : value.settingsData?.[childField] }
                        : settingsData?.default
                    )
                }}
            />
        )
    }
    const emptyColor = () => {
        return (
            <div
                className="qmt-scroll-empty-color-wrap"
                onClick={() => {
                    setData(childField ? {...parentObj, [childField] : ''} : '')
                }}
            >
                <span className="qmt-scroll-empty-color"></span>{__('None', 'product-blocks')}
            </div>
        )
    }
    return (
        <>
            <span className="qmt-scroll-color-select">
                <span
                    className="qmt-scroll-color qmt-scroll-tooltip"
                    style={{...(value && {background: value})}}
                    onClick={() => {
                        openColorPicker(
                            colorPicker?.open && colorPicker?.key === pickerKey
                                ? {key: '', open: false}
                                : {key: pickerKey, open: true}
                        )
                    }}
                >
                    {settingsData['tooltip'] &&
                        <span className="qmt-scroll-tooltip-text">{settingsData['tooltip']}</span>
                    }
                </span>
                {colorPicker?.open && colorPicker?.key === pickerKey &&
                    <div className="qmt-scroll-color-popup">
                        <div className="qmt-scroll-top-toolbar">
                            {resetButton()}
                            {emptyColor()}
                        </div>
                        <SketchPicker
                            color={value}
                            onChange={handleColorChange}
                        />
                    </div>
                }
            </span>
        </>
    )
}

export default Color