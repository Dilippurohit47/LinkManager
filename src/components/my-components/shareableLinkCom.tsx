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
            className="bg-white rounded-lg flex justify-between px-5 py-2 mt-8 items-center"
          >
            <div>
              <div className="flex gap-10">
                <h1 className="font-bold capitalize">{link.title}</h1>
                <p className="text-red-500">{link.desc}</p>
              </div>
              <a href={link.url} target="blank">
                <p className="text-blue-400">{link.url}</p>
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
