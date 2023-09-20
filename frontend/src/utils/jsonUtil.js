export async function fetchJsonFromFile(filename) {
  try {
    const response = await fetch(filename);
    const jsonData = await response.json();
    return jsonData
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return [];
  }
}