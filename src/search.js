const searchFilter = (data, goods) => {
    return data.filter((item)=> {
        return item.title.toLowerCase().includes(goods.toLowerCase());
    })
}

export default searchFilter;