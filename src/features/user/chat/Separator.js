import React from 'react';
import parse from 'html-react-parser';

const Separator = ({displayText, ref}) => {
	return (
		<p className="separator" ref={ref}><span>{parse(displayText)}</span></p>
	);
};

export default Separator;