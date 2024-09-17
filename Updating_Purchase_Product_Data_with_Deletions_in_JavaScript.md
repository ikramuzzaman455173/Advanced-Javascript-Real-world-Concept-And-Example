## Updating Purchase Product Data with Deletions in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
This documentation demonstrates how to update purchase product data when there are deletions in purchase return relations. The goal is to ensure that the `purchaseProductData` reflects the correct quantities and details after handling deletions.

---

### Code Explanation

The code processes and updates `purchaseProductData` based on entries from `deleteProductPurchaseReturnRelation`. It adjusts existing products or adds new ones as needed.

#### Code
```javascript
const purchaseProductData = [
  {
      productId: 29,
      productPurchasePrice: 10,
      salePrice: 20,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 2,
      subQuantity: 0,
      returnedQuantity: 3,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 5,
      totalOriginalPurchasedSubQuantity: 0
  },
  {
      productId: 30,
      productPurchasePrice: 5,
      salePrice: 10,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 5,
      subQuantity: 0,
      returnedQuantity: 5,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 5,
      totalOriginalPurchasedSubQuantity: 0
  }
];

const deleteProductPurchaseReturnRelation = [
  {
      salePrice: 10,
      purchasePrice: 5,
      productName: 'new-2',
      relatedByValue: null,
      purchaseReturnId: 200,
      purchaseId: 828,
      productId: 30,
      quantity: 5,
      subQuantity: 0,
      returnedQuantity: 5,
      returnedSubQuantity: 0
  }
];

// Process each item in deleteProductPurchaseReturnRelation
deleteProductPurchaseReturnRelation.forEach(deletedProduct => {
  // Find the matching product in purchaseProductData
  let product = purchaseProductData.find(p => p.productId === deletedProduct.productId);

  if (product) {
      // Update existing product
      product.totalOriginalPurchasedQuantity = product.quantity + product.returnedQuantity;
      product.totalOriginalPurchasedSubQuantity = product.subQuantity + product.returnedSubQuantity;
      product.returnedQuantity = 0;
      product.returnedSubQuantity = 0;
  } else {
      // Add the product if it doesn't exist in purchaseProductData
      let newProduct = {
          productId: deletedProduct.productId,
          productPurchasePrice: deletedProduct.purchasePrice,
          salePrice: deletedProduct.salePrice,
          mainUnit: deletedProduct.mainUnit, // assuming default main unit
          subUnit: deletedProduct.subUnit, // assuming default sub unit
          relatedByValue: deletedProduct.relatedByValue, // assuming default relatedByValue
          quantity: deletedProduct.quantity,
          subQuantity: deletedProduct.subQuantity,
          returnedQuantity: 0,
          returnedSubQuantity: 0,
          totalOriginalPurchasedQuantity: deletedProduct.quantity + deletedProduct.returnedQuantity,
          totalOriginalPurchasedSubQuantity: deletedProduct.subQuantity + deletedProduct.returnedSubQuantity
      };
      purchaseProductData.push(newProduct);
  }
});

console.log(purchaseProductData);
```

**Explanation**:
- **Purpose**: To update the `purchaseProductData` with new information from `deleteProductPurchaseReturnRelation`, reflecting the correct quantities after deletions.
- **Logic**:
    - **Processing Deletions**:
        - For each entry in `deleteProductPurchaseReturnRelation`, find the matching product in `purchaseProductData`.
        - If the product exists, update its `totalOriginalPurchasedQuantity` and `totalOriginalPurchasedSubQuantity`, and reset `returnedQuantity` and `returnedSubQuantity` to `0`.
        - If the product does not exist, create a new product entry and add it to `purchaseProductData`.

---

### Real-World Example

Consider a scenario where you need to update your product data after handling deletions. Here’s how this can be achieved using the provided code:

#### Example Data
```javascript
const purchaseProductData = [
  {
      productId: 29,
      productPurchasePrice: 10,
      salePrice: 20,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 2,
      subQuantity: 0,
      returnedQuantity: 3,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 5,
      totalOriginalPurchasedSubQuantity: 0
  },
  {
      productId: 30,
      productPurchasePrice: 5,
      salePrice: 10,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 5,
      subQuantity: 0,
      returnedQuantity: 5,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 5,
      totalOriginalPurchasedSubQuantity: 0
  }
];

const deleteProductPurchaseReturnRelation = [
  {
      salePrice: 10,
      purchasePrice: 5,
      productName: 'new-2',
      relatedByValue: null,
      purchaseReturnId: 200,
      purchaseId: 828,
      productId: 30,
      quantity: 5,
      subQuantity: 0,
      returnedQuantity: 5,
      returnedSubQuantity: 0
  }
];
```

**Output of Processing**:
```javascript
[
  {
      productId: 29,
      productPurchasePrice: 10,
      salePrice: 20,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 2,
      subQuantity: 0,
      returnedQuantity: 3,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 5,
      totalOriginalPurchasedSubQuantity: 0
  },
  {
      productId: 30,
      productPurchasePrice: 5,
      salePrice: 10,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 5,
      subQuantity: 0,
      returnedQuantity: 0,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 10,
      totalOriginalPurchasedSubQuantity: 0
  }
]
```

**Comment**:
- **`totalOriginalPurchasedQuantity` for productId 30**: Updated to `10` from the sum of `5 (existing) + 5 (deleted)`.
- **`returnedQuantity` for productId 30**: Reset to `0`.

---

### Similar Problem Questions

#### Question 1:
**How can we update product quantities when handling returns and deletions from multiple sources?**

<details>
  <summary>Answer</summary>
  Use a function similar to the provided code to process and update product data. Ensure that existing entries are adjusted for returns and deletions, and new entries are added as needed.
</details>

#### Question 2:
**What approach should be taken to consolidate and update product data after multiple deletions and returns?**

<details>
  <summary>Answer</summary>
  Consolidate product data by iterating through both existing and new return relations. Update or add product entries accordingly, reflecting accurate quantities and details.
</details>

---

### Output and Comments

```javascript
console.log(purchaseProductData);
```

**Comment**:
- The code correctly updates `purchaseProductData` based on deletions.
- The output reflects accurate quantities and details for products, ensuring that the data is up-to-date and accurate.

