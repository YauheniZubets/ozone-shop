const getData= (str) => {
    return fetch(
      `https://o-zone-shop-default-rtdb.firebaseio.com/goods.json?${str ? `search=${str}` : ''}`
      )
      .then(res =>  res.json())
}

export default getData;