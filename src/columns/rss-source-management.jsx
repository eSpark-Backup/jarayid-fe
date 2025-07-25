export const columns = () => {
  return [
    { name: "ID", key: "id" },
    { name: "News Source Name", key: "sourceName" },
    { name: "RSS Feed URL", key: "rssUrl" },
    { name: "World News", key: "worldNews" },
    { name: "Logo", key: "logo" },
    { name: "Status", key: "status", chip: true },
    { name: "Actions", key: "action" },
  ];
};
