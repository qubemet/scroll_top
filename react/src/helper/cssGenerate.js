const cssGenerate = (key, value, settingsData) => {
    let makeCss = '';
    switch(settingsData['type']) {
        case 'dimension' :
            const unit = settingsData.unit ? settingsData.unit : 'px'
            value = (value?.top || 0) + unit + ' ' + (value?.right || 0) + unit + ' ' + (value?.bottom || 0) + unit + ' ' + (value?.left || 0) + unit
            makeCss = settingsData['css'].replace(new RegExp('{{' + key + '}}', "g"), value);
            break;
        case 'typography' :
            makeCss += settingsData['css'] + " {"
                makeCss += value?.size ? `font-size: ${value.size}px;` : ''
                makeCss += value?.bold ? `font-weight: ${value.bold};` : ''
                makeCss += value?.italic ? `font-style: ${value.italic};` : ''
                makeCss += value?.underline ? `text-decoration: ${value.underline};` : ''
                makeCss += value?.color ? `color: ${value.color};` : ''
            makeCss += "}"
            makeCss += settingsData['css'] + ":hover {"
                makeCss += value?.hover_color ? `color: ${value.hover_color};` : ''
            makeCss += "}"
            break;
        default:
            makeCss = settingsData['css'].replace(new RegExp('{{' + key + '}}', "g"), value);
            break;
    }
    return makeCss
}

const appendCss = (cssObj) => {
    let concatCss = '';

    for (const key in cssObj) {
        concatCss += cssObj[key];
    }
    return concatCss;
}

export {
    cssGenerate,
    appendCss
}