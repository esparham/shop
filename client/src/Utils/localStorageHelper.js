const addToLocalStorage = (obj) => {
  let existingEntries = JSON.parse(localStorage.getItem("basket"));
  if (existingEntries === null) existingEntries = [];

  const existingItem = existingEntries.filter(item => item.id === obj.id);

  if (existingItem.length === 0) {
    existingEntries.push({ ...obj, qty: 1 });
  } else {
    let newQty = existingItem[0].qty += 1;
    existingEntries = existingEntries.filter(item => item.id !== obj.id);
    existingEntries.push({ ...obj, qty: newQty });
  }
  localStorage.setItem("basket", JSON.stringify(existingEntries));
};

export default addToLocalStorage;