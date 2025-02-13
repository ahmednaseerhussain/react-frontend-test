import React from 'react';

const MaxWidthWrapper = ({ children, maxWidth = '1200px', padding = '16px' }) => {
  return (
    <div
      style={{
        maxWidth,
        margin: '0 auto',
        padding,
        width: '100%',
        boxSizing: 'border-box',
      }}
      className="px-4 sm:px-6 lg:px-8"
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
