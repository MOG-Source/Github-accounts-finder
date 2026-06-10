import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserCard from './UserCard';
import { fetchGithubUser } from '../api/github';
import RecentSearches from './RescentSearches';
import { useDebounce } from 'use-debounce';
import { searchGithubUser } from '../api/github';
import SuggestionDropdown from './SuggestionDropdown';

const UserSearch = () => {
  const [userName, setUserName] = useState('');
  const [submittedUserName, setSubmittedUserName] = useState('');
  const [recentUsers, setRecentUsers] = useState<string[]>(() => {
    let stored = localStorage.getItem('recentUsers');
    return stored ? JSON.parse(stored) : [];
  });

  const [debouncedUsername] = useDebounce(userName, 300);
  let [showSuggestions, setShowSuggestions] = useState(false);

  //   Query to fetch a specific user
  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users', submittedUserName],
    queryFn: () => fetchGithubUser(submittedUserName),
    enabled: !!submittedUserName,
  });

  //   Query to fetch search results
  let { data: suggestions } = useQuery({
    queryKey: ['github-user-suggestion', debouncedUsername],
    queryFn: () => searchGithubUser(debouncedUsername),
    enabled: debouncedUsername.length > 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let trimmed = userName.trim();
    if (!trimmed) return;
    setSubmittedUserName(trimmed);
    setUserName('');

    setRecentUsers((prev) => {
      const updated = [trimmed, ...prev.filter((i) => i !== trimmed)];
      return updated.slice(0, 5);
    });
  };

  useEffect(() => {
    localStorage.setItem('recentUsers', JSON.stringify(recentUsers));
  }, [recentUsers]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter Github Username..."
            value={userName}
            onChange={(e) => {
              let value = e.target.value;
              setUserName(value);
              setShowSuggestions(value.trim().length > 1);
            }}
          />
          {showSuggestions && suggestions?.length > 0 && (
            <SuggestionDropdown
              show={showSuggestions}
              onSelect={(selected) => {
                setUserName(selected);
                setShowSuggestions(false);
                if (submittedUserName !== selected) {
                  setSubmittedUserName(selected);
                } else {
                  refetch();
                }

                setRecentUsers((prev) => {
                  const updated = [
                    selected,
                    ...prev.filter((i) => i !== selected),
                  ];
                  return updated.slice(0, 5);
                });
              }}
              suggestions={suggestions}
            />
          )}
        </div>
        <button type="submit">Search</button>
      </form>
      {isLoading && <p className="status">Loading...</p>}
      {isError && <p className="status error">{error?.message}</p>}

      {data && <UserCard user={data} />}

      {recentUsers.length > 0 && (
        <RecentSearches
          users={recentUsers}
          onSelect={(username) => {
            setUserName(username);
            setSubmittedUserName(username);
          }}
        />
      )}
    </>
  );
};

export default UserSearch;
