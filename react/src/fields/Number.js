import icons from "../library/icons";

const Number = (props) => {
    const {
        k,
        value,
        settingsData,
        setData,
        parentObj,
        childField
    } = props
    const getValue = (e) => {
        let data = e.target.value;
        if( settingsData.hasOwnProperty('min') && e.target.value < settingsData?.min ) {
            data = settingsData?.min
        }
        data = data < 0 || data === '' ? 0 : data
        return childField && parentObj ? {...parentObj, [childField] : data} : data
    }
    return (
        <>
            {!childField && <label htmlFor={k} className="qmt-scroll-label">{settingsData?.label}</label>}
            <div className="qmt-scroll-input-group">
                <input
                    type="number"
                    value={value ?? 0}
                    onChange={(e) => setData(getValue(e))}
                />
            </div>
        </>
    )
}

export default Number