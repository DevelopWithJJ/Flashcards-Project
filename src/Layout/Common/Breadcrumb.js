import { Link } from "react-router-dom";

function Breadcrumb({ navLinks }) {
  const breadcrumbLinks = navLinks.map((link, index) => {
    // if it's the last item in the array it doesn't have a link to set
    if (index === navLinks.length - 1) {
      return (
        <li key={index} className="breadcrumb-item active" aria-current="page">
          {link.name}
        </li>
      );
    } else {
      return (
        <li key={index} className="breadcrumb-item">
          <Link to={`${link.url}`}>{link.name}</Link>
        </li>
      );
    }
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">
            <span className="oi oi-home"></span>Home
          </Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {breadcrumbLinks}
        </li>
      </ol>
    </nav>
  );
}

export default Breadcrumb;
