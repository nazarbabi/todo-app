import React, {FC, useRef, useState} from "react";
import Image from "./Image";
import faker from "@faker-js/faker";
import classes from './Pictures.module.css';

interface imageDataType {
  img: string,
  alt: string,
  name: string
}

function getSourceData(count: number): imageDataType[] {
  let index = 0, result = [];
  while (index < count) {
    index++;
    
    result.push({
      name: faker.name.jobTitle(),
      img: faker.image.cats(200, 200, true),
      alt: 'image'
    })
  }
  
  return result;
}

const Pictures: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState<imageDataType[]>([]);
  
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setContent(getSourceData(+inputRef.current!.value));
  }
  
  const renderedImages = content.map((item: imageDataType, index) => {
    return <Image key={index} src={item.img} alt={item.alt} name={item.name} />
  });
  
  return (
    <div>
      <form className={classes.generateForm} onSubmit={submitHandler}>
        <div className={classes.group}>
          <input type='number' min='1' max='100' ref={inputRef} placeholder="Count" />
          <button>Generate</button>
        </div>
      </form>
      <div className={classes.content}>
        {renderedImages}
      </div>
    </div>
  )
}

export default Pictures;
