## Filtering Product Data Based on Purchase Price Stocks

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Sample Data](#sample-data)
4. [Key Operations](#key-operations)
5. [Output](#output)
6. [Similar Problem Questions](#similar-problem-questions)

---

### Introduction

This documentation explains how to filter `selectProductData` based on the `productPurchasePriceWiseStocksResults`. Specifically, we want to remove products from `selectProductData` if their `productId` exists in `productPurchasePriceWiseStocksResults`.

---

### Code Explanation

#### Data Structures

1. **`selectProductData`**: Contains information about products and their quantities, including purchase and return details. Each product has fields such as `purchasePrice`, `quantity`, `subQuantity`, `returnedQuantity`, `returnedSubQuantity`, and unit information.

2. **`productPurchasePriceWiseStocksResults`**: Stores products that have already been accounted for in stock, including their `productId`, `quantity`, `subquantity`, and `purchasePrice`.

#### Filtering Logic

The goal is to exclude any items from `selectProductData` where the `productId` exists in `productPurchasePriceWiseStocksResults`.

```javascript
const productIdsToRemove = new Set(
  productPurchasePriceWiseStocksResults.map(item => item.productId)
);
```

1. **`productIdsToRemove`**:
   - We create a `Set` of product IDs that need to be removed. This ensures we can quickly check if a `productId` exists in this list, making the lookup more efficient.

```javascript
const filteredSelectProductData = selectProductData.filter(
  item => !productIdsToRemove.has(item.productId)
);
```

2. **`filteredSelectProductData`**:
   - We filter the `selectProductData` array to exclude items whose `productId` exists in `productIdsToRemove`.
   - The `filter` method checks each product and keeps it if its `productId` is **not** in `productIdsToRemove`.

---

### Sample Data

#### `selectProductData`
```javascript
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
```

#### `productPurchasePriceWiseStocksResults`
```javascript
const productPurchasePriceWiseStocksResults = [
  { productId: 45, quantity: 4, subquantity: 0, purchasePrice: 10 }
];
```

---

### Key Operations

1. **`Set` Creation**:
   - We use `map` to extract `productId` values from `productPurchasePriceWiseStocksResults` and store them in a `Set` (`productIdsToRemove`).
   - A `Set` allows efficient lookups, ensuring the filter operation can quickly determine if a `productId` should be excluded.

2. **Filtering**:
   - The `filter` method is used to iterate through `selectProductData`. It retains only those products whose `productId` is **not** in `productIdsToRemove`.

---

### Output

#### Function Call
```javascript
console.log(filteredSelectProductData);
```

#### Output:
```javascript
[
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
]
```

**Explanation**:
- The product with `productId: 45` has been removed because it exists in `productPurchasePriceWiseStocksResults`.
- The product with `productId: 46` remains because its `productId` is not in `productPurchasePriceWiseStocksResults`.

---

### Similar Problem Questions

#### Question 1:
**How can I remove specific items from an array based on another array in JavaScript?**

<details>
  <summary>Answer</summary>
  You can use the `filter` method combined with a `Set` for efficient lookups. First, create a `Set` containing the IDs (or keys) of the items you want to remove. Then, filter the original array by excluding items whose IDs are present in the `Set`.
</details>

#### Question 2:
**What is the most efficient way to exclude items from an array based on certain conditions?**

<details>
  <summary>Answer</summary>
  Using a `Set` for fast lookups is generally more efficient than looping through arrays multiple times. You can create a `Set` with the IDs of items you want to exclude and use the `filter` method to retain only the items that do not match.
</details>

