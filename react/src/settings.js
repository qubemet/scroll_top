const {__} = wp.i18n
const settings =  {
    attr : {
        tab : {
            default: 'settings',
            settings: {
                label: __('Settings', 'qmt-scroll'),
                attr: {
                    container_1: {
                        type: 'container',
                        attr : {
                            enable: {
                                type: 'toggle',
                                label: __('Scroll Top', 'qmt-scroll'),
                                default: false,
                                desc: __('Enable this option to display it on your website', 'qmt-scroll'),
                            },
                            enableIcon: {
                                type: 'toggle',
                                label: __('Enable Icon', 'qmt-scroll'),
                                default: true,
                                variations: {
                                    false : {enableText: true}
                                },
                                desc: __('Enable this option to display icon on button', 'qmt-scroll'),
                            },
                            disableMobile: {
                                type: 'toggle',
                                label: __('Disable On Mobile', 'qmt-scroll'),
                                default: true,
                                desc: __('Enable this option to hide the \'Scroll to Top\' button on mobile devices', 'qmt-scroll'),
                            },
                        }
                    },

                    container_2: {
                        type: 'container',
                        attr: {
                            enableText: {
                                type: 'toggle',
                                label: __('Enable Text', 'qmt-scroll'),
                                default: false,
                                desc: __('Enable this option to display text on button', 'qmt-scroll'),
                            },
                            text: {
                                type: 'text',
                                label: __('Text', 'qmt-scroll'),
                                default: 'Scroll Top',
                                depends: {key: 'enableText', value: true}
                            },
                            scrollIcon: {
                                type: 'icon',
                                label: __('Choose Icon', 'qmt-scroll'),
                                default: 'scroll_1',
                                options: qmt_scroll?.scroll_icons,
                                depends: {key: 'enableIcon', value: true}
                            },
                            iconPosition: {
                                type: 'select',
                                label: __('Icon Position', 'qmt-scroll'),
                                default: 'after_text',
                                options: {
                                    'before_text': __('Before Text', 'qmt-scroll'),
                                    'after_text': __('After Text', 'qmt-scroll'),
                                },
                            },
                            position: {
                                type: 'select',
                                label: __('Scroll Position', 'qmt-scroll'),
                                default: 'right',
                                options: {
                                    'left': __('Left', 'qmt-scroll'),
                                    'right': __('Right', 'qmt-scroll'),
                                },
                            },
                            animation: {
                                type: 'select',
                                label: __('Scroll Animation', 'qmt-scroll'),
                                default: 'fade',
                                options: {
                                    '': __('Select Animation', 'qmt-scroll'),
                                    'fade': __('Fade', 'qmt-scroll'),
                                    'flip': __('Flip', 'qmt-scroll'),
                                    'slide_up': __('Slide Up', 'qmt-scroll'),
                                    'slide_left': __('Slide Left', 'qmt-scroll'),
                                    'slide_right': __('Slide Right', 'qmt-scroll'),
                                },
                            },
                        }
                    },
                },
            },
            style: {
                label: __('Style', 'qmt-scroll'),
                attr: {
                    container_3: {
                        type: 'container',
                        attr: {
                            btnTypo: {
                                type: 'typography',
                                label: __('Typography', 'qmt-scroll'),
                                default: {
                                    size: 12,
                                    bold: false,
                                    italic: false,
                                    underline: false,
                                    color: '#ffffff',
                                    hover_color: '',
                                },
                                css: '.qmt-scroll-wrap .qmt-scroll-content',
                            },
                            padding: {
                                type: 'dimension',
                                label: __('Padding(px)', 'qmt-scroll'),
                                default: {top: 10,bottom: 10,right: 12,left: 12},
                                unit: 'px',
                                min: 0,
                                css: '.qmt-scroll-wrap {padding: {{padding}}; }',
                            },
                            bgColor: {
                                type: 'color',
                                fields: {
                                    buttonBg: {
                                        default : '#373737',
                                        tooltip : __('Normal', 'product-blocks'),
                                        css: '.qmt-scroll-wrap {background-color: {{buttonBg}}; }',
                                    },
                                    buttonHoverBg: {
                                        default : '',
                                        tooltip : __('Hover', 'product-blocks'),
                                        css: '.qmt-scroll-wrap:hover {background-color: {{buttonHoverBg}}; }',
                                    }
                                }
                                ,
                                label: __('Background Color', 'product-blocks'),
                            },
                        }
                    },
                    container_4: {
                        type: 'container',
                        display: 'inline',
                        attr: {
                            iconSize: {
                                type: 'number',
                                label: __('Icon Size(px)', 'qmt-scroll'),
                                default: 18,
                                min: 2,
                                css: '.qmt-scroll-wrap .qmt-scroll-icon svg {width: {{iconSize}}px; height: {{iconSize}}px; }',
                            },
                            btnIconGap: {
                                type: 'number',
                                label: __('Button and Text gap(px)', 'qmt-scroll'),
                                default: 8,
                                min: 2,
                                css: '.qmt-scroll-wrap .qmt-scroll-content {gap: {{btnIconGap}}px; }',
                            },
                            offset: {
                                type: 'number',
                                label: __('Scroll Offset(px)', 'qmt-scroll'),
                                default: 300,
                            },
                            opacity: {
                                type: 'number',
                                label: __('Button Opacity(%)', 'qmt-scroll'),
                                default: 100,
                                css: '.qmt-scroll-wrap {opacity: {{opacity}}%; }',
                            },
                        }
                    },
                }
            },
        }
    }
}

export {
    settings
};