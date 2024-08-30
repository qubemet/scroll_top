const { __ } = wp.i18n;
import Number from "./Number";
import Color from "./Color";
import icons from "../library/icons";
const Typography = (props) => {
    const {
        k,
        value,
        settingsData,
        setData
    } = props;
    props = {...props, parentObj: value}
    return (
        <>
            <label htmlFor={k} className="qmt-scroll-label">{settingsData['label']}</label>
            <div className="qmt-scroll-typo-field">
                {
                    <Number
                        {...{
                            ...props,
                            childField: 'size',
                            value: value?.size,
                        }}
                    />
                }
                <div className="qmt-scroll-tools-item">
                    <span
                        className={"qmt-scroll-tooltip" + (value?.bold ? " qmt-scroll-active" : '')}
                        onClick={() =>
                            setData({...value, bold : ! value?.bold})
                        }
                    >
                        {icons.bold}
                        <span className="qmt-scroll-tooltip-text">{__('Bold', 'qmt-scroll')}</span>
                    </span>
                    <span
                        className={"qmt-scroll-tooltip" + (value?.italic ? " qmt-scroll-active" : '')}
                        onClick={() =>
                            setData({...value, italic: !value?.italic})
                        }
                    >
                        {icons.italic}
                        <span className="qmt-scroll-tooltip-text">{__('Italic', 'qmt-scroll')}</span>
                    </span>
                    <span
                        className={"qmt-scroll-tooltip" + (value?.underline ? " qmt-scroll-active" : '')}
                        onClick={() =>
                            setData({...value, underline: !value?.underline})
                        }
                    >
                        {icons.underLine}
                        <span className="qmt-scroll-tooltip-text">{__('Underline', 'qmt-scroll')}</span>
                    </span>
                </div>
                <div className="qmt-scroll-color-group">
                    <Color
                        {...{
                            ...props,
                            childField: 'color',
                            value: value?.color,
                            settingsData: {
                                tooltip: __('Normal', 'qmt-scroll')
                            }
                        }}
                    />
                    <Color
                        {...{
                            ...props,
                            childField: 'hover_color',
                            value: value?.hover_color,
                            settingsData: {
                                tooltip: __('Hover', 'qmt-scroll')
                            }
                        }}
                    />
                </div>
            </div>
        </>
    )
}
export default Typography