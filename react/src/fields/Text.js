const Text = (props) => {
    const {
        k,
        value,
        settingsData,
        setData
    } = props
    return (
        <>
            <label htmlFor={k} className="qmt-scroll-label">{settingsData['label']}</label>
            <input
                type="text"
                value={value}
                onChange={(e) =>
                    setData(e.target.value)
                }
            />
        </>
    )
}

export default Text