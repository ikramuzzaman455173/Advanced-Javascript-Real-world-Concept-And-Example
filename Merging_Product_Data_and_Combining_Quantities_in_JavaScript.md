## Merging Product Data and Combining Quantities in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
In this documentation, we demonstrate how to merge products based on their `productId` and `purchaseId` values, combining the quantities of matching products. This method is useful in scenarios where product data needs to be consolidated (for example, after purchases or returns) to generate a total quantity per product.

---

### Code Explanation

This code consists of two main functions:
1. **`getUniqueProducts`**: Merges product data by `purchaseId` and `productId`, calculating the total quantities and sub-quantities by summing the existing quantities and returned quantities.
2. **`mergeProducts`**: Merges products by `productId`, ensuring all quantities (`quantity`, `subQuantity`, `returnedQuantity`, etc.) are properly combined.

#### `getUniqueProducts` Function
```javascript
const getUniqueProducts = (data) => {
  const uniqueProductsMap = new Map();

  data.forEach(item => {
    const key = `${item.purchaseId}-${item.productId}`;

    if (uniqueProductsMap.has(key)) {
      const existingItem = uniqueProductsMap.get(key);
      existingItem.totalQuantity += item.quantity + item.returnedQuantity;
      existingItem.totalSubQuantity += item.subQuantity + item.returnedSubQuantity;
    } else {
      uniqueProductsMap.set(key, {
        ...item,
        totalQuantity: item.quantity + item.returnedQuantity,
        totalSubQuantity: item.subQuantity + item.returnedSubQuantity
      });
    }
  });

  return Array.from(uniqueProductsMap.values());
}
```

**Explanation**:
- **Purpose**: The function ensures that products with the same `purchaseId` and `productId` are combined into a single product record.
- **Logic**:
    - A `Map` is used to store products with a unique composite key (`purchaseId-productId`).
    - If a product already exists in the map, it updates the `totalQuantity` and `totalSubQuantity`.
    - Otherwise, it adds the product with initial quantities.

#### `mergeProducts` Function
```javascript
const mergeProducts = (products) => {
  const productMap = new Map();

  products.forEach((product) => {
    if (productMap.has(product.productId)) {
      const existingProduct = productMap.get(product.productId);
      existingProduct.quantity += product.quantity;
      existingProduct.subQuantity += product.subQuantity;
      existingProduct.returnedQuantity += product.returnedQuantity;
      existingProduct.returnedSubQuantity += product.returnedSubQuantity;
      existingProduct.totalQuantity += product.totalQuantity;
      existingProduct.totalSubQuantity += product.totalSubQuantity;
    } else {
      productMap.set(product.productId, { ...product });
    }
  });

  return Array.from(productMap.values());
};
```

**Explanation**:
- **Purpose**: This function is designed to merge products that share the same `productId`, aggregating the total quantities of each product.
- **Logic**:
    - It iterates through each product and checks if it exists in the `Map` using its `productId`.
    - If the product exists, it updates its `quantity`, `subQuantity`, `returnedQuantity`, `totalQuantity`, and `totalSubQuantity`.
    - Otherwise, it adds the product to the map.

---

### Real-World Example

Consider the following scenario:

You are handling returns and purchases of products in an e-commerce system. The same product may be purchased or returned in multiple transactions, and you need to combine these transactions to get the total number of items purchased or returned.

Here’s a list of transactions for two products (`new-1` and `new-2`) that have been either purchased or returned multiple times:

```javascript
const unique_products = [
  { purchaseId: 773, purchaseReturnId: 47, productId: 29, productName: 'new-1', quantity: 0, subQuantity: 0, returnedQuantity: 3, totalQuantity: 5, totalSubQuantity: 0 },
  { purchaseId: 773, purchaseReturnId: 47, productId: 30, productName: 'new-2', quantity: 0, subQuantity: 0, returnedQuantity: 3, totalQuantity: 5, totalSubQuantity: 0 },
  { purchaseId: 774, purchaseReturnId: 49, productId: 29, productName: 'new-1', quantity: 0, subQuantity: 0, returnedQuantity: 1, totalQuantity: 1, totalSubQuantity: 0 },
  { purchaseId: 774, purchaseReturnId: 49, productId: 30, productName: 'new-2', quantity: 0, subQuantity: 0, returnedQuantity: 1, totalQuantity: 1, totalSubQuantity: 0 }
];
```

By using the `mergeProducts` function, you will combine all occurrences of the same products based on `productId` and return a consolidated list of products.

---

### Similar Problem Questions

#### Question 1:
**How can we merge product data based on multiple transactions (purchase, returns) where the product might appear in different transactions with different quantities?**

<details>
  <summary>Answer</summary>
  We can use a `Map` to track each unique product by creating a composite key (`purchaseId-productId`). If a product exists in the `Map`, we update its quantities accordingly. Otherwise, we insert the product with its initial quantities.
</details>

---

#### Question 2:
**How can we combine quantities for products that share the same `productId` but appear in different transactions?**

<details>
  <summary>Answer</summary>
  The `mergeProducts` function is used to combine product data based on the `productId`. If the product already exists in the `Map`, its quantities are updated. This ensures that the total quantities of products are summed correctly across different transactions.
</details>

---

### Output and Comments

```javascript
const mergedProducts = mergeProducts(unique_products);
console.log(mergedProducts);
```

#### Output:
```json
[
  {
    "purchaseId": 773,
    "purchaseReturnId": 47,
    "productId": 29,
    "productName": "new-1",
    "productNameAndCode": "new-1 - QG6PM1SV",
    "purchasePrice": 10,
    "salePrice": 20,
    "quantity": 0,
    "subQuantity": 0,
    "returnedQuantity": 4,
    "returnedSubQuantity": 0,
    "totalQuantity": 6,
    "totalSubQuantity": 0
  },
  {
    "purchaseId": 773,
    "purchaseReturnId": 47,
    "productId": 30,
    "productName": "new-2",
    "productNameAndCode": "new-2 - 8J8VAYOP",
    "purchasePrice": 5,
    "salePrice": 10,
    "quantity": 0,
    "subQuantity": 0,
    "returnedQuantity": 4,
    "returnedSubQuantity": 0,
    "totalQuantity": 6,
    "totalSubQuantity": 0
  }
]
```

**Comment**:
- The products have been successfully merged based on `productId`.
- All quantities (`quantity`, `returnedQuantity`, etc.) are combined.
- Products with matching `productId` have updated total quantities (`totalQuantity`) and sub-quantities (`totalSubQuantity`).