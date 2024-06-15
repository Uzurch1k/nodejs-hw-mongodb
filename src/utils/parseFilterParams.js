const parseType = type => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const isType = type => ['work', 'home', 'personal'].includes(type);

  if (isType(type)) return type;
};

const parseBoolean = bool => {
  const isString = typeof bool === 'string';
  if (!isString) return undefined;

  if (['true'].includes(bool)) return true;
  if (['false'].includes(bool)) return false;

  return undefined;
};

export const parseFilterParams = query => {
  const { type, favourite } = query;

  const parsedType = parseType(type);
  const parsedFavourite = parseBoolean(favourite);

  return {
    type: parsedType,
    favourite: parsedFavourite,
  };
};
