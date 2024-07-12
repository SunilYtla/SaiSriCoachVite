// Collapsible.tsx
import React, { useState } from "react";

interface CollapsibleProps {
  items1: string[];
  items2: string[];
  items3: string[];
  headings: string[];
  initialState?: "expanded" | "collapsed";
}

const Collapsible: React.FC<CollapsibleProps> = ({
  items1,
  items2,
  items3,
  headings,
  initialState = "collapsed",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initialState === "collapsed");

  return (
    <div className="border rounded-md shadow-md -m-2 p-1">
      <button
        className="w-full text-left font-semibold py-2 px-4 bg-blue-500 text-white rounded-t-md"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Show Items" : "Hide Items"}
      </button>
      {!isCollapsed && (
        <div className=" grid grid-cols-3">
          {headings.map((heading, index) => (
            <div key={index}>
              <h2 className="text-lg  font-semibold mb-2 px-2">{heading}</h2>
              <ul>
                {index === 0 &&
                  items1.map((item, idx) => (
                    <li key={idx} className="px-2 py-1">
                      {item}
                    </li>
                  ))}
                {index === 1 &&
                  items2.map((item, idx) => (
                    <li key={idx} className=" py-1 px-2">
                      {item}
                    </li>
                  ))}
                {index === 2 &&
                  items3.map((item, idx) => (
                    <li key={idx} className="py-1 px-2">
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
