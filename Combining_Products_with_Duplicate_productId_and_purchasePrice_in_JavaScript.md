## Combining Products with Duplicate `productId` and `purchasePrice` in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction

This documentation explains the `combineProducts` function, which combines product records that have the same `productId` and `purchasePrice` by summing their `quantity` and `subquantity`. This is useful when handling datasets with multiple entries of the same product that need to be merged for simpler processing.

---

### Code Explanation

The `combineProducts` function processes an array of products and merges entries that share the same `productId` and `purchasePrice`. It uses a mapping structure to accumulate quantities and subquantities for each unique product combination.

#### `combineProducts` Function
```javascript
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
```

**Explanation**:
- **Purpose**: To combine product records with the same `productId` and `purchasePrice`, summing up their `quantity` and `subquantity`.
- **Logic**:
    - **Unique Key**: Each product is identified by a unique key formed by concatenating the `productId` and `purchasePrice` (``${item.productId}-${item.purchasePrice}``).
    - **Product Mapping**: Products are stored in a `productMap` object. If a product with the same `productId` and `purchasePrice` already exists, the `quantity` and `subquantity` of the existing entry are updated. Otherwise, the product is added as a new entry.
    - **Return Combined Results**: After processing, the combined product entries are returned as an array using `Object.values(productMap)`.

---

### Real-World Example

In an inventory or sales tracking system, multiple entries of the same product with the same price may occur, representing different transactions or stock records. The `combineProducts` function helps consolidate these entries, allowing for cleaner data presentation and easier calculations.

#### Example Data
```javascript
const results = [
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 29, quantity: 5, subquantity: 0, purchasePrice: 20 },
  { productId: 30, quantity: 10, subquantity: 0, purchasePrice: 30 },
  { productId: 30, quantity: 5, subquantity: 0, purchasePrice: 30 },
  { productId: 25, quantity: 5, subquantity: 500, purchasePrice: 10 }
];
```

#### Calling the Function
```javascript
const combinedResults = combineProducts(results);
console.log(combinedResults);
```

#### Output:
```json
[
  { "productId": 29, "quantity": 10, "subquantity": 0, "purchasePrice": 20 },
  { "productId": 30, "quantity": 15, "subquantity": 0, "purchasePrice": 30 },
  { "productId": 25, "quantity": 5, "subquantity": 500, "purchasePrice": 10 }
]
```

**Comment**:
- Products with the same `productId` and `purchasePrice` are combined by summing their `quantity` and `subquantity`.
- For example, two entries with `productId: 29` and `purchasePrice: 20` are combined into one entry with a total quantity of `10`.

---

### Similar Problem Questions

#### Question 1:
**How can we merge products that are duplicated by specific attributes (e.g., `productId` and `purchasePrice`)?**

<details>
  <summary>Answer</summary>
  You can use a combination of a unique key (e.g., `productId-purchasePrice`) and an accumulator object to group products. Sum up the `quantity` and `subquantity` for each matching entry, as demonstrated in `combineProducts`.
</details>

#### Question 2:
**What if the products have other properties besides `quantity` and `subquantity`—how do we decide which properties to merge and how?**

<details>
  <summary>Answer</summary>
  Decide which properties to combine (e.g., `quantity`, `subquantity`), and leave other properties (like `purchasePrice`) untouched. You may need to apply custom logic for each property depending on the context of the data.
</details>

---

### Output and Comments

```javascript
const combinedResults = combineProducts(results);
console.log(combinedResults);
```

**Comment**:
- The function works efficiently for consolidating product data where multiple records exist with the same `productId` and `purchasePrice`.
- Products are grouped by a combination of `productId` and `purchasePrice`, and their `quantity` and `subquantity` are summed up.
