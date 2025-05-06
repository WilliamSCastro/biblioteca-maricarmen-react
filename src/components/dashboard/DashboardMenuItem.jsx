import React from 'react';

export default function InfoItem({ isDark, imageLight, imageDark, altText, label }) {
  return (
    <>
      <img src={isDark ? imageDark : imageLight} alt={altText} />
      <span>{label}</span>
      <span className="end">&#8702;</span>
    </>
  );
}
