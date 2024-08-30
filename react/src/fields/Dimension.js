import React, {useState} from 'react';
const Dimension = (props) => {
    const {
        k,
        value,
        settingsData,
        formData,
        setData
    } = props
    const [lock, setLock] = useState(true);

    const changeValue = (value, position) => {
        setData((lock ? { 'top': value,'right': value,'bottom': value,'left': value } : {...formData[k], [position]: value}))
    }

    return (
        <>
            <label htmlFor={k} className="qmt-scroll-label">{settingsData['label']}</label>
            <div className="qmt-scroll-input-group">
                {['top', 'right', 'bottom', 'left'].map((key, index) => (
                    <span className="qmt-scroll-box" key={index}>
                        <input
                            type="number"
                            value={value[key] || ''}
                            onChange={(e) => changeValue(e.target.value, key)}
                        />
                        <div
                            style={{
                                textTransform: 'uppercase',
                                width: '100%',
                                textAlign: 'center',
                                marginTop: '3px',
                                fontSize: '11px',
                            }}
                        >
                            {key}
                        </div>
                    </span>
                ))}
                <span className="qmt-scroll-box qmt-scroll-lock" onClick={ () => setLock(!lock) }>
                    <span className={"dashicons" + (lock ? ' dashicons-lock' : ' dashicons-unlock')}></span>
                </span>
            </div>
        </>
    )
}

export default Dimension