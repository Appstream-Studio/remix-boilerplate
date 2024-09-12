interface URLDefinition<Args extends unknown[]> {
  (...args: Args): string;
}

const defineURL = <Args extends unknown[] = []>(
  path: string | ((...args: Args) => string),
): URLDefinition<Args> => {
  if (typeof path === "string") {
    return () => path;
  }
  return (...args: Args) => path(...args);
};

const url = {
  home: defineURL("/"),
  createMember: defineURL("/members"),
  editMember: defineURL((id: string) => `/members/${id}/edit`),
};

export default url;
