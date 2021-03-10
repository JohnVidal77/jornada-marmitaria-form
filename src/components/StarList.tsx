import React from 'react';
import Image from 'next/image';

interface IStarList {
  level: number;
}

const StarList: React.FC<IStarList> = ({level}: IStarList) => {
  return (
    <div className="flex flex-row justify-center">
      <div>
        <figure>
          <Image src="/star.png" alt="Estrela" width={48} height={48} />
        </figure>
      </div>
      <div>
        <figure className={level < 2 && 'opacity-50'}>
          <Image src="/star.png" alt="Estrela" width={48} height={48} />
        </figure>
      </div>
      <div>
        <figure className={level < 3 && 'opacity-50'}>
          <Image src="/star.png" alt="Estrela" width={48} height={48} />
        </figure>
      </div>
      <div>
        <figure className="opacity-50">
          <Image src="/star.png" alt="Estrela" width={48} height={48} />
        </figure>
      </div>
      <div>
        <figure className="opacity-50">
          <Image src="/star.png" alt="Estrela" width={48} height={48} />
        </figure>
      </div>
    </div>
  );
};

export default StarList;
