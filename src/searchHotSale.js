const searchHotSale = (data, value) => {
    return data.filter((item)=> {
        if (value) {
          return item.sale === true;
        } else {
          return item;
        }
    })
}

export default searchHotSale;