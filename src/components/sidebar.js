
import React, { useRef, useEffect, useState } from 'react'
import { Button, Tooltip, Input, Popover, Slider, Divider, Upload, message, Select } from 'antd';
// import { ChromePicker } from 'react-color'
// import ReactDOM from 'react-dom'
// import { uploadFile } from './uploadImage';
// import CropImage from './cropImage'
// import Editor from "@monaco-editor/react";
import { UploadOutlined, CloseOutlined, FontSizeOutlined, BoldOutlined, AlignCenterOutlined, 
AlignLeftOutlined, AlignRightOutlined, FileImageOutlined, UndoOutlined, RedoOutlined, MenuOutlined, FullscreenOutlined, CodeOutlined,
DownloadOutlined, SaveOutlined, MenuFoldOutlined } from '@ant-design/icons';

const Sidebar = (props) => {
    const [text, settext] = useState(false)


    var __debounce = (cb, delay) => {
        let timeoutID;
        return function (...args) {
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            timeoutID = setTimeout(() => {
                cb(...args)
            }, delay);
        }
    }

    const { setCollapsedParent, applyCssProperty, element, updateText } = props;
    const btnStyle = {
        backgroundColor: '#d6d8d7',
        borderColor: '#d6d8d7',
        color: 'black',
        margin: '5px'
    }


    const collapsedSidebar = {
        transition: 'all 500ms ease-in-out',
        position: 'fixed',
        right: '0px',
        background: 'white',
        minHeight: window.screen.height,
        top: '0px',
        zIndex: 1000,
        border: '1px solid #80808036'
    }

    const collapsedSidebarClosed = {
        width: '0px',
        opacity: 0
    }


    const collapsedSidebarOpned = {
        width: '350px',
        opacity: 1
    }


    const [collapsed, setcollapsed] = useState(props.collapsed)

    useEffect(() => {
        setcollapsed(props.collapsed)
    }, [props.collapsed])



    return (
        <div style={{ padding: '0px' }}>

            <div style={collapsed == true ? { ...collapsedSidebar, ...collapsedSidebarClosed } : { ...collapsedSidebar, ...collapsedSidebarOpned }}>
            <div style={{borderBottom:'1px solid #dddbdb', padding: '5px', display: 'flex', justifyContent: 'space-around', background: 'white' }}>
       
                {/* <Tooltip title="Change Color" placement="leftBottom">
                    <Button
                        onClick={() => {
                            // setModalVisible('add_contact_info')
                            setCollapsedParent(false)
                        }}
                        icon="bg-colors"
                        type="primary"
                        style={btnStyle}
                    >
                    </Button>
                </Tooltip> */}

                {/* <Tooltip title="Change Font Styles" placement="leftBottom">
                    <Button
                        onClick={() => {
                            // setModalVisible('add_social_details')
                            setCollapsedParent(false)
                        }}
                        icon="font-colors"
                        type="primary"
                        style={btnStyle}
                    >
                    </Button>
                </Tooltip> */}

                {/* <Tooltip title="Change Content" placement="leftBottom">
                    <Button
                        onClick={() => {
                            // setModalVisible('add_social_details')
                            setCollapsedParent(false)
                        }}
                        icon="edit"
                        type="primary"
                        style={btnStyle}
                    >
                    </Button>
                </Tooltip> */}

                {/* <Tooltip title="Save & Exit" placement="leftBottom">
                <Button
                    onClick={() => {
                        // setModalVisible('add_social_details')
                        // setCollapsedParent(false)

                    }}
                    icon="save"
                    type="primary"
                    style={btnStyle}
                >
                </Button>
            </Tooltip> */}
                <Tooltip title="Close Sidebar" placement="leftBottom">
                    <Button
                        type="link"
                        style={{fontSize:'20px', color:'black'}}
                        onClick={() => {
                            setCollapsedParent(true)
                        }}
                        icon={<MenuFoldOutlined/>}
                        // type="primary"
                        // style={btnStyle}
                    >
                    </Button>
                </Tooltip>
                     </div>

                <div style={{ padding: '10px' }}>
                    {props.children}
                    {/* <p>Text</p>
                    <TextArea
                        value={element ? element.innerText : ''}
                        onChange={(e) => {
                            // applyCssProperty({type : 'background', value : e.target.value})
                            updateText(e.target.value)
                            settext(x => !x)
                        }} ></TextArea> */}
                    {/* <p>Color </p> */}

                    {/* <input type="color" id="favcolor" name="favcolor"
                        value={element ? element.style.color : ''}
                        onChange={(e) => {
                            applyCssProperty([{ type: 'color', value: e.target.value }])
                        }} >
                    </input> */}

                    {/* <p>Background color </p>
                    <input type="color"
                        onChange={(e) => {
                            applyCssProperty([{ type: 'background', value: e.target.value }])
                        }} >
                    </input> */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar