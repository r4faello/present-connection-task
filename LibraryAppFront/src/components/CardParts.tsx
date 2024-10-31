export const ImageSection = ({ coverImageUrl }: { coverImageUrl: string }) => {
  return (
    <div className="w-[130px] h-full bg-red-300 rounded-[8px] overflow-hidden">
      <img className="w-full h-full" src={coverImageUrl} alt="" />
    </div>
  );
};

export const TitleSection = ({ title }: { title: string }) => {
  return (
    <div className="h-[68px] flex items-center">
      <h1 className="font-bold text-[28px] text-second ellipsis leading-[30px]">
        {title}
      </h1>
    </div>
  );
};

export const Property = ({ head, body }: { head: string; body: string }) => {
  return (
    <div>
      <h2 className="font-bold text-[16px] text-second mb-[-2px] mt-[11px]">
        {head}
      </h2>
      <p className="mt-0 text-[16px] text-second">{body}</p>
    </div>
  );
};

export const PropertySection = ({
  year,
  author,
}: {
  year: number;
  author: string;
}) => {
  return (
    <div>
      <Property head="Originally published in" body={year.toString()} />
      <Property head="Author" body={author} />
    </div>
  );
};

export const InfoSection = ({
  title,
  year,
  author,
}: {
  title: string;
  year: number;
  author: string;
}) => {
  return (
    <div className="ml-[10px] w-[219px] h-[90%]">
      <TitleSection title={title} />
      <PropertySection year={year} author={author} />
    </div>
  );
};
