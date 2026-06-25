import BackToStartPanelButton from "./components/BackToStartPanelButton";
import DownloadProjectButton from "./components/DownloadProjectButton/DownloadProjectButton";
import SaveProjectButton from "./components/SaveProjectButton/SaveProjectButton";
import "./HeaderContainer.css";

function HeaderContainer({ projectName, setProjectName }) {
    return (
        <div className="header-container">
            <span className="header-container__title">PixelForge</span>
            <div className="white-space"></div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
                <SaveProjectButton
                    projectName={projectName}
                    setProjectName={setProjectName}
                />
                <DownloadProjectButton />
            </div>
            <div className="v-seperator"></div>
            <BackToStartPanelButton />
        </div>
    );
}

export default HeaderContainer;
