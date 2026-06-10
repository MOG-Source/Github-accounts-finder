export const fetchGithubUser = async (userName: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/users/${userName}`,
  );
  if (!res.ok) throw new Error('User Not Found');
  let data = await res.json();
  return data;
};

export const searchGithubUser = async (query: string) => {
  const res = await fetch(
    `${import.meta.env.VITE_GITHUB_API_URL}/search/users?q=${query}`,
  );
  if (!res.ok) throw new Error('User Not Found');
  let data = await res.json();
  return data.items;
};
