import "../styles/globals.css";
import { AuthenUserProvider } from "../context/AuthUserContext";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthenUserProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ConfirmDialog />
        </PersistGate>
      </AuthenUserProvider>
    </Provider>
  );
}

export default MyApp;
