

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
import Sidebar from './sidebar'

const { TextArea } = Input;
const { Search } = Input;
const { Option } = Select;


let allowedTags = ['H1', 'H2', 'H3', 'H4', 'A', 'DIV', 'P', 'SPAN', 'IMG']
let resizableTags = ['H1', 'H2', 'H3', 'H4', 'A', 'P', 'IMG']


const btnStyleToolbar = {
    backgroundColor: '#d6d8d7',
    borderColor: '#d6d8d7',
    color: 'black',
    margin: '5px'
}

const ReactHtmlEditor = (props) => {
    const { saveAndExit } = props;
    const ref = useRef(null)
    const dynamicRef = useRef(null)


    const [element, setelement] = useState(null)
    const [CurrentElement, setCurrentElement] = useState(null)
    const [collapsed, setcollapsed] = useState(true)
    const [fullSelector, setfullSelector] = useState(null)
    const [elemType, setelemType] = useState(null)
    const [copiedItem, setcopiedItem] = useState(null)
    const [dragged, setdragged] = useState(false)
    const [codeView, setcodeView] = useState(false)
    const [model, setmodel] = useState('')


useEffect(() => {
  setmodel(props.model)
}, [props.model])


    useEffect(() => {
        var tooltipSpan = document.getElementById('tooltip-span');
        // var toolbar = document.getElementById('toolbar');

        let mouseoverListener = function (e) {
            let selectedElement = e.srcElement;
            let tagName = selectedElement.tagName;
            // if(allowedTags.indexOf(tagName) == -1){
            //     return
            // }

            selectedElement.classList.add('react-cust-editor-hover')
            const mouseOutListener = () => {
                selectedElement.classList.remove('react-cust-editor-hover')
                selectedElement.removeAttribute('contentEditable');
                selectedElement.style.removeProperty('resize');
            }
            selectedElement.addEventListener('mouseout', mouseOutListener)
            // selectedElement.removeEventListener('mouseout',mouseOutListener)

            // if(selectedElement.style.backgroundImage){
            //     // console.log('in')
            // }
            setTimeout(() => {
                var x = e.clientX,
                    y = e.clientY;
                tooltipSpan.style.top = (y + 20) + 'px';
                tooltipSpan.style.left = (x + 20) + 'px';
                tooltipSpan.style.display = 'block';
                tooltipSpan.innerText = selectedElement.tagName
            }, 100)
        }
        let clickListener = function (event) {
            setelement(event.srcElement)

            if (event.srcElement.style.backgroundImage) {
                setcollapsed(false)
            }
            // setCurrentElement(event.srcElement)
            setelemType(event.srcElement.tagName)
            attachListenersToElement(event)
            // setfullSelector(fullPath(element))
        }
        let clickListenerAnchors = function (event) {
            event.preventDefault();
            return false
        }

        let workArea = document.getElementById('workArea')
        if (workArea) {
            workArea.addEventListener('mouseover', mouseoverListener);
            workArea.addEventListener('click', clickListener);

            let anchors = workArea.querySelectorAll('a');

            for (const key in anchors) {
                if (Object.hasOwnProperty.call(anchors, key)) {
                    const element = anchors[key];
                    element.addEventListener('click', clickListenerAnchors)
                }
            }
        }
        return () => {
            if (workArea) {
                workArea.removeEventListener('mouseover', clickListener)
                workArea.removeEventListener('click', clickListener)
                let anchors = workArea.querySelectorAll('a');

                for (const key in anchors) {
                    if (Object.hasOwnProperty.call(anchors, key)) {
                        const element = anchors[key];
                        element.removeEventListener('click', clickListenerAnchors)
                    }
                }
            }
        }
    }, []);


    const attachListenersToElement = (event) => {
        var toolbar = document.getElementById('toolbar');
        var x = event.clientX,
            y = event.clientY;

        toolbar.style.top = (y - 120) + 'px';
        toolbar.style.left = (x - 20) + 'px';

        // toolbar.style.top = 0 + 'px';
        // toolbar.style.left = 0 + 'px';

        toolbar.style.display = 'block';

        let elem = event.srcElement;
        // elem.classList.add('react-cust-editor-hover')
        elem.setAttribute('contentEditable', true);
        // elem.style.setProperty('resize', 'both');
        // elem.style.setProperty('overflow', 'auto');

        // elem.setAttribute('draggable', true);

        // elem.addEventListener('click',()=>{
        // elem.classList.add('react-cust-editor-hover')
        // })




        // if(resizableTags.indexOf(elem.tagName) > -1 ){
        let flag = true
        for (const key in elem.childNodes) {
            if (Object.hasOwnProperty.call(elem.childNodes, key)) {
                const element = elem.childNodes[key];
                if (element.childNodes.length > 0) {
                    flag = false
                }
            }
        }
        // if(flag == true){


        // makeResizableDiv('#resizer', elem)
        // }
        // }

        elem.addEventListener('input', () => {
            // updateHtml()
        })
        elem.addEventListener('blur', () => {
            elem.removeAttribute('contentEditable');
            updateHtml()
            // setResize()
            // elem.classList.remove('react-cust-editor-hover')
        })
    }

    // function fullPath(el) {
    //     if (el) {
    //         var names = [];
    //         while (el.parentNode) {
    //             if (el.id) {
    //                 names.unshift('#' + el.id);
    //                 break;
    //             } else {
    //                 if (el == el.ownerDocument.documentElement) names.unshift(el.tagName);
    //                 else {
    //                     for (var c = 1, e = el; e.previousElementSibling; e = e.previousElementSibling, c++);
    //                     names.unshift(el.tagName + ":nth-child(" + c + ")");
    //                 }
    //                 el = el.parentNode;
    //             }
    //         }
    //         return names.join(" > ");
    //     }
    // }


    const setResize = (flag) => {
        applyCssProperty([{ type: 'resize', value: 'both' }, { type: 'overflow', value: 'auto' }])
    }

    const imagePopup = (args, type) => {
 
        return (
            <>
                {args && args.type == 'backgroundImage' &&
                    <p>Background Image</p>
                }
                <Search
                    placeholder="Image Url"
                    enterButton="Done"
                    defaultValue={args && args.url}
                    onSearch={value => {
                        if (!value) {
                            return
                        }
                        replaceImage(value, args, type)
                    }}
                    onChange={(e) => {
                        if (!e.target.value) {
                            return
                        }
                        replaceImage(e.target.value, args, type)
                    }}
                />
                <Divider>Or</Divider>
                <Upload
                    accept=".png, .jpeg, .jpg"
                    onChange={async (e) => {
                        let data = {
                            file: e.file.originFileObj
                        }
                    
                        message.loading()
                        // uploadFile(data)
                            .then((x) => {
                                  
                                replaceImage(x, args, type)
                                message.destroy()
                            }).catch((err) => {
                                console.log(err)
                                message.destroy()
                            })
                    }}>
                    <Button>
                        <UploadOutlined />Click to Upload
                    </Button>
                </Upload>
                {/* {args.type == 'backroundImage' && 
                } */}
            </>
        )
    }


    const deleteElementSelf = () => {
        let elem = element;
        elem.remove()
    }

    const EditingToolbar = () => {
        return (
            <div>
                {elemType != 'IMG' &&
                    <>
                        <Tooltip title="Left Align">
                            <Button
                                onClick={() => {
                                    applyCssProperty([{ type: 'text-align', value: 'left' }])
                                }}
                                icon={<AlignLeftOutlined />}
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip title="Center Align">
                            <Button
                                onClick={() => {
                                    applyCssProperty([{ type: 'text-align', value: 'center' }])
                                }}
                                icon={<AlignCenterOutlined />}
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip title="Right Align">
                            <Button
                                onClick={() => {
                                    applyCssProperty([{ type: 'text-align', value: 'right' }])
                                }}
                                icon={<AlignRightOutlined />}
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>
                        <Tooltip title="Bold">
                            <Button
                                onClick={() => {
                                    applyCssProperty([{ type: 'font-weight', value: 'bold' }])
                                }}
                                icon={<BoldOutlined />}
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>
                        <Popover
                            trigger="click"
                            placement="bottom"
                            content={<div>
                                {/* <Slider
                                    min={1}
                                    max={120}
                                    onAfterChange={(x)=>{
                                        applyCssProperty([{type:'font-size', value: `${x}px`}])
                                    }}
                                /> */}
                                <Select placeholder="Font Size" style={{ width: '80px' }} onChange={(x) => {
                                    applyCssProperty([{ type: 'font-size', value: `${x}px` }])
                                }}>
                                    {[8, 9, 10, 11, 18, 24, 30, 36, 48, 60, 72, 96].map((x) => {
                                        return <Option value={x}>{x}</Option>
                                    })}

                                </Select>
                            </div>}>
                            <Tooltip title="Font Size">
                                <Button
                                    // onClick={() => {
                                    // //    applyCssProperty({type:'font-weight', value:'bold'})
                                    // }}
                                    icon={<FontSizeOutlined />}
                                    type="primary"
                                    style={btnStyleToolbar}
                                >
                                </Button>
                            </Tooltip>
                        </Popover>
                        <Popover
                            trigger="click"
                            placement="bottom"
                            content={<div>
                                   {imagePopup(null, 'append')}
                            </div>}>
                            <Tooltip title="Add Media">
                                <Button
                                    icon={<FileImageOutlined/>}
                                    type="primary"
                                    style={btnStyleToolbar}
                                >
                                </Button>
                            </Tooltip>
                        </Popover>
                        <Tooltip title="Delete">
                            <Button
                                onClick={() => {
                                    deleteElementSelf()
                                }}
                                icon={<CloseOutlined />}
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>

                        {/* <Tooltip title="Underline">
                <Button
                    onClick={() => {
                       applyCssProperty({type:'font-weight', value:'bold'})
                    }}
                    icon="bold"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}

                    </>
                }
                {elemType == 'IMG' &&
                    <>
                        {/* <Tooltip title="Left align Image">
                <Button
                    onClick={() => {
                       applyCssProperty([{type:'display', value:'block'},{type:'margin', value:'auto'}])
                    }}
                    icon="pic-left"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}
                        {/* <Tooltip title="Center Align Image">
                <Button
                    onClick={() => {
                       applyCssProperty([{type:'display', value:'block'}])
                    }}
                    icon="pic-center"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}
                        {/* <Tooltip title="Right Align Image">
                <Button
                    onClick={() => {
                       applyCssProperty([{type:'display', value:'block'}])
                    }}
                    icon="pic-right"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}
                        <Popover
                            placement="bottom"
                            content={<div>
                                {imagePopup()}
                            </div>}>
                            <Tooltip title="Upload New Image">
                                <Button
                                    onClick={() => {

                                    }}
                                    icon="swap"
                                    type="primary"
                                    style={btnStyleToolbar}
                                >
                                </Button>
                            </Tooltip>
                        </Popover>
                        <Tooltip title="Delete">
                            <Button
                                onClick={() => {
                                    deleteElementSelf()
                                }}
                                icon="close"
                                type="primary"
                                style={btnStyleToolbar}
                            >
                            </Button>
                        </Tooltip>

                    </>}
                {/* <Tooltip title="Sidebar">
                <Button
                    onClick={() => {
                       applyAttribute([{type:'draggable',value: true}])
                    }}
                    icon="drag"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip>  */}
                {/* <Tooltip title="Sidebar">
                <Button
                    onClick={() => {
                       setcollapsed(false)
                    }}
                    icon="menu"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}
                {/* <Tooltip title="Copy Element">
                <Button
                    onClick={() => {
                       copyItem()
                    }}
                    icon="copy"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip>
              <Tooltip title="Paste Element">
                <Button
                    onClick={() => {
                       pasetItem()
                    }}
                    icon="file"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}

                {/* <Tooltip title="Resize">
                <Button
                    onClick={() => {
                    //    setResize(true)
                    }}
                    icon="arrows-alt"
                    type="primary"
                    style={btnStyleToolbar}
                >
                </Button>
            </Tooltip> */}
            </div>
        )
    }


    useEffect(() => {
        if (element) {
            // element.style.setProperty('color', 'red', 'important');
            // setcollapsed(false)
            // console.log('---', element);
            // makeResizableDiv('#resizer', element, 'removeListener')
        }
    }, [element])

    const replaceImage = (img, args, type) => {
        let elem = element;

        if(type == 'append'){
            let imgElem = document.createElement('img')
            imgElem.src = img
            elem.appendChild(imgElem)
        }
        if (args && args.type == 'backgroundImage') {
            elem.style.setProperty('background-image', `url(${img})`)
        } else {
            if (elem.tagName == 'IMG') {
                elem.src = img
            }
        }

        updateHtml()
    }

    // const copyItem = () =>{
    //     setcopiedItem(element)
    // }

    const pasetItem = () => {
        console.log(element, copiedItem)
        console.log(copiedItem instanceof HTMLElement)
        // element.appendChild(copiedItem)
        element.insertAdjacentElement('beforebegin', copiedItem);
    }

    const applyAttribute = (args) => {
        let val = args[0]
        element.setAttribute(val.type, val.value);
        element.removeAttribute('contenteditable');

    }

    const applyCssProperty = (arr) => {
        // element.style.setProperty(property.type, property.value, 'important');
        // let elem = document.querySelector(fullPath(element))
        let elem = element;
    
        if (!elem) {
            return
        }
        for (let i = 0; i < arr.length; i++) {
            let property = arr[i]

            let defaultValue = elem.style[property.type];

            if (elem) {
                if (defaultValue && defaultValue == property.value) {
                    elem.style.removeProperty(property.type);
                } else {
                    elem.style.setProperty(property.type, property.value, 'important');
                }
            }
            updateHtml()
        }
    }

    const getHtml = () =>{
        if(!ref.current){
            return
        }
            let html = ref.current.innerHTML;
            let div = document.createElement('div');
            div.innerHTML = html;
            let elems = div.querySelectorAll("[contenteditable]");
            for (const key in elems) {
                if (Object.hasOwnProperty.call(elems, key)) {
                    const element = elems[key];
                    element.removeAttribute('contenteditable')
                    console.log(element)
                }
            }

            let elemsResize = div.querySelectorAll('[style*="resize=true"]');
            for (const key in elemsResize) {
                if (Object.hasOwnProperty.call(elemsResize, key)) {
                    const element = elemsResize[key];
                    element.style.removeProperty('resize')
                    console.log(element)
                }
            }
            return div.innerHTML
    }

    const updateHtml = () => {
        if (props.updateHtmlBlocks && ref && ref.current) {
            // let html = ref.current.innerHTML;
            // let div = document.createElement('div');
            // div.innerHTML = html;
            // let elems = div.querySelectorAll("[contenteditable]");
            // for (const key in elems) {
            //     if (Object.hasOwnProperty.call(elems, key)) {
            //         const element = elems[key];
            //         element.removeAttribute('contenteditable')
            //         console.log(element)
            //     }
            // }

            // let elemsResize = div.querySelectorAll('[style*="resize=true"]');
            // for (const key in elemsResize) {
            //     if (Object.hasOwnProperty.call(elemsResize, key)) {
            //         const element = elemsResize[key];
            //         element.style.removeProperty('resize')
            //         console.log(element)
            //     }
            // }

            let innerHTML = getHtml()
            props.updateHtmlBlocks(innerHTML)
        }
    }

    const updateText = (text) => {
        // let elem = document.querySelector(fullPath(element))
        // if (elem) {
        //     elem.innerText = text
        // }
        // if (props.updateHtmlBlocks) {
        //     props.updateHtmlBlocks(ref.current.innerHTML)
        // }
    }


    const makeResizableDiv = (div, elem, type) => {
        function offset(el) {
            var rect = el.getBoundingClientRect(),
                scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        }
        var divOffset = offset(elem);
        let elemBound = elem.getBoundingClientRect()


        const selectedElement = elem;

        let resizerhtml = `<div id="resizer">
                <div class="resizers top-left"></div>
				<div class="resizers top-right"></div>
				<div class="resizers bottom-right"></div>
				<div class="resizers bottom-left"></div>
            </div>`
        var div1 = document.getElementById('resizerWrapper');
        div1.innerHTML = resizerhtml

        const element = div1.querySelector(div);
        let resizer = document.getElementById('resizer');

        resizer.style.setProperty('display', 'block')
        resizer.style.setProperty('top', (divOffset.top - 100) + 'px')
        resizer.style.setProperty('left', divOffset.left + 'px')
        resizer.style.setProperty('width', elemBound.width + 'px')
        resizer.style.setProperty('height', elemBound.height + 'px')
        const resizers = div1.querySelectorAll(div + ' .resizers')

        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;

        for (let i = 0; i < resizers.length; i++) {
            const currentResizer = resizers[i];
            const mouseDownListener = (e) => {
                e.preventDefault()
                original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
                original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
                original_x = element.getBoundingClientRect().left;
                original_y = element.getBoundingClientRect().top;
                original_mouse_x = e.pageX;
                original_mouse_y = e.pageY;
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            }
            currentResizer.addEventListener('mousedown', mouseDownListener)
            currentResizer.addEventListener('mouseup', () => {
                console.log('==== mouseup')
                currentResizer.removeEventListener('mousedown', mouseDownListener)
            })
            currentResizer.addEventListener('mouseout', () => {
                currentResizer.removeEventListener('mousedown', mouseDownListener)
            })


            function resize(e) {
                if (currentResizer.classList.contains('bottom-right')) {
                    const width = original_width + (e.pageX - original_mouse_x);
                    const height = original_height + (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        selectedElement.style.width = width + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        selectedElement.style.height = height + 'px'
                    }
                }
                else if (currentResizer.classList.contains('bottom-left')) {
                    const height = original_height + (e.pageY - original_mouse_y)
                    const width = original_width - (e.pageX - original_mouse_x)
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        selectedElement.style.height = height + 'px'

                    }
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                        selectedElement.style.width = width + 'px'
                        //   selectedElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                }
                else if (currentResizer.classList.contains('top-right')) {
                    const width = original_width + (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        selectedElement.style.width = width + 'px'

                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                        selectedElement.style.height = height + 'px'
                        //   selectedElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
                else {
                    const width = original_width - (e.pageX - original_mouse_x)
                    const height = original_height - (e.pageY - original_mouse_y)
                    if (width > minimum_size) {
                        element.style.width = width + 'px'
                        element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                        selectedElement.style.width = width + 'px'
                        //   selectedElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
                    }
                    if (height > minimum_size) {
                        element.style.height = height + 'px'
                        element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                        selectedElement.style.height = height + 'px'
                        //   selectedElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
                    }
                }
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }
    }


    // const makeResizableDiv = (elem)=> {
    //     console.log(elem)
    //     let selectedElement = elem;

    //     const minimum_size = 20;
    //     let original_width = 0;
    //     let original_height = 0;
    //     let original_x = 0;
    //     let original_y = 0;
    //     let original_mouse_x = 0;
    //     let original_mouse_y = 0;
    //     const element = document.querySelector('#resizer');
    //     const resizers = document.querySelectorAll('#resizer' + ' .resizers')
    //     for (let i = 0;i < resizers.length; i++) {
    //         const currentResizer = resizers[i];
    //         currentResizer.addEventListener('mousedown', function(e) {
    //             e.stopPropagation()
    //             original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
    //             original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
    //             original_x = element.getBoundingClientRect().left;
    //             original_y = element.getBoundingClientRect().top;
    //             original_mouse_x = e.pageX;
    //             original_mouse_y = e.pageY;
    //             currentResizer.addEventListener('mousemove', resize)
    //             currentResizer.addEventListener('mouseup', stopResize)
    //             currentResizer.addEventListener('mouseout', stopResize)

    //         })
    //         function stopResize() {
    //             currentResizer.removeEventListener('mousemove', resize)
    //         }

    //         function resize(e) {
    //             if (currentResizer.classList.contains('bottom-right')) {
    //                 element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
    //             }
    //             // if (currentResizer.classList.contains('bottom-right')) {
    //             //     const width = original_width + (e.pageX - original_mouse_x);
    //             //     const height = original_height + (e.pageY - original_mouse_y)
    //             //     if (width > minimum_size) {
    //             //         element.style.width = width + 'px'
    //             //         // selectedElement.style.width = width +'px'
    //             //     }
    //             //     if (height > minimum_size) {
    //             //         element.style.height = height + 'px'
    //             //         // selectedElement.style.height = height +'px'
    //             //     }
    //             // }
    //             // else if (currentResizer.classList.contains('bottom-left')) {
    //             //     const height = original_height + (e.pageY - original_mouse_y)
    //             //     const width = original_width - (e.pageX - original_mouse_x)
    //             //     if (height > minimum_size) {
    //             //         element.style.height = height + 'px'
    //             //         // selectedElement.style.height = height +'px'
    //             //     }
    //             //     if (width > minimum_size) {
    //             //         element.style.width = width + 'px'
    //             //         element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             //         // selectedElement.style.width = width +'px'
    //             //         // selectedElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             //     }
    //             // }
    //             // else if (currentResizer.classList.contains('top-right')) {
    //             //     const width = original_width + (e.pageX - original_mouse_x)
    //             //     const height = original_height - (e.pageY - original_mouse_y)
    //             //     if (width > minimum_size) {
    //             //         element.style.width = width + 'px'
    //             //         // selectedElement.style.width = width +'px'
    //             //     }
    //             //     if (height > minimum_size) {
    //             //         element.style.height = height + 'px'
    //             //         element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             //         // selectedElement.style.height = height +'px'
    //             //         // selectedElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             //     }
    //             // }
    //             // else {
    //             //     const width = original_width - (e.pageX - original_mouse_x)
    //             //     const height = original_height - (e.pageY - original_mouse_y)
    //             //     if (width > minimum_size) {
    //             //         element.style.width = width + 'px'
    //             //         element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             //         // selectedElement.style.width = width + 'px'
    //             //         // selectedElement.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
    //             //     }
    //             //     if (height > minimum_size) {
    //             //         element.style.height = height + 'px'
    //             //         element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             //         // selectedElement.style.height = height + 'px'
    //             //         // selectedElement.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
    //             //     }
    //             // }
    //         }
    //     }
    // }

    // let tooltip = document.getElementById('tooltip-span')

    const downloadHtml = () =>{
        let innerHTML = getHtml()
        var element = document.createElement('a');
        element.setAttribute('href','data:text/plain;charset=utf-8, ' + encodeURIComponent(innerHTML));
        element.setAttribute('download', 'index.html');
        document.body.appendChild(element);
        element.click();
    }

    return (
        <div style={{ border: '1px solid #cbcbcb' }} >
            {/* <CropImage src={'https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs/draws/sync.svg'} crop={{aspect: 16 / 9}} onChange={newCrop => {
            console.log(newCrop)
        }} /> */}

            <div id="tooltip-span"
                style={{
                    background: 'grey', padding: '5px 10px',
                    borderRadius: '5px', color: 'white', position: 'fixed',
                    zIndex: '10000', display: 'none', fontSize: '12px'
                }}>
            </div>
            <div id="toolbar"
                onMouseOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                }}
                style={{
                    background: 'grey', padding: '5px 5px',
                    borderRadius: '5px', color: 'white', position: 'fixed',
                    zIndex: '10000', display: 'none', fontSize: '12px'
                }}>
                <EditingToolbar />
            </div>
            <div style={{ zIndex: 2000, borderBottom:'1px solid #dddbdb', padding: '5px', display: 'flex', justifyContent: 'space-around', background: '#2c2c2c' }} >
                <Tooltip title="Undo">
                    <Button
                        style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<UndoOutlined/>}
                        onClick={() => {
                          
                        }}></Button>
                </Tooltip>
                <Tooltip title="Redo">
                    <Button
                        style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<RedoOutlined/>}
                        onClick={() => {
                         
                        }}></Button>
                </Tooltip>
                  <Tooltip title="Additional Options">
                    <Button
                       style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<MenuOutlined/>}
                        onClick={() => {
                           setcollapsed(flag=>!flag)
                        }}></Button>
                </Tooltip>
                   <Tooltip title="Full Screen">
                    <Button
                       style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<FullscreenOutlined/>}
                        onClick={() => {
                           
                        }}></Button>
                </Tooltip>
                   <Tooltip title="Code View">
                    <Button
                       style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<CodeOutlined/>}
                        onClick={() => {
                           setcodeView(code=>!code)
                        }}></Button>
                </Tooltip>
                   <Tooltip title="Download Html">
                    <Button
                       style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<DownloadOutlined/>}
                        onClick={() => {
                           downloadHtml()
                        }}></Button>
                </Tooltip>
                   {/* <Tooltip title="Upload Html">
                    <Button
                       style={{fontSize: '20px'}}
                        type="link"
                        icon="upload"
                        onClick={() => {
                           
                        }}></Button>
                </Tooltip> */}
                <Tooltip title="Save">
                    <Button
                       style={{fontSize: '20px', color:'white'}}
                        type="link"
                        icon={<SaveOutlined/>}
                        onClick={() => {
                            updateHtml()
                            saveAndExit()
                        }}></Button>
                </Tooltip>

            </div>


            <Sidebar
                collapsed={collapsed}
                setCollapsedParent={setcollapsed}
                applyCssProperty={applyCssProperty}
                element={element}
            // updateText={updateText} 
            >

                {element &&
                    imagePopup({ type: 'backgroundImage', url: element.style.getPropertyValue('background-image').replace('url', '').replace('(', '').replace(')', '').replaceAll('"', '') })
                }

            </Sidebar>

            <div id="resizerWrapper"></div>

            <div id="workArea" style={{minHeight:'300px', overflow:'auto'}}>
            {codeView == true ? 
            //   <Editor
            //     height="70vh"
            //     width="100%"
            //     defaultLanguage="html"
            //     defaultValue={getHtml()}
            //     onChange={(x)=>{
            //         setmodel(x)
            //     }}
            //     theme="vs-dark"
            //     // options={ops}
            //     />
            <input value={getHtml()}></input>
            :
                <div
                style={{minHeight:'300px'}}
                    contentEditable={true} 
                    ref={ref}
                    dangerouslySetInnerHTML={{ __html: model }}
                    onDrop={(e) => {
                        // console.log(e)
                    }}
                ></div>
            }
            </div>
        </div>
    )
}

export default ReactHtmlEditor;

