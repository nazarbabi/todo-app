import {FC} from "react";
import classes from './Image.module.css';

const Image: FC<{src: string, alt: string, name: string}> = props => {
  return (
    <div className={classes.box}>
      <img className={classes.img} src={props.src} alt={props.alt} />
      <h3 className={classes.name}>{props.name}</h3>
    </div>
  )
}

export default Image