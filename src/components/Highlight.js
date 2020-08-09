// import React, { Component } from 'react';
// import hljs from "highlight.js";
// import 'highlight.js/styles/vs2015.css';

// class Preview extends Component {
//     componentDidMount() {
//         this.updateCodeSyntaxHighlighting();
//     }

//     componentDidUpdate() {
//         this.updateCodeSyntaxHighlighting();
//     }


//     updateCodeSyntaxHighlighting = () => {
//         document.querySelectorAll("code").forEach(block => {
//             hljs.highlightBlock(block);
//         });
//     };

//     render() {
//         return (
//             <div
//                 style={{ width: "100%", height: "100%", overflow: "auto", objectFit: "cover" }}
//                 className="content"
//                 dangerouslySetInnerHTML={{ __html: this.props.body }}
//             />
//         );
//     }
// }

// export default Preview;