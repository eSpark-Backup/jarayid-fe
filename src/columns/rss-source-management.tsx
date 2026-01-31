export const columns = () => {
  return [
    // { name: "ID", key: "id" },
    { name: "News Source Name", key: "name" },
    { name: "RSS Feed URL", key: "url" },
    { name: "Category", key: "cat" },
    {
      name: "Logo",
      key: "logo",
      component: (item) => {
        return (
          <img
            style={{ borderRadius: "50%" }}
            width={30}
            height={30}
            src={item?.logo}
          />
        );
      },
    },
    { name: "Status", key: "rssStatus", chip: true },
    { name: "Actions", key: "action" },
  ];
};
