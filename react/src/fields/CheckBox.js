const CheckBox = (props) => {
    const {
        k,
        value,
        settingsData,
        setData
    } = props
    return (
        <label htmlFor={k} className="qmt-scroll-label">
            {settingsData['label']}
            <input
                id={k}
                type="checkbox"
                defaultChecked={value}
                onChange={(e) =>
                    setData(e.target.checked)
                }
            />
        </label>
    )
}

export default CheckBox