import React from 'react';

export interface CheckSmallProps {
  /** Additional CSS class for custom styling */
  className?: string;
  /** Width of the SVG icon */
  width?: number | string;
  /** Height of the SVG icon */
  height?: number | string;
  /** Fill color for the icon */
  fill?: string;
  /** Additional props passed to the SVG element */
  [key: string]: any;
}

/**
 * CheckSmall icon component for checked checkbox state
 * Displays a checkmark indicating selection
 */
const CheckSmall: React.FC<CheckSmallProps> = ({ 
  className = '',
  width = 12,
  height = 10,
  fill = 'white',
  ...restProps
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 12 10" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...restProps}
    >
      <path 
        d="M4 9.4L0 5.4L1.4 4L4 6.6L10.6 0L12 1.4L4 9.4Z" 
        fill={fill} 
      />
    </svg>
  );
};

export default CheckSmall;