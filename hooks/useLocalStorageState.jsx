export default function useLocalStorageState(
  key,
  defaultValue = '',
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  const initialState = () => {
    const lsItem = window.localStorage.getItem(key);
    if (lsItem) return deserialize(lsItem);
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  };

  const [value, setValue] = React.useState(initialState);
  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(key);
    }
    prevKeyRef.current = key;

    window.localStorage.setItem(key, serialize(value));
  }, [key, serialize, value]);

  return [value, setValue];
}
