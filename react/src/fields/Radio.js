const Radio = (props) => {
    const {
        k,
        value,
        settingsData,
        formData,
        setFormData
    } = props
    return (
        <label htmlFor="" className="qmt-scroll-label">
            {settingsData['label']} <input type="radio" value={1}/>
        </label>
    )
}

export default Radio