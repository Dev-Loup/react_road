import './App.css';
import React from 'react';

const List = ({ list }) =>
  list.map((item) =>
      <Item
      key={item.objectID}
      {...item}
    />
  )

const Item = ({ title, url, author, num_comments, points }) =>
  <div>
    <span>
      <a href={url}>{title}</a>
    </span>
    <span>{author}</span>
    <span>{num_comments}</span>
    <span>{points}</span>
  </div>

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(localStorage.getItem('value') || initialState);
  React.useEffect(() => localStorage.setItem('value', value), [value, key]);
  return [ value, setValue ]
}

const InputWithLabel = ({id, value, onInputChange, children, type='text', }) =>
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState('search', 'React')
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  const handleSearch = event => {
    setSearchTerm(event.target.value)
  }
  const filterStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div>
      <h1>Hello</h1>
      <InputWithLabel
        id='search'
        value={searchTerm}
        onInputChange={handleSearch}
        >
        <strong>Search:</strong>
        </InputWithLabel>
      <hr />
      < List list={filterStories} />
    </div>
  );
}
export default App;
