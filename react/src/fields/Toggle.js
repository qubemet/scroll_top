const Toggle = (props) => {
    const {
        k,
        value,
        settingsData,
        setData
    } = props
    return (
        <>
            <input
                id={k}
                type="checkbox"
                defaultChecked={value}
                onChange={(e) =>
                    setData(e.target.checked)
                }
                style={{display: 'none'}}
            />
            <span className="qmt-scroll-label">{settingsData['label']}</span>
            <span className="qmt-scroll-toggle-control">
                <label htmlFor={k} className={"qmt-scroll-toggle" + (value ? ' qmt-scroll-toggle-checked' : '')}/>
                {settingsData['desc'] && <span className="qmt-scroll-desc">{settingsData['desc']}</span>}
            </span>
        </>
    )
}

export default Toggle