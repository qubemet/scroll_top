const {__} = wp.i18n
import React, {useState, useEffect} from 'react'
import Fields from "./fields/Fields"
import {settings} from "./settings"
import {cssGenerate, appendCss} from "./helper/cssGenerate";
import Skeleton from "./helper/Skeleton";
import Toast from "./helper/Toast";

const Dashboard = () => {
    const url = new URL(window.location);
    const [activeTab, setActiveTab] = useState(
        url.searchParams.get('tab')
            ? url.searchParams.get('tab')
            : settings?.attr?.tab?.default
    );
    const [formData, setFormData] = useState({})
    const [dropDown, openDropDown] = useState('')
    const [isSaving, setSaving] = useState(false)
    const [loading, setLoading] = useState(false)
    const [colorPicker, openColorPicker] = useState({key: '', open: false});
    const [toastMessages, setToastMessages] = useState({
        state: false,
        messages: [],
        status: ''
    });
    let settingsData = settings?.attr?.tab[activeTab]

    url.searchParams.set('tab', activeTab);
    history.pushState('', '', url);

    useEffect(() => {
        getAllSettings()
    }, [])

    let defaultCss = ''
    const defaultSettings = (obj, prev = '') => {
        let defaultObj = {};
        for (let k in obj) {
            if (typeof obj[k] === 'object' && k !== 'default') {
                defaultObj = {...defaultObj, ...defaultSettings(obj[k], k)};
            }
            if (prev && k === 'default' && !settings.hasOwnProperty(prev)) {
                defaultObj[prev] = obj[k];
                if( obj['css'] && obj[k] ) {
                    defaultCss = {...defaultCss, [prev] : cssGenerate(prev, obj[k], obj)} ;
                }
            }
        }
        if( Object.keys(defaultCss).length > 0 ) {
            defaultObj['cssObj'] = defaultCss;
        }
        return defaultObj;
    }

    const dashboardClick = (e) => {
        if( dropDown && e.target.closest('.qmt-scroll-field-select .qmt-scroll-container') === null ) {
            openDropDown('')
        }
        if( colorPicker?.open && e.target.closest('.qmt-scroll-color-select') === null ) {
            openColorPicker({key: '', open: false})
        }
    }

    const getAllSettings = () => {
        wp.apiFetch({
            path: '/qmt_scroll/v2/get_all_settings',
            method: 'POST',
        })
        .then((res) => {
            if(res.success) {
                setFormData({...defaultSettings(settings),...res.settings})
                setLoading(true)
            }
        })
    }

    const formSubmit = (e) => {
        e.preventDefault()
        setSaving(true)
        let finalFormData =  { ...formData }
        finalFormData['css'] = appendCss(formData['cssObj'])
        delete finalFormData.tab
        delete finalFormData.cssObj
        wp.apiFetch({
            path: '/qmt_scroll/v2/save_settings',
            method: 'POST',
            data: {
                settings: finalFormData,
                wpnonce: qmt_scroll.security,
                type: 'type'
            }
        })
        .then( response => {
            setSaving(false)
            setToastMessages({
                status: 'success',
                messages: [response.message],
                state: true
            });
        } )
        .catch( error => {
            setSaving(false)
        } );
    }

    return (
        <div onClick={(e)=> dashboardClick(e)}>
            <div className="qmt-scroll-header">
                <div className="qmt-scroll-site-info">
                    <span className="qmt-scroll-name">{__('Scroll Top', 'qmt-scroll')}</span>
                    <span className="qmt-scroll-version">{qmt_scroll.version}</span>
                </div>
                <div className="qmt-scroll-tabs">
                    { settings?.attr?.tab &&
                        Object.keys(settings?.attr?.tab).map((key) => {
                            let tab = settings?.attr?.tab[key]
                            return (
                                <span
                                    className={"qmt-scroll-tab" + (activeTab === key ?' qmt-scroll-active' : '')}
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                >
                                    {tab.label}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
            <div className="qmt-scroll-body">
                <form
                    action=""
                    onSubmit={(e) => formSubmit(e)}
                >
                    <div className="qmt-scroll-tab-content">
                        <div className="qmt-scroll-fields">
                            {loading ?
                                <Fields
                                    settings={settingsData}
                                    formData={formData}
                                    setFormData={setFormData}
                                    dropDown={dropDown}
                                    openDropDown={openDropDown}
                                    colorPicker={colorPicker}
                                    openColorPicker={openColorPicker}
                                />
                                :
                                <div className="qmt-scroll-field-container">
                                    {Array(4).fill(1).map((val, k) => {
                                        return (
                                            <div className="qmt-scroll-field-toggle qmt-scroll-field" key={k}>
                                                <div className="qmt-scroll-wrap">
                                                    <Skeleton type="custom_size" c_s={{
                                                        size1: 150,
                                                        unit1: 'px',
                                                        size2: 25,
                                                        unit2: 'px',
                                                        br: 4
                                                    }}/>
                                                    <span className="qmt-scroll-toggle-control">
                                                    <Skeleton type="custom_size" c_s={{
                                                        size1: 60,
                                                        unit1: 'px',
                                                        size2: 20,
                                                        unit2: 'px',
                                                        br: 4
                                                    }}/>
                                                    <Skeleton type="custom_size" c_s={{
                                                        size1: 300,
                                                        unit1: 'px',
                                                        size2: 20,
                                                        unit2: 'px',
                                                        br: 4
                                                    }}/>
                                                </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>

                        <div className="qmt-scroll-action">
                            <div>
                                <div className="qmt-scroll-action-header">{__('Action', 'qmt-scroll')}</div>
                                <div className="qmt-scroll-action-body">
                                    {loading ?
                                        <button type="submit" className="qmt-scroll-save">
                                            {isSaving &&
                                                <span className="dashicons dashicons-update qmt-scroll-loading"></span>
                                            }
                                            {__('Save Changes', 'qmt-scroll')}
                                        </button>
                                        :
                                        <Skeleton type="custom_size" c_s={{size1: 110, unit1: 'px', size2: 35, unit2: 'px', br: 4}}/>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="qmt-scroll-action-header">{__('Support', 'qmt-scroll')}</div>
                                <ul className="qmt-scroll-action-body qmt-scroll-support-body">
                                    <li>
                                        {__('Have any issues? For quick support you can', 'qmt-scroll')}
                                        <a
                                            target="_blank"
                                            href="https://qubemet.com/contact/"
                                        >
                                            {__('Contact', 'qmt-scroll')}
                                        </a>Here.
                                    </li>
                                    <li>
                                        {__('You can direct contact through email', 'qmt-scroll')}: <strong>support@qubemet.com</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="qmt-scroll-footer">

            </div>
            { toastMessages.state && (
                <Toast
                    delay={2000}
                    toastMessages={toastMessages}
                    setToastMessages={setToastMessages}
                />
            )}
        </div>
    )
}

export default Dashboard