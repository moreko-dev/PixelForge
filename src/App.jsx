import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { DocumentContext } from "./contexts/DocumentContext";
import AppNotSupported from "./features/AppNotSupported/AppNotSupported";
import EditorPanel from "./features/EditorPanel/EditorPanel";
import StartPanel from "./features/StartPanel/StartPanel";
import "./styles/App.css";
import "./styles/Variables.css";
import { isMobileDevice } from "./utils/Functions";

function App() {
    const { documentState } = useContext(DocumentContext);

    return (
        <>
            <div className="container">
                {isMobileDevice() ? (
                    <AppNotSupported />
                ) : (
                    <>
                        {documentState.isDocumentCreated ? (
                            <EditorPanel />
                        ) : (
                            <StartPanel />
                        )}
                    </>
                )}
            </div>
            <Toaster
                toastOptions={{
                    style: {
                        backgroundColor: "#303030",
                        color: "#ffffff",
                    },
                }}
            />
        </>
    );
}

export default App;
