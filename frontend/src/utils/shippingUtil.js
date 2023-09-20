import { fetchJsonFromFile } from "./jsonUtil";

export async function getPostcodeData () {
  try {
    const postcodes = await fetchJsonFromFile('../data/postcode.json');
    return postcodes.postcodes;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

export async function getShippingPriceData () {
  try {
    const postcodes = await fetchJsonFromFile('../data/shipping.json');
    return postcodes.price;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}

export async function getCategoryData () {
  try {
    const postcodes = await fetchJsonFromFile('../data/category.json');
    return postcodes.price_category;
  } catch (error) {
    console.error('Error fetching JSON:', error);
  }
}