
const updateResultsWithQuantityCalculation = (results, frontendProductData) => {
  frontendProductData.forEach(frontendProduct => {
    const { productId, purchasePrice, previousPurchasePrice } = frontendProduct;

    // Check if both the current purchasePrice and previousPurchasePrice exist in the results for the same productId
    const purchasePriceExists = results.some(result =>
      result.productId === productId && result.purchasePrice === purchasePrice
    );

    const previousPurchasePriceExists = results.some(result =>
      result.productId === productId && result.purchasePrice === previousPurchasePrice
    );

    // If both prices exist and they are different, mark the result as quantity calculated
    if (purchasePriceExists && previousPurchasePriceExists && purchasePrice !== previousPurchasePrice) {
      results.forEach(result => {
        if (result.productId === productId && result.purchasePrice === purchasePrice) {
          result.isQuantityCalculated = true;
        }
      });
    }
  });

  return results;
};

// Call the function and log the updated results
const updatedResults = updateResultsWithQuantityCalculation(results, frontendProductData);
console.log(updatedResults);


const results = [
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 30, quantity: 10, subquantity: 0, purchasePrice: 30 },
  { productId: 30, quantity: 5, subquantity: 0, purchasePrice: 30 },
  { productId: 25, quantity: 5, subquantity: 500, purchasePrice: 10 }
];

const combineProducts = (results) => {
  const productMap = {};

  results.forEach(item => {
    const key = `${item.productId}-${item.purchasePrice}`;

    if (!productMap[key]) {
      productMap[key] = { ...item };
    } else {
      productMap[key].quantity += item.quantity;
      productMap[key].subquantity += item.subquantity;
    }
  });

  return Object.values(productMap);
};

const combinedResults = combineProducts(results);
console.log(combinedResults);




const results = [
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 30, quantity:10, subquantity: 0, purchasePrice: 30 },
  { productId: 30, quantity:5, subquantity: 0, purchasePrice: 30 },
  { productId: 25, quantity: 5, subquantity: 500, purchasePrice: 10 }
];

const frontendProductData = [
  {
    id: 29,
    productId: 29,
    productName: 'new-11',
    purchasePrice: 20,
    relationalPurchasePrice: 15,
    salePrice: 20,
    previousPurchasePrice: 15,
    relatedByValue: 1000,
  },
  {
    id: 25,
    productId: 25,
    productName: 'new-11',
    purchasePrice: 10,
    relationalPurchasePrice: 10,
    salePrice: 20,
    previousPurchasePrice: 10,
    relatedByValue: 5,
  },
];

const updatedResults = results.map(result => {
  // Find the matching product in frontendProductData based on productId and purchasePrice
  const matchingProduct = frontendProductData.find(
    product =>
      product.productId === result.productId &&
      product.purchasePrice === result.purchasePrice
  );

  // If a match is found, add the relatedByValue field to the result
  if (matchingProduct) {
    return {
      ...result,
      relatedByValue: matchingProduct.relatedByValue,
    };
  }
});

console.log(updatedResults);



const processResults = (results) => {
  const combinedResults = [];

  results.forEach((item) => {
    const existingItem = combinedResults.find(
      (combinedItem) => combinedItem.productId === item.productId && combinedItem.purchasePrice === item.purchasePrice
    );

    if (existingItem) {
      const { updatedTotalQuantity, updatedTotalSubQuantity } = additionTotalQuantityOfProduct(
        existingItem.quantity,
        existingItem.subquantity,
        item.quantity,
        item.subquantity,
        item.relatedByValue||1
      );

      existingItem.quantity = updatedTotalQuantity;
      existingItem.subquantity = updatedTotalSubQuantity;
    } else {
      combinedResults.push({ ...item });
    }
  });

  return combinedResults;
};

const results = [
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20,relatedByValue:1000 },
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20,relatedByValue:1000 },
  { productId: 30, quantity: 10, subquantity: 0, purchasePrice: 30,relatedByValue:null },
  { productId: 30, quantity: 5, subquantity: 0, purchasePrice: 30,relatedByValue:null },
  { productId: 25, quantity: 5, subquantity: 500, purchasePrice: 10,relatedByValue:null }
];

console.log(processResults(results));


const results = [
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 30, quantity:10, subquantity: 0, purchasePrice: 30 },
  { productId: 30, quantity:5, subquantity: 0, purchasePrice: 30 },
  { productId: 25, quantity: 5, subquantity: 500, purchasePrice: 10 }
];

const frontendProductData = [
  {
    id: 29,
    productId: 29,
    productName: 'new-11',
    purchasePrice: 20,
    relationalPurchasePrice: 15,
    salePrice: 20,
    previousPurchasePrice: 15,
    relatedByValue: 1000,
  },
  {
    id: 25,
    productId: 25,
    productName: 'new-11',
    purchasePrice: 10,
    relationalPurchasePrice: 10,
    salePrice: 20,
    previousPurchasePrice: 10,
    relatedByValue: 5,
  },
];

const updatedResults = results.map(result => {
  // Find the matching product in frontendProductData based on productId and purchasePrice
  const matchingProduct = frontendProductData.find(
    product =>
      product.productId === result.productId &&
      product.purchasePrice === result.purchasePrice
  );

  // Add the relatedByValue field to the result, defaulting to null if no match is found
  return {
    ...result,
    relatedByValue: matchingProduct ? matchingProduct.relatedByValue : null,
  };
});

console.log(updatedResults);



SELECT
    pps.productId,
    pps.quantity,
    pps.subquantity,
    pps.purchasePrice,
    unit.relatedByValue
FROM
    product_purchase_price_wise_stocks pps
INNER JOIN
    products p ON pps.productId = p.id
INNER JOIN
    units unit ON p.unitId = unit.id
WHERE
    (pps.productId, pps.purchasePrice) IN (
        SELECT
            productId,
            purchasePrice
        FROM
            product_purchase_price_wise_stocks
        WHERE
            (productId, purchasePrice) IN ((25, 20), (29, 15))
        GROUP BY
            productId,
            purchasePrice
        HAVING
            COUNT(*) > 1
    );



const validateProductQuantities=(productData, stockProductRelationResults)=>{
  for (const product of productData) {
    const stockProduct = stockProductRelationResults.find(
      (item) => item.productId === product.productId
    );

    if (!stockProduct) {
      return {error:`Error: Product with productId ${product.productId} not found in stock data.`};
    }

    // If the product has a sub-unit (like grams) and relatedByValue (conversion factor)
    let totalQuantityProductData = product.quantity;
    if (product.subUnit && product.relatedByValue) {
      totalQuantityProductData = product.quantity * product.relatedByValue + product.subQuantity;
    }

    let totalQuantityStock = stockProduct.quantity;
    if (product.subUnit && product.relatedByValue) {
      totalQuantityStock = stockProduct.quantity * product.relatedByValue + stockProduct.subquantity;
    }

    // Compare the total quantities
    if (totalQuantityProductData !== totalQuantityStock) {
      return {error:`Error: Quantity mismatch for productId ${product.productId}. Product quantity: ${totalQuantityProductData}, Stock quantity: ${totalQuantityStock}.`};
    }
  }

  return true;
}

// Sample data
const productData = [
  {
    purchaseId: 1029,
    id: 45,
    productId: 45,
    productName: 'new-1',
    productNameAndCode: 'new-1 - 58OMJJ8O',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 10,
    subQuantity: 0,
    returnedQuantity: 0,
    returnedSubQuantity: 0,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    purchaseId: 1029,
    id: 46,
    productId: 46,
    productName: 'rice',
    productNameAndCode: 'rice - IHTHK792',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 2,
    subQuantity: 499,
    returnedQuantity: 0,
    returnedSubQuantity: 0,
    mainUnit: 'kg',
    subUnit: 'gm',
    relatedByValue: 1000 // 1 kg = 1000 gm
  }
];

const stockProductRelationResults = [
  { productId: 45, quantity: 10, subquantity: 0, purchasePrice: 10 },
  { productId: 46, quantity: 2, subquantity: 500, purchasePrice: 10 }
];

console.log(validateProductQuantities(productData, stockProductRelationResults));



const selectProductData = [
  {
    purchaseId: 1057,
    purchaseReturnId: 333,
    productId: 45,
    productName: 'new-1',
    productNameAndCode: 'new-1 - 58OMJJ8O',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 4,
    subQuantity: 0,
    returnedQuantity: 1,
    returnedSubQuantity: 0,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    purchaseId: 1057,
    purchaseReturnId: 333,
    productId: 46,
    productName: 'rice',
    productNameAndCode: 'rice - IHTHK792',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 0,
    subQuantity: 0,
    returnedQuantity: 5,
    returnedSubQuantity: 500,
    mainUnit: 'kg',
    subUnit: 'gm',
    relatedByValue: 1000
  }
];

const productPurchasePriceWiseStocksResults = [
  { productId: 45, quantity: 4, subquantity: 0, purchasePrice: 10 }
];

// Create a Set of productIds to remove
const productIdsToRemove = new Set(productPurchasePriceWiseStocksResults.map(item => item.productId));

// Filter selectProductData to exclude items with productIds in the Set
const filteredSelectProductData = selectProductData.filter(item => !productIdsToRemove.has(item.productId));

console.log(filteredSelectProductData);






const updatedPurchaseRelationValues = [
  [101, 201, 'P001', 'Product 1', 10, 2], // Product 1: 10 quantity, 2 subQuantity
  [102, 202, 'P002', 'Product 2', 5, 1],  // Product 2: 5 quantity, 1 subQuantity
  [103, 203, 'P003', 'Product 3', 8, 3]   // Product 3: 8 quantity, 3 subQuantity
];

const ProductData = [
  { productId: 'P001', totalOriginalPurchasedQuantity: 20, totalOriginalPurchasedSubQuantity: 4 },
  { productId: 'P003', totalOriginalPurchasedQuantity: 15, totalOriginalPurchasedSubQuantity: 5 }
];


const transformedPurchaseProductData = updatedPurchaseRelationValues.map(item => {
  // Find the corresponding product in frontendProductData by productId
  const frontendProduct = ProductData.find(
    product => product.productId === item[2] // Assuming item[2] is productId
  );

  // If no match is found, set default values
  const totalOriginalPurchasedQuantity = frontendProduct ? frontendProduct.totalOriginalPurchasedQuantity : 0;
  const totalOriginalPurchasedSubQuantity = frontendProduct ? frontendProduct.totalOriginalPurchasedSubQuantity : 0;

  return {
    purchaseId: item[0],            // Extracting purchaseId from item[0]
    purchaseReturnId: item[1],       // Extracting purchaseReturnId from item[1]
    productId: item[2],              // Extracting productId from item[2]
    quantity: item[4],               // Extracting quantity from item[4]
    subQuantity: item[5],            // Extracting subQuantity from item[5]
    totalOriginalPurchasedQuantity,  // New field from frontendProductData or default to 0
    totalOriginalPurchasedSubQuantity // New field from frontendProductData or default to 0
  };
});
console.log(transformedPurchaseProductData);


[
  {
    purchaseId: 101,
    purchaseReturnId: 201,
    productId: 'P001',
    quantity: 10,
    subQuantity: 2,
    totalOriginalPurchasedQuantity: 20,   // From frontendProductData
    totalOriginalPurchasedSubQuantity: 4  // From frontendProductData
  },
  {
    purchaseId: 102,
    purchaseReturnId: 202,
    productId: 'P002',
    quantity: 5,
    subQuantity: 1,
    totalOriginalPurchasedQuantity: 0,    // Default value (no match in frontendProductData)
    totalOriginalPurchasedSubQuantity: 0  // Default value (no match in frontendProductData)
  },
  {
    purchaseId: 103,
    purchaseReturnId: 203,
    productId: 'P003',
    quantity: 8,
    subQuantity: 3,
    totalOriginalPurchasedQuantity: 15,   // From frontendProductData
    totalOriginalPurchasedSubQuantity: 5  // From frontendProductData
  }
]
