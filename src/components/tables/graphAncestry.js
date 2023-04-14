import React, { useContext, useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { myContext } from "../../App";

export const GraphAncestry = ({ focusData }) => {
  const { selectedObject, setSelectedObject } = useContext(myContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    focusData && getData();
  }, [focusData]);

  const colors = [
    "#ADB5BD",
    "#4DAA57",
    "#E63946",
    "#F95738",
    "#FFBA08",
    "#212529",
    "#2F6690",
    "#9113A4",
  ];

  const getData = () => {
    let graphData = [["Ancestry", "Value", { role: "style" }]];
    focusData?.entry?.[1]?.resource?.component.map((c, index) => {
      if (c.valueInteger !== 0) {
        graphData.push([
          c.code.coding[0].display,
          c.valueInteger,
          colors[index % colors.length],
        ]);
        setShow(true);
      }
    });
    setData(graphData);
  };

  const options = {
    legend: { position: "none" },
  };

  const renderBar = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Chart
          chartType="ColumnChart"
          data={data}
          options={options}
          width={"100%"}
          height={"250px"}
        />
      </div>
    );
  };

  let sum = 0;
  focusData?.entry?.[1]?.resource?.component.forEach(
    (d) => (sum += d.valueInteger)
  );

  return (
    <>
      <div
        className="graph-ancestry"
        style={{
          height: "fit-content",
          width: "42vw",
          border: "1px solid darkgray",
          textAlign: "center",
          fontSize: ".8rem",
          padding: "12px 0",
        }}
      >
        <b>Ancestry Distribution</b>
        {focusData?.entry?.[1]?.resource?.component ? (
          <>
            <div>Total: {sum}</div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: "0 5px",
                fontSize: ".8rem",
                margin: "9px",
                height: "98px",
              }}
            >
              {focusData?.entry?.[1]?.resource?.component
                ? focusData?.entry?.[1]?.resource?.component.map((c, index) => {
                    if (c.valueInteger !== 0) {
                      return (
                        <>
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div className="display-wrapper">
                              <div
                                className="display"
                                style={{
                                  display: "flex",
                                  flexFlow: "column wrap",
                                  width: "60px",
                                }}
                              >
                                {c.code?.coding[0]?.display}
                              </div>
                              <div className="value-integer">
                                {c.valueInteger}
                              </div>
                            </div>
                            <div
                              className="legend"
                              style={{
                                width: "12px",
                                height: "12px",
                                border: "1px solid darkgray",
                                background: colors[index % colors.length],
                              }}
                            ></div>
                          </div>
                        </>
                      );
                    }
                  })
                : ""}
            </div>{" "}
          </>
        ) : (
          ""
        )}

        {show ? (
          renderBar()
        ) : (
          <>
            <div style={{ marginTop: "28px" }}>No available data</div>
          </>
        )}
      </div>
    </>
  );
};
