import { LuCircleOff } from "react-icons/lu";

function AppNotSupported() {
    return (
        <div
            style={{
                width: "100%",
                height: "calc(100dvh - 1rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2rem",
                textAlign: "center",
                color: "var(--secondary-foreground-color)",
                fontSize: "0.875rem",
            }}
        >
            <LuCircleOff style={{ fontSize: "3rem", color: "#c20808" }} />
            <span>
                Unfortunately, Our application does not support your device yet!
            </span>
        </div>
    );
}

export default AppNotSupported;
