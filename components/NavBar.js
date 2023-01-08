import Link from "next/link"
import Image from "next/Image"
import logo from "../public/logo-test.png"

const Navbar = ({account}) => {
    return (
        <div className="navbar">
            <div className="logo-wrapper">
                <Link href="/">
                    <Image src={logo} alt="website logo" width={90} height={60}></Image>
                </Link>
            </div>
            
            <div className="account-info">
                <p>Welcome {account.username}</p>
                <img className="avatar" src={account.avatar.url} />
            </div>
        </div>
    )
}

export default Navbar