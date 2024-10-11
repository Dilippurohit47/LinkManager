interface LinkType {
  id: number;
  roomId: number;
  title: string;
  url: string;
  desc: string;
}

const ShareableLinkComp = ({ links }: { links: LinkType[] }) => {
  return (
    <>
      {links && links.length > 0 ? (
        links.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-lg flex justify-between px-2 md:px-5 py-2 mt-8 items-center"
          >
            <div className=" max-md:w-[70vw]">
              <div className="flex md:gap-10 flex-col md:flex-row">
                <h1 className="font-bold capitalize overflow-hidden overflow-ellipsis">
                  {link.title}
                </h1>
                <p className="text-red-500   overflow-hidden overflow-ellipsis">
                  {link.desc}
                </p>
              </div>
              <a href={link.url} target="blank">
                <p className="text-blue-400 truncate">{link.url}</p>
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="text-white flex items-center justify-center">
          <h3>This room dont have any Links</h3>
        </div>
      )}
    </>
  );
};

export default ShareableLinkComp;
