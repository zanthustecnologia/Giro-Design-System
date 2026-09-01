import React from 'react';

export interface CheckHalfProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  [key: string]: any;
}

const CheckHalf: React.FC<CheckHalfProps> = ({ 
  className = '',
  width = 16,
  height = 16,
  fill = 'white',
  ...restProps
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...restProps}
    >
      <g id="Icons/check_indeterminate_small">
        <path 
          id="icon" 
          d="M3 9V7H13V9H3Z" 
          fill={fill} 
        />
      </g>
    </svg>
  );
};

export default CheckHalf;
