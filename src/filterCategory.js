const filterCategory = (data, value) => {
    return data.filter((item)=> {
      return item.category === value;
    })
}

export default filterCategory;