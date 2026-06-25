// import React, { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { BiDownload } from "react-icons/bi";
// import { DocumentContext } from "../../../../../../contexts/DocumentContext";
// import Modal from "../../../../../../components/Modal/Modal";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import Modal from "../../../../../../components/Modal/Modal";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import { downloadType } from "../../../../../../data/Constants";
import { downloadFile } from "../../../../../../utils/Utils";

// function DownloadProjectModalContent({
//     fileNameValue,
//     fileNameOnChange,
//     fileTypeValue,
//     fileTypeOnChange,
// }) {
//     return (
//         <div className="modal-body__wrapper">
//             <div className="desc">Download project as PNG/JPEG file:</div>
//             <div style={{ display: "flex", gap: "0.5rem" }}>
//                 <input
//                     type="text"
//                     className="modal-body__input"
//                     placeholder="File name..."
//                     value={fileNameValue}
//                     onChange={fileNameOnChange}
//                     style={{ flex: "1" }}
//                 />
//                 <select
//                     className="modal-body__input"
//                     value={fileTypeValue}
//                     onChange={fileTypeOnChange}
//                 >
//                     <option value="PNG">PNG</option>
//                     <option value="JPEG">JPEG</option>
//                 </select>
//             </div>
//         </div>
//     );
// }

// function DownloadProjectButton() {
//     const projectType = { png: "PNG", jpeg: "JPEG" };

//     const { documentState, documentCanvasRef } = useContext(DocumentContext);
//     const [downloadProjectName, setDownloadProjectName] = useState(
//         documentState.documentName,
//     );
//     const [downloadProjectType, setDownloadProjectType] = useState(
//         projectType.png,
//     );
//     const [downloadProjectModaShow, setDownloadProjectModalShow] =
//         useState(false);

//     const downloadProjectHandler = () => {
//         const tempImage = new Image();
//         tempImage.src = documentCanvasRef.current.toDataURL();

//         tempImage.onload = () => {
//             const context = documentCanvasRef.current.getContext("2d");
//             context.globalCompositeOperation = "destination-over";
//             context.fillStyle =
//                 documentState.canvas.styles.backgroundColor || "#ffffff";
//             context.fillRect(
//                 0,
//                 0,
//                 documentState.canvas.width,
//                 documentState.canvas.height,
//             );

//             const url = documentCanvasRef.current.toDataURL(
//                 `image/${downloadProjectType.toLowerCase()}`,
//             );

//             // Download
//             const link = document.createElement("a");
//             link.href = url;
//             link.download =
//                 downloadProjectName.endsWith(".png") ||
//                 downloadProjectName.endsWith(".jpeg")
//                     ? downloadProjectName
//                     : `${downloadProjectName}.${downloadProjectType.toLowerCase()}`;
//             link.click();

//             toast.success("Project downloaded successfuly.");
//             setDownloadProjectModalShow(false);

//             context.clearRect(
//                 0,
//                 0,
//                 documentState.canvas.width,
//                 documentState.canvas.height,
//             );
//             context.drawImage(tempImage, 0, 0);
//         };
//     };

//     return (
//         <>
//             <button
//                 className="menu-button"
//                 onClick={() => setDownloadProjectModalShow(true)}
//             >
//                 <BiDownload />
//             </button>
//             {downloadProjectModaShow && (
//                 <Modal
//                     headerContent="Download project"
//                     bodyContent={
//                         <DownloadProjectModalContent
//                             fileNameValue={downloadProjectName}
//                             fileNameOnChange={(event) =>
//                                 setDownloadProjectName(event.target.value)
//                             }
//                             fileTypeValue={downloadProjectType}
//                             fileTypeOnChange={(event) =>
//                                 setDownloadProjectType(event.target.value)
//                             }
//                         />
//                     }
//                     onSubmit={downloadProjectHandler}
//                     onClose={() => setDownloadProjectModalShow(false)}
//                 />
//             )}
//         </>
//     );
// }

// export default DownloadProjectButton;

function DownloadProjectModalContent({
    nameValue,
    nameOnChange,
    typeValue,
    typeOnChange,
}) {
    return (
        <div className="modal-body__wrapper">
            <div className="desc">Download project as PNG/JPEG:</div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                    type="text"
                    className="modal-body__input"
                    placeholder="Project name..."
                    value={nameValue}
                    onChange={nameOnChange}
                    style={{ flex: "1" }}
                />
                <select
                    className="modal-body__input"
                    value={typeValue}
                    onChange={typeOnChange}
                >
                    <option value="PNG">PNG</option>
                    <option value="JPEG">JPEG</option>
                </select>
            </div>
        </div>
    );
}

function DownloadProjectButton() {
    const { documentState, documentCanvasRef } = useContext(DocumentContext);
    const [downloadProjectModalShow, setDownloadProjectModalShow] =
        useState(false);
    const [downloadProjectName, setDownloadProjectName] = useState(
        documentState.documentName,
    );
    const [downloadProjectType, setDownloadProjectType] = useState(
        downloadType.png,
    );

    const downloadProjectModalOnClose = () => {
        setDownloadProjectModalShow(false);
        setDownloadProjectName(documentState.documentName);
        setDownloadProjectType(downloadType.png);
    };

    const downloadProjectModalOnSubmit = () => {
        const tempImage = new Image();
        tempImage.src = documentCanvasRef.current.toDataURL();
        tempImage.onload = () => {
            const context = documentCanvasRef.current.getContext("2d");
            context.globalCompositeOperation = "destination-over";
            context.fillStyle =
                documentState.canvas.styles.backgroundColor || "#ffffff";
            context.fillRect(
                0,
                0,
                documentState.canvas.width,
                documentState.canvas.height,
            );

            const downloadProjectLowerType = downloadProjectType.toLowerCase();
            const url = documentCanvasRef.current.toDataURL(
                `image/${downloadProjectLowerType}`,
            );
            const download =
                downloadProjectName.endsWith(".png") ||
                downloadProjectName.endsWith(".jpeg")
                    ? downloadProjectName
                    : `${downloadProjectName}.${downloadProjectLowerType}`;
            downloadFile(url, download);
            toast.success("Project downloaded!");
            setDownloadProjectModalShow(false);

            context.clearRect(
                0,
                0,
                documentState.canvas.width,
                documentState.canvas.height,
            );
            context.drawImage(tempImage, 0, 0);
        };
    };

    const downloadProjectButtonHandler = () => {
        setDownloadProjectModalShow(true);
    };

    const downloadProjecModalNameInputHandler = (event) => {
        setDownloadProjectName(event.target.value);
    };

    const downloadProjecModalTypeInputHandler = (event) => {
        setDownloadProjectType(event.target.value);
    };

    return (
        <>
            <button
                className="button round"
                onClick={downloadProjectButtonHandler}
            >
                <HiOutlineArrowDownTray />
            </button>
            {downloadProjectModalShow && (
                <Modal
                    headerContent="Download project"
                    bodyContent={
                        <DownloadProjectModalContent
                            nameValue={downloadProjectName}
                            nameOnChange={downloadProjecModalNameInputHandler}
                            typeValue={downloadProjectType}
                            typeOnChange={downloadProjecModalTypeInputHandler}
                        />
                    }
                    onClose={downloadProjectModalOnClose}
                    onSubmit={downloadProjectModalOnSubmit}
                    submitText="Download"
                />
            )}
        </>
    );
}

export default DownloadProjectButton;
