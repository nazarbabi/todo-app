import {FC, Fragment} from "react";
import Navigation from "./Layout/Navigation";

const Layout: FC = props => {
  return (
    <Fragment>
      <Navigation />
      {props.children}
    </Fragment>
  )
}

export default Layout;