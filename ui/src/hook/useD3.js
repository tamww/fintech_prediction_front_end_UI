import React from 'react';
import * as d3 from 'd3';

/*constant: a hook for the use of d3.py */
export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
      }, dependencies);
    return ref;
}