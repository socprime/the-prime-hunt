import React from 'react';

type SpacerProps = {
  height: number;
};

export const Spacer: React.FC<SpacerProps> = ({ height }) => {
  return <div className="spacer" style={{ height }}></div>;
};
