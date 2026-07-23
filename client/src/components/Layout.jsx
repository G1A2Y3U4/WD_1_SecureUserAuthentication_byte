import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {

    return (

        <>
            <Navbar />

            <div className="d-flex">

                <Sidebar />

                <div
                    className="container mt-4"
                    style={{ flex: 1 }}
                >
                    {children}
                </div>

            </div>

        </>

    );
}

export default Layout;