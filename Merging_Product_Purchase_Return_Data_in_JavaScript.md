## Merging Product Purchase Return Data in JavaScript

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
This documentation explains how to merge and summarize product purchase return data. The function `generateProductPurchaseReturnRelationData` consolidates data from previous purchase return relations and the current delete product purchase return relations, providing an updated view of product quantities and their status.

---

### Code Explanation

The code includes a function `generateProductPurchaseReturnRelationData` that processes and combines data from two sources: previous purchase return relations and current delete product purchase return relations.

#### `generateProductPurchaseReturnRelationData` Function
```javascript
const generateProductPurchaseReturnRelationData = (prevData, deleteData) => {
  const result = [...deleteData];

  prevData.forEach(prevItem => {
    const index = result.findIndex(item => item.productId === prevItem.productId);
    if (index !== -1) {
      result[index].quantity += result[index].returnedQuantity;
      result[index].subQuantity += result[index].returnedSubQuantity;
    }
  });

  return result;
};
```

**Explanation**:
- **Purpose**: To merge and update product return relations based on previous and current data.
- **Logic**:
    - **Initialization**: Start with a copy of `deleteData`.
    - **Processing `prevData`**:
        - For each item in `prevData`, find the corresponding item in the `result` array using `productId`.
        - If a match is found, update the `quantity` and `subQuantity` of the item by adding the `returnedQuantity` and `returnedSubQuantity` from `prevData`.
    - **Return**: An updated array of product purchase return relations.

---

### Real-World Example

Consider a scenario where you need to generate a report showing updated product quantities after accounting for both previous returns and current deletions. Here’s how this can be achieved using the provided code:

#### Example Data
```javascript
const prevDataGetPurchaseReturnRelations = [
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
  },
  {
    salePrice: 20,
    purchasePrice: 10,
    productName: 'new-1',
    relatedByValue: null,
    purchaseReturnId: 200,
    purchaseId: 828,
    productId: 29,
    quantity: 2,
    subQuantity: 0,
    returnedQuantity: 3,
    returnedSubQuantity: 0
  }
];

const deleteProductPurchaseReturnRelation = [
  {
    salePrice: 20,
    purchasePrice: 10,
    productName: 'new-1',
    relatedByValue: null,
    purchaseReturnId: 200,
    purchaseId: 828,
    productId: 29,
    quantity: 2,
    subQuantity: 0,
    returnedQuantity: 3,
    returnedSubQuantity: 0
  },
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

**Output of Merging**:
```javascript
const productPurchaseReturnRelationData = generateProductPurchaseReturnRelationData(prevDataGetPurchaseReturnRelations, deleteProductPurchaseReturnRelation);
console.log(productPurchaseReturnRelationData);
```

#### Output:
```javascript
[
  {
    salePrice: 20,
    purchasePrice: 10,
    productName: 'new-1',
    relatedByValue: null,
    purchaseReturnId: 200,
    purchaseId: 828,
    productId: 29,
    quantity: 2,
    subQuantity: 0,
    returnedQuantity: 6,
    returnedSubQuantity: 0
  },
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
    returnedQuantity: 10,
    returnedSubQuantity: 0
  }
]
```

**Comment**:
- **`returnedQuantity` for 'new-1'**: Updated to `6` from the sum of `3 (previous) + 3 (current)`.
- **`returnedQuantity` for 'new-2'**: Updated to `10` from the sum of `5 (previous) + 5 (current)`.

---

### Similar Problem Questions

#### Question 1:
**How can we update product quantities after merging data from returns and deletions?**

<details>
  <summary>Answer</summary>
  Use a function similar to `generateProductPurchaseReturnRelationData` to combine previous and current data. Update the quantities by adding the values from previous returns to the current ones.
</details>

#### Question 2:
**How do we handle merging product return data from multiple sources to reflect accurate quantities?**

<details>
  <summary>Answer</summary>
  Process the data by filtering and merging the quantities. Ensure that all relevant product IDs are matched and update the quantities accordingly.
</details>

---

### Output and Comments

```javascript
const productPurchaseReturnRelationData = generateProductPurchaseReturnRelationData(prevDataGetPurchaseReturnRelations, deleteProductPurchaseReturnRelation);
console.log(productPurchaseReturnRelationData);
```

**Comment**:
- The `generateProductPurchaseReturnRelationData` function successfully merges and updates product return data.
- The output reflects accurate quantities by combining previous and current return data.

