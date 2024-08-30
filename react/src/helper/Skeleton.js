import React from 'react';
import "./skeleton.scss"
const Skeleton = (props) => {
    const {type, size, loop, unit, c_s, classes} = props;

    const getSize = () => {
        let css = {}
        switch (type) {
            case 'image':
            case 'circle':
                css = {width: (size ? size + 'px' : '300px'), height: (size ? size + 'px' : '300px')}
                break;
            case 'title':
                css = {width: `${size ? size : '100'}${unit ? unit : '%'}`}
                break;
            case 'button':
                css = {width: (size ? size + 'px' : '90px')}
                break;
            case 'custom_size':
                css = {
                    width: `${c_s.size1 ? c_s.size1 : '100'}${c_s.unit1 ? c_s.unit1 : '%'}`,
                    height: `${c_s.size2 ? c_s.size2 : '20'}${c_s.unit2 ? c_s.unit2 : 'px'}`,
                    borderRadius: (c_s.br ? c_s.br + 'px' : '0px'),
                    display: (c_s.display ? c_s.display : '')
                }
                break;
            default:
                break;
        }
        return css;
    }
    return (
        <>
            {loop ?
                <>
                    {Array(parseInt(loop)).fill('1').map((x, i) => {
                        return (<div key={i}
                                     className={`qmt_scroll_skeleton__${type} qmt_scroll_frequency loop ${classes ? classes : ''}`}
                                     style={getSize()}></div>)
                    })}
                </>
                :
                <div className={`qmt_scroll_skeleton__${type} qmt_scroll_frequency ${classes ? classes : ''}`}
                     style={getSize()}></div>
            }
        </>
    )
};

export default Skeleton;