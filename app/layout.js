"use client";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";
import { Provider } from "react-redux";
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from "react-toastify";
import { store } from "@/store/rootReducer";
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="font-inter  custom-tippy dashcode-app">
        <ChakraProvider>
        <ToastContainer />

          <Provider store={store}>{children}</Provider>
          </ChakraProvider>
        </body>
      </html>
    </>
  );
}
