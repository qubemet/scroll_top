const icons = {};
icons.downArrow = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M14.25 6.375L9 11.625L3.75 6.375" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

icons.minus = <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 9H14.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

icons.plus = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M15.75 9C15.75 9.14918 15.6907 9.29226 15.5852 9.39775C15.4798 9.50324 15.3367 9.5625 15.1875 9.5625H9.5625V15.1875C9.5625 15.3367 9.50324 15.4798 9.39775 15.5852C9.29226 15.6907 9.14918 15.75 9 15.75C8.85082 15.75 8.70774 15.6907 8.60225 15.5852C8.49676 15.4798 8.4375 15.3367 8.4375 15.1875V9.5625H2.8125C2.66332 9.5625 2.52024 9.50324 2.41475 9.39775C2.30926 9.29226 2.25 9.14918 2.25 9C2.25 8.85082 2.30926 8.70774 2.41475 8.60225C2.52024 8.49676 2.66332 8.4375 2.8125 8.4375H8.4375V2.8125C8.4375 2.66332 8.49676 2.52024 8.60225 2.41475C8.70774 2.30926 8.85082 2.25 9 2.25C9.14918 2.25 9.29226 2.30926 9.39775 2.41475C9.50324 2.52024 9.5625 2.66332 9.5625 2.8125V8.4375H15.1875C15.3367 8.4375 15.4798 8.49676 15.5852 8.60225C15.6907 8.70774 15.75 8.85082 15.75 9Z" fill="#6B7280"/>
</svg>;

icons.bold = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M5 3.33331H11.6667C12.5507 3.33331 13.3986 3.6845 14.0237 4.30962C14.6488 4.93474 15 5.78259 15 6.66665C15 7.5507 14.6488 8.39855 14.0237 9.02367C13.3986 9.64879 12.5507 9.99998 11.6667 9.99998H5V3.33331Z"
        stroke="#755E65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path
        d="M5 10H12.5C13.3841 10 14.2319 10.3512 14.857 10.9763C15.4821 11.6014 15.8333 12.4493 15.8333 13.3333C15.8333 14.2174 15.4821 15.0652 14.857 15.6904C14.2319 16.3155 13.3841 16.6667 12.5 16.6667H5V10Z"
        stroke="#755E65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

icons.italic = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.8337 3.33331H8.33366M11.667 16.6666H4.16699M12.2503 3.91665L7.66699 16.1666" stroke="#755E65"
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

icons.underLine = <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M5 2.5V8.33333C5 9.65942 5.52678 10.9312 6.46447 11.8689C7.40215 12.8065 8.67392 13.3333 10 13.3333C11.3261 13.3333 12.5979 12.8065 13.5355 11.8689C14.4732 10.9312 15 9.65942 15 8.33333V2.5"
        stroke="#755E65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.33301 17.5H16.6663" stroke="#755E65" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

icons.success = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="qmt-scroll-toast-animation">
        <circle className="circle" cx="26" cy="26" r="25" fill="none"/>
        <path className="qmt-scroll-toast-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
    </svg>

icons.failed = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="qmt-scroll-toast-animation">
        <circle cx="26" cy="26" r="25" fill="none" className="qmt-scroll-toast-circle qmt-scroll-toast-cross"></circle>
        <path fill="none" d="M 12,12 L 40,40 M 40,12 L 12,40" className="check"></path>
    </svg>
export default icons;