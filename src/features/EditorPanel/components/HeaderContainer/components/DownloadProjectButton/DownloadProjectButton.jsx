import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { DocumentContext } from "../../../../../../contexts/DocumentContext";
import { pictureType } from "../../../../../../core/CoreConstants";

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
    const { projectState, projectCanvasRef } = useContext(DocumentContext);
    const [downloadProjectModalShow, setDownloadProjectModalShow] =
        useState(false);
    const [projectName, setProjectName] = useState(projectState.name);
    const [projectType, setProjectType] = useState(pictureType.png);

    const downloadProjectModalOnClose = () => {
        setDownloadProjectModalShow(false);
        setProjectName(projectState.name);
        setProjectType(pictureType.png);
    };

    const downloadProjectModalOnSubmit = () => {
        projectState.download(
            projectCanvasRef,
            projectName,
            projectType,
            () => {
                toast.success("Project downloaded!");
                setDownloadProjectModalShow(false);
            },
        );
    };

    const downloadProjectButtonHandler = () => {
        setDownloadProjectModalShow(true);
    };

    const downloadProjecModalNameInputHandler = (event) => {
        setProjectName(event.target.value);
    };
    
    const downloadProjecModalTypeInputHandler = (event) => {
        setProjectType(event.target.value);
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
                            nameValue={projectName}
                            nameOnChange={downloadProjecModalNameInputHandler}
                            typeValue={projectType}
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

// import { useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { HiOutlineArrowDownTray } from "react-icons/hi2";
// import Modal from "../../../../../../components/Modal/Modal";
// import { DocumentContext } from "../../../../../../contexts/DocumentContext";
// import { downloadType } from "../../../../../../data/Constants";
// import { downloadFile } from "../../../../../../utils/Utils";

// function DownloadProjectModalContent({
//     nameValue,
//     nameOnChange,
//     typeValue,
//     typeOnChange,
// }) {
//     return (
//         <div className="modal-body__wrapper">
//             <div className="desc">Download project as PNG/JPEG:</div>
//             <div style={{ display: "flex", gap: "0.5rem" }}>
//                 <input
//                     type="text"
//                     className="modal-body__input"
//                     placeholder="Project name..."
//                     value={nameValue}
//                     onChange={nameOnChange}
//                     style={{ flex: "1" }}
//                 />
//                 <select
//                     className="modal-body__input"
//                     value={typeValue}
//                     onChange={typeOnChange}
//                 >
//                     <option value="PNG">PNG</option>
//                     <option value="JPEG">JPEG</option>
//                 </select>
//             </div>
//         </div>
//     );
// }

// function DownloadProjectButton() {
//     const { documentState, documentCanvasRef } = useContext(DocumentContext);
//     const [downloadProjectModalShow, setDownloadProjectModalShow] =
//         useState(false);
//     const [downloadProjectName, setDownloadProjectName] = useState(
//         documentState.documentName,
//     );
//     const [downloadProjectType, setDownloadProjectType] = useState(
//         downloadType.png,
//     );

//     const downloadProjectModalOnClose = () => {
//         setDownloadProjectModalShow(false);
//         setDownloadProjectName(documentState.documentName);
//         setDownloadProjectType(downloadType.png);
//     };

//     const downloadProjectModalOnSubmit = () => {
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

//             const downloadProjectLowerType = downloadProjectType.toLowerCase();
//             const url = documentCanvasRef.current.toDataURL(
//                 `image/${downloadProjectLowerType}`,
//             );
//             const download =
//                 downloadProjectName.endsWith(".png") ||
//                 downloadProjectName.endsWith(".jpeg")
//                     ? downloadProjectName
//                     : `${downloadProjectName}.${downloadProjectLowerType}`;
//             downloadFile(url, download);
//             toast.success("Project downloaded!");
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

//     const downloadProjectButtonHandler = () => {
//         setDownloadProjectModalShow(true);
//     };

//     const downloadProjecModalNameInputHandler = (event) => {
//         setDownloadProjectName(event.target.value);
//     };

//     const downloadProjecModalTypeInputHandler = (event) => {
//         setDownloadProjectType(event.target.value);
//     };

//     return (
//         <>
//             <button
//                 className="button round"
//                 onClick={downloadProjectButtonHandler}
//             >
//                 <HiOutlineArrowDownTray />
//             </button>
//             {downloadProjectModalShow && (
//                 <Modal
//                     headerContent="Download project"
//                     bodyContent={
//                         <DownloadProjectModalContent
//                             nameValue={downloadProjectName}
//                             nameOnChange={downloadProjecModalNameInputHandler}
//                             typeValue={downloadProjectType}
//                             typeOnChange={downloadProjecModalTypeInputHandler}
//                         />
//                     }
//                     onClose={downloadProjectModalOnClose}
//                     onSubmit={downloadProjectModalOnSubmit}
//                     submitText="Download"
//                 />
//             )}
//         </>
//     );
// }

// export default DownloadProjectButton;
