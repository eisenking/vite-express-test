import { useState } from 'react';

const HeartIcon = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(prevState => !prevState);
  };

  return (
    <svg
      viewBox="0 0 24 24"
      width="32" // Adjust the width here
      height="32" // Adjust the height here
      className={isActive ? 'active' : ''}
      onClick={toggleActive}
    >
      <path
        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
        fill={isActive ? '#f43965' : 'transparent'} // Red color for active, transparent otherwise
        stroke={isActive ? '#f43965' : 'rgba(0,0,0,0.3)'} // Red color for active, light gray otherwise
        strokeWidth="1.2"
        style={{ transition: 'all 0.33s ease' }}
      />
      <path
        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
        fill="transparent"
        stroke="rgba(0,0,0,0.3)"
        strokeWidth="1.2"
        style={{
          transition: 'opacity 0.5s cubic-bezier(.19,2.41,.45,.94)',
          opacity: isActive ? '1' : '0',
          transform: isActive ? 'none' : 'scale(.33)',
          transformOrigin: 'center',
        }}
      />
    </svg>
  );
};

export default HeartIcon;