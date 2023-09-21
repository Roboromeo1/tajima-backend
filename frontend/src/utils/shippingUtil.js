import { fetchJsonFromFile } from "./jsonUtil";

async function getPostcodeData () {
  try {
    const postcodes = await fetchJsonFromFile('../data/postcode.json');
    return postcodes.postcodes;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

async function getShippingPriceData () {
  try {
    const shipping = await fetchJsonFromFile('../data/shipping.json');
    return shipping.price;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

async function getCategoryData () {
  try {
    const categories = await fetchJsonFromFile('../data/category.json');
    return categories.price_category;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

async function getStateFromPostcode(postcode) {
  const postcodes = await getPostcodeData();
  for (const entry of postcodes) {
    if (entry.postcodes.includes(postcode)) {
      return entry.state;
    }
  }
  return null;
}

async function getCategoryFromState(state) {
  const categories = await getCategoryData();

  for (const entry of categories) {
    if (entry.state === state) {
      return entry.category_id;
    }
  }

  return null;
}

async function getPricesByCategory(categoryId) {
  const shipping = await getShippingPriceData();
  const prices = [];

  for (const entry of shipping) {
    if (entry.category === categoryId) {
      prices.push({
        category: entry.category,
        max_weight: entry.max_weight,
        premium: entry.premium,
        standard: entry.standard,
        economy: entry.economy
      });
    }
  }

  return prices;
}

function findShippingDataByWeight(prices, weight) {
  let result = null;
  for (let i = 0; i < prices.length; i++) {
    if (prices[i].max_weight >= weight) {
      result = prices[i];
      break;
    }
  }
  return result;
}

export const getShippingCharges = async (postcode, weight) => {
  const state = await getStateFromPostcode(postcode);
  const category = await getCategoryFromState(state);
  const prices = await getPricesByCategory(category)
  return findShippingDataByWeight(prices, weight);
}