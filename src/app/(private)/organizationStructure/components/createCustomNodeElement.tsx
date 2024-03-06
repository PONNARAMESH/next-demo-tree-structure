import { CustomNodeElementProps } from "react-d3-tree";

import { DownCircleFilled, EditFilled, HomeFilled, PlusCircleFilled, UpCircleFilled } from "@ant-design/icons";
import { Modal, Tooltip } from "antd";
export interface ICustomeNode extends CustomNodeElementProps {
    foreignObjectProps: {
        width: number,
        height: number,
        x: number,
        y: number,
    },
    modal1Open: boolean,
    setModal1Open: any;
}
// allow for them to be injected into the SVG namespace.
export function createCustomNodeElement(props: ICustomeNode) {
    // console.log("##nodeDatum: ", nodeDatum);
    const {
        nodeDatum,
        toggleNode,
        foreignObjectProps,
        addChildren,
        modal1Open,
        setModal1Open,
    } = props;

    const handleOk = () => {
        addChildren([
            {
                name: "sampleNode_" + Math.floor(Math.random() * 100),
                attributes: {
                    age: 25,
                },
                children: [],
            }
        ]);
        setModal1Open(false);
    }
    return (
        <>
            <g key={nodeDatum.name}>
                {/* `foreignObject` requires width & height to be explicitly set. */}
                <foreignObject {...foreignObjectProps}>

                    <Modal
                        title="Confirmation"
                        centered
                        open={modal1Open}
                        onOk={() => setModal1Open(false)}
                        onCancel={() => setModal1Open(false)}
                    >
                        <p style={{ fontSize: "20px" }}>Are you really wanna Edit this Node?</p>
                    </Modal>
                    <div
                        style={{ padding: "10px", borderRadius: "10px", }}
                        className="button"
                    >
                        <div className="name">
                            <HomeFilled style={{ fontSize: "24px", color: "white", margin: "10px" }} />
                            {nodeDatum.name}
                        </div>
                        <div className="buttonContainer">

                            <Tooltip title="Edit">
                                <EditFilled
                                    className='editBtm'
                                    style={{ fontSize: "24px", color: "white" }}
                                    onClick={() => {
                                        // alert('You have clicked on EDIT button');
                                        setModal1Open(true)
                                    }}
                                />
                            </Tooltip >
                            {nodeDatum?.__rd3t?.collapsed ? (

                                <DownCircleFilled
                                    className='editBtm'
                                    style={{ fontSize: "24px", color: "white" }}
                                    onClick={() => { toggleNode(); }}
                                />) : (
                                <UpCircleFilled
                                    className='editBtm'
                                    style={{ fontSize: "24px", color: "white" }}
                                    onClick={() => { toggleNode(); }}
                                />
                            )}
                            <PlusCircleFilled
                                className="addNewChildBtn"
                                style={{ fontSize: "24px", color: "white" }}
                                onClick={() => {
                                    // alert('You have clicked on ADD NEW CHILD button');
                                    addChildren([{ "name": "Myriel" }]);
                                    // setModal1Open(true)

                                    addChildren([
                                        {
                                            name: "sampleNode_" + Math.floor(Math.random() * 100),
                                            attributes: {
                                                age: 25,
                                            },
                                            children: [],
                                        }
                                    ]);

                                }}
                            />
                        </div>
                    </div>
                </foreignObject>
                {/* {nodeDatum.children && <circle r={5}></circle>} */}
            </g>
        </>
    )
};