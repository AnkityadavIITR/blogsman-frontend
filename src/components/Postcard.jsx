import React from 'react';
import { Link } from 'react-router-dom';
import { Context, server } from '../main';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';

const Card = ({ postImg, date, title, content}) => {
  const shortContent = content.slice(0, 40);
  return (
    <div className="w-full mb-10">
      <div className="mb-2 overflow-hidden rounded w-full">
        <img src={postImg} alt="" className="w-full aspect-[1/1] object-cover" />
      </div>
      <div>
        {date && (
          <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose">
            {date}
          </span>
        )}
        <h3 className="mb-4 text-xl font-semibold text-dark hover:text-primary">
          {title}
        </h3>
        <p className="text-base text-body-color dark:text-dark-6">{shortContent} ...</p>
      </div>
    </div>
  );
};

export default Card;
