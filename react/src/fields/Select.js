import icons from "../library/icons";

const Select = (props) => {
    const {
        k,
        value,
        settingsData,
        dropDown,
        openDropDown,
        options,
        optionKeys,
        setData
    } = props
    return (
        <>
            <label htmlFor="" className="qmt-scroll-label">{settingsData['label']}</label>
            <div
                className="qmt-scroll-dropdown-container"
                onClick={() => openDropDown(
                    dropDown && dropDown !== k
                        ? k
                        : dropDown && dropDown === k ? '' : k
                )}
            >
                <div className="qmt-scroll-selected">
                    <span className="qmt-text" dangerouslySetInnerHTML={{__html: options[value]}} />
                    <span className="qmt-icon">{icons.downArrow}</span>
                </div>
                {dropDown && dropDown === k &&
                    <div className="qmt-scroll-dropdown">
                        {optionKeys.map((key, index) => {
                            return (
                                <div
                                    className={"qmt-item"+ (value === key ? ' qmt-scroll-active' : '')}
                                    dangerouslySetInnerHTML={{__html: options[key]}}
                                    key={key}
                                    onClick={() => {
                                        setData(key)
                                        openDropDown('')
                                    }}
                                />
                            )
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Select