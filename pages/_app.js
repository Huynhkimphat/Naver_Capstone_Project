import "../styles/globals.css";
import { AuthenUserProvider } from "../context/AuthUserContext";

function MyApp({ Component, pageProps }) {
    return (
        <AuthenUserProvider>
            <Component {...pageProps} />
        </AuthenUserProvider>
    );
}

export default MyApp;