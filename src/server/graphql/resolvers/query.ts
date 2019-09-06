export const message = (_, args: { id: string }) => {
  const { id } = args;
  return { id, channelId: 'xyz', content: "added" };
}
