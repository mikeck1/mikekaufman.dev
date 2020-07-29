import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        const html = "<p>Hey this <strong>editor</strong> rocks 😀</p>";
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState
            };
        }
    }
    onEditorStateChange: Function = editorState => {

        // console.log(draftToHtml(editorState))
        this.setState({
            editorState: editorState
        });

    };

    // onCreate: Function = editor => {

    //     const timestamp = Date.now();
    //     console.log(timestamp)
    //     const dt_pretty = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp);

    //     const dbb = db.firestore()
    //     dbb.collection('projects').add({ title: "mkkj", image: "kl", body: draftToHtml(convertToRaw(this.editorState.getCurrentContent())), timestamp: timestamp, timestamp_pretty: dt_pretty });
    // };
    // onEditorStateChange(editorState) {
    //   this.setState({
    //     editorState
    //   });
    // }


    render() {



        return (
            <div>
                <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
                <textarea
                    disabled
                    value={draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))}
                />
                <button onClick={this.props.callback.bind()}>Save</button>
                <button>Publish</button>
            </div>
        );
    }
}



// import React from "react";
// import Editor from 'draft-js-plugins-editor';
// import createImagePlugin from 'draft-js-image-plugin';
// // import Draft, { Editor, EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
// import Draft, { EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
// import { stateToHTML } from "draft-js-export-html";
// import { stateFromHTML } from 'draft-js-import-html';



// import "./rich.css";
// const imagePlugin = createImagePlugin();
// const plugins = [imagePlugin];
// class ExampleEditor extends React.Component {
//     constructor(props) {
//         super(props);
//         let contentState = stateFromHTML(props.body);
//         this.state = { editorState: EditorState.createWithContent(contentState) };
//         this.focus = () => this.refs.editor.focus();
//         this.onChange = editorState => this.setState({ editorState });
//         this.handleKeyCommand = this._handleKeyCommand.bind(this);
//         this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
//         this.toggleBlockType = this._toggleBlockType.bind(this);
//         this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
//         this.onChange = editorState => {
//             this.setState({
//                 editorState,
//                 editorContentHtml: stateToHTML(editorState.getCurrentContent())
//             });
//         };
//     }
//     _handleKeyCommand(command, editorState) {
//         const newState = RichUtils.handleKeyCommand(editorState, command);
//         if (newState) {
//             this.onChange(newState);
//             return true;
//         }
//         return false;
//     }
//     _mapKeyToEditorCommand(e) {
//         if (e.keyCode === 9 /* TAB */) {
//             const newEditorState = RichUtils.onTab(
//                 e,
//                 this.state.editorState,
//                 4 /* maxDepth */
//             );
//             if (newEditorState !== this.state.editorState) {
//                 this.onChange(newEditorState);
//             }
//             return;
//         }
//         return getDefaultKeyBinding(e);
//     }
//     _toggleBlockType(blockType) {
//         this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
//     }
//     _toggleInlineStyle(inlineStyle) {
//         this.onChange(
//             RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
//         );
//     }

//     render() {

//         return (
//             <div>
//                 <div className="editor-container" style={{ border: "1px solid #000" }}>
//                     <BlockStyleControls
//                         editorState={this.state.editorState}
//                         onToggle={this.toggleBlockType}
//                     />
//                     <InlineStyleControls
//                         editorState={this.state.editorState}
//                         onToggle={this.toggleInlineStyle}
//                     />
//                     <Editor
//                         blockStyleFn={getBlockStyle}
//                         editorState={this.state.editorState}
//                         onChange={this.onChange}
//                         plugins={[imagePlugin]}
//                     />
//                 </div>
//                 <h4>Editor content as HTML</h4>
//                 <pre>{this.state.editorContentHtml}</pre>
//             </div>
//         );
//     }
// }
// export default ExampleEditor;

// const styleMap = {
//     CODE: {
//         backgroundColor: "rgba(0, 0, 0, 0.05)",
//         fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//         fontSize: 16,
//         padding: 2
//     }
// };
// function getBlockStyle(block) {
//     switch (block.getType()) {
//         case 'left':
//             return 'align-left';
//         case 'center':
//             return 'align-center';
//         case 'right':
//             return 'align-right';
//         default:
//             return null;
//     }
// }



// class StyleButton extends React.Component {
//     constructor() {
//         super();
//         this.onToggle = e => {
//             e.preventDefault();
//             this.props.onToggle(this.props.style);
//         };
//     }
//     render() {
//         let className = "RichEditor-styleButton";
//         if (this.props.active) {
//             className += " RichEditor-activeButton";
//         }
//         return (
//             <span className={className} onMouseDown={this.onToggle}>
//                 {this.props.label}
//             </span>
//         );
//     }
// }

// const BLOCK_TYPES = [
//     { label: "H1", style: "header-one" },
//     { label: "H2", style: "header-two" },
//     { label: "H3", style: "header-three" },
//     { label: "H4", style: "header-four" },
//     { label: "H5", style: "header-five" },
//     { label: "H6", style: "header-six" },
//     { label: "Blockquote", style: "blockquote" },
//     { label: "UL", style: "unordered-list-item" },
//     { label: "OL", style: "ordered-list-item" },
//     { label: "Code Block", style: "code-block" },
//     { label: "Left", style: "left" },
//     { label: "Center", style: "center" },
//     { label: "Right", style: "right" },
//     { label: "Bullets", style: "unordered-list-item" }
// ];



// const BlockStyleControls = props => {
//     const { editorState } = props;
//     const selection = editorState.getSelection();
//     const blockType = editorState
//         .getCurrentContent()
//         .getBlockForKey(selection.getStartKey())
//         .getType();
//     return (
//         <div className="RichEditor-controls">
//             {BLOCK_TYPES.map(type => (
//                 <StyleButton
//                     key={type.label}
//                     active={type.style === blockType}
//                     label={type.label}
//                     onToggle={props.onToggle}
//                     style={type.style}
//                 />
//             ))}
//         </div>
//     );
// };
// var INLINE_STYLES = [
//     { label: "Bold", style: "BOLD" },
//     { label: "Italic", style: "ITALIC" },
//     { label: "Underline", style: "UNDERLINE" },
//     { label: "Monospace", style: "CODE" }
// ];
// const InlineStyleControls = props => {
//     const currentStyle = props.editorState.getCurrentInlineStyle();

//     return (
//         <div className="RichEditor-controls">
//             {INLINE_STYLES.map(type => (
//                 <StyleButton
//                     key={type.label}
//                     active={currentStyle.has(type.style)}
//                     label={type.label}
//                     onToggle={props.onToggle}
//                     style={type.style}
//                 />
//             ))}
//         </div>
//     );
// };
