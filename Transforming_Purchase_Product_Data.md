## Transforming Purchase Product Data

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Sample Data](#sample-data)
4. [Transformation Logic](#transformation-logic)
5. [Output](#output)
6. [Similar Problem Questions](#similar-problem-questions)

---

### Introduction

This documentation describes the process of transforming `updatedPurchaseRelationValues` into a new format, incorporating data from `ProductData` to provide additional details about each product.

---

### Code Explanation

#### Data Structures

1. **`updatedPurchaseRelationValues`**: Contains an array of arrays, where each inner array represents purchase information with fields such as `purchaseId`, `purchaseReturnId`, `productId`, `quantity`, and `subQuantity`.

2. **`ProductData`**: Contains an array of objects where each object includes `productId`, `totalOriginalPurchasedQuantity`, and `totalOriginalPurchasedSubQuantity`.

#### Transformation Logic

The goal is to create a new array of objects that combines data from `updatedPurchaseRelationValues` with additional fields from `ProductData`.

1. **Find Matching Data**: For each item in `updatedPurchaseRelationValues`, we find the corresponding entry in `ProductData` based on `productId`.

2. **Add Fields**: If a match is found, include `totalOriginalPurchasedQuantity` and `totalOriginalPurchasedSubQuantity` from `ProductData`. If no match is found, set these fields to default values (0).

```javascript
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
```

---

### Sample Data

#### `updatedPurchaseRelationValues`
```javascript
const updatedPurchaseRelationValues = [
  [101, 201, 'P001', 'Product 1', 10, 2], // Product 1: 10 quantity, 2 subQuantity
  [102, 202, 'P002', 'Product 2', 5, 1],  // Product 2: 5 quantity, 1 subQuantity
  [103, 203, 'P003', 'Product 3', 8, 3]   // Product 3: 8 quantity, 3 subQuantity
];
```

#### `ProductData`
```javascript
const ProductData = [
  { productId: 'P001', totalOriginalPurchasedQuantity: 20, totalOriginalPurchasedSubQuantity: 4 },
  { productId: 'P003', totalOriginalPurchasedQuantity: 15, totalOriginalPurchasedSubQuantity: 5 }
];
```

---

### Transformation Output

#### Function Call
```javascript
console.log(transformedPurchaseProductData);
```

#### Output
```javascript
[
  {
    purchaseId: 101,
    purchaseReturnId: 201,
    productId: 'P001',
    quantity: 10,
    subQuantity: 2,
    totalOriginalPurchasedQuantity: 20,   // From ProductData
    totalOriginalPurchasedSubQuantity: 4  // From ProductData
  },
  {
    purchaseId: 102,
    purchaseReturnId: 202,
    productId: 'P002',
    quantity: 5,
    subQuantity: 1,
    totalOriginalPurchasedQuantity: 0,    // Default value (no match in ProductData)
    totalOriginalPurchasedSubQuantity: 0  // Default value (no match in ProductData)
  },
  {
    purchaseId: 103,
    purchaseReturnId: 203,
    productId: 'P003',
    quantity: 8,
    subQuantity: 3,
    totalOriginalPurchasedQuantity: 15,   // From ProductData
    totalOriginalPurchasedSubQuantity: 5  // From ProductData
  }
]
```

**Explanation**:
- The products with `productId: 'P001'` and `productId: 'P003'` have their `totalOriginalPurchasedQuantity` and `totalOriginalPurchasedSubQuantity` fields populated from `ProductData`.
- The product with `productId: 'P002'` does not have a match in `ProductData`, so the fields are set to default values (0).

---

### Similar Problem Questions

#### Question 1:
**How can I enrich an array of objects with additional data from another array in JavaScript?**

<details>
  <summary>Answer</summary>
  Use the `map` method to iterate over the primary array. For each item, use `find` to get additional data from the secondary array. If a match is found, include additional fields; otherwise, use default values.
</details>

#### Question 2:
**What is the most efficient way to combine data from two arrays in JavaScript based on a common key?**

<details>
  <summary>Answer</summary>
  Create a lookup object (or `Map`) from the secondary array where keys are the common key. Then, use the `map` method on the primary array to enrich its data using the lookup object. This method ensures efficient lookups and transformations.
</details>