type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="field">
      <label htmlFor="user-search">Search users</label>
      <input
        id="user-search"
        value={value}
        placeholder="Search by name, email, city, or company"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchInput;
