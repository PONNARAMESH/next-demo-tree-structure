"use client"
import dynamic from "next/dynamic";
import { Point } from "react-d3-tree";
const Tree = dynamic(
    () => import('react-d3-tree'),
    { ssr: false }
);

import orgChartJson from "./components/orgChart.json";
import { useCenteredTree } from "./hooks/useCenteredTree";
import { createCustomNodeElement } from "./components/createCustomNodeElement"
import { LegacyRef, useState } from "react";
import "./pageStyles.css";
import { Tooltip } from "antd";
import { MinusSquareFilled, PlusSquareFilled } from "@ant-design/icons";

export default function OrganizationStructure(props: any) {

    const MIN_ZOOM_VALUE = 0.1;
    const MAX_ZOOM_VALUE = 1
    const [translate, containerRef] = useCenteredTree();
    const [modal1Open, setModal1Open] = useState(false);
    const [currentZoomValue, setCurrentZoomValue] = useState<number>(MIN_ZOOM_VALUE * 5);
    const nodeSize = { x: 300, y: 200 };
    const separation = { siblings: 2, nonSiblings: 2 };
    const foreignObjectProps = {
        width: nodeSize.x,
        y: -80,
        height: nodeSize.y,
        x: -130,
    };
    return (

        <div
            className="organizationStructure"
            ref={containerRef as LegacyRef<HTMLDivElement>}
        >
            <div className="graphActions">
                <Tooltip title="Zoom In">
                    <PlusSquareFilled
                        className='editBtm'
                        style={{ fontSize: "24px", color: "white" }}
                        onClick={() => {
                            setCurrentZoomValue(val => {
                                const newZoomValue = val + 0.1;
                                if (newZoomValue > MAX_ZOOM_VALUE) return MAX_ZOOM_VALUE;
                                else return newZoomValue;
                            });
                        }}
                    />
                </Tooltip >
                <Tooltip title="Zoom Out">
                    <MinusSquareFilled
                        className='editBtm'
                        style={{ fontSize: "24px", color: "white" }}
                        onClick={() => {
                            setCurrentZoomValue(val => {
                                const newZoomValue = val - 0.1;
                                if (newZoomValue < MIN_ZOOM_VALUE) return MIN_ZOOM_VALUE;
                                else return newZoomValue;
                            });
                        }}
                    />
                </Tooltip >
            </div>
            <Tree
                data={orgChartJson}
                translate={translate as Point}
                draggable={true}
                nodeSize={{ x: 150, y: 350 }}
                separation={separation}
                transitionDuration={1000}
                pathFunc="step"
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                svgClassName="svg_className"
                renderCustomNodeElement={(rd3tProps) => {
                    // console.log("##rd3tProps: ", rd3tProps);
                    return createCustomNodeElement({ ...rd3tProps, foreignObjectProps, modal1Open, setModal1Open })
                }}
                zoomable={true}
                zoom={currentZoomValue}
                scaleExtent={{
                    min: 0.1,
                    max: 1,
                }}
                orientation="vertical"
            />
        </div>
    )
}