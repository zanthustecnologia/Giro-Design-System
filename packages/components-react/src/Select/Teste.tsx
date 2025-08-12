// No Select.tsx:
const [fieldWidth, setFieldWidth] = useState<number>(210);

useLayoutEffect(() => {
  if (fieldRef.current) {
    const width = fieldRef.current.offsetWidth;
    setFieldWidth(width);
    // ✅ Define CSS custom property
    fieldRef.current.style.setProperty('--select-width', `${width}px`);
  }
}, []);

return (
  <div 
    className="zds-select" 
    ref={selectRef}
    style={{ '--select-width': `${fieldWidth}px` } as React.CSSProperties}
  >
    <SelectField ref={fieldRef} {...props} />
    {isOpen && (
      <div className="zds-select__dropdown">
        <Dropdown {...dropdownProps} />
      </div>
    )}
  </div>
);