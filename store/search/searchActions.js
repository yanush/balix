export const handleSearch = (word) => (
    {
      type: actions.HANDLE_SEARCH,
      searchWord: word
    }
  );

export const actions = {
    HANDLE_SEARCH: 'handleSearch'
}