const handleTitleImage = (urlArray: string[], titleImage: string | number) => {
  const parsedTitleImage = parseInt(titleImage.toString());

  if (!isNaN(parsedTitleImage)) {
    if (parsedTitleImage < 0) return urlArray[0];
    return urlArray[parsedTitleImage];
  }
  return titleImage;
};

export default handleTitleImage;
