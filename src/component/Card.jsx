import React from "react";
const Card = ({ name, type, image }) => {
    
    return (
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white p-4 mx-5 mt-3 ">
        {image && <img className="w-full h-48 object-cover rounded-lg" src={image.sprite}  alt={name} />}
        <div className="py-4">
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          {type?.map((t) => (
            <span
              key={t}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2  "
            >
              {t}
            </span>
          ))}
          
        </div>
      </div>
    );
  };
  
  export default Card;
  