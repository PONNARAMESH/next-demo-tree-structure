import "./layout.css";

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="private-layout">
            {/* {children} */}

            <div className="pageHeader">
                <h1>Organization structure</h1>
            </div>

            <div className="pageContent">
                <div className="menu">
                    <a href="#">Link 1</a>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                    <a href="#">Link 4</a>
                </div>

                <div className="main">
                    {children}
                </div>

                <div className="right">
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
                </div>
            </div>

            <div className="pageFooter">© copyright organization.com</div>

        </div>

    )
}