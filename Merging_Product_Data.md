## Merging Product Data

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
The provided code merges product data from two sources, `prevDataGetPurchaseRelations` and `selectProductData`. The goal is to create a consolidated list of products (`purchaseProductData`), ensuring that products from `selectProductData` are included first and that no duplicate product IDs are added.

---

### Code Explanation

#### Data Sources
1. **`prevDataGetPurchaseRelations`**:
   - Contains product data with details such as product ID, purchase price, sale price, quantity, and more.
2. **`selectProductData`**:
   - Contains product data with similar fields to `prevDataGetPurchaseRelations`, but only includes selected products.

#### Code Breakdown
```javascript
const selectProductIds = new Set(selectProductData.map(item => item.productId));
```
**Purpose**:
- Creates a `Set` of product IDs from `selectProductData` to facilitate quick lookups and avoid duplicates.

```javascript
selectProductData.forEach(item => {
  purchaseProductData.push({
    productId: item.productId,
    productPurchasePrice: item.productPurchasePrice,
    salePrice: item.salePrice,
    mainUnit: item.mainUnit,
    subUnit: item.subUnit,
    relatedByValue: item.relatedByValue,
    quantity: item.quantity,
    subQuantity: item.subQuantity,
    returnedQuantity: item.returnedQuantity,
    returnedSubQuantity: item.returnedSubQuantity,
    totalOriginalPurchasedQuantity: item.totalOriginalPurchasedQuantity,
    totalOriginalPurchasedSubQuantity: item.totalOriginalPurchasedSubQuantity
  });
});
```
**Purpose**:
- Adds all products from `selectProductData` to the `purchaseProductData` array.

```javascript
prevDataGetPurchaseRelations.forEach(item => {
  if (!selectProductIds.has(item.productId)) {
    purchaseProductData.push({
      productId: item.productId,
      productPurchasePrice: item.productPurchasePrice,
      salePrice: item.salePrice,
      mainUnit: item.mainUnit,
      subUnit: item.subUnit,
      relatedByValue: item.relatedByValue,
      quantity: item.quantity,
      subQuantity: item.subQuantity,
      returnedQuantity: item.returnedQuantity,
      returnedSubQuantity: item.returnedSubQuantity,
      totalOriginalPurchasedQuantity: item.quantity,
      totalOriginalPurchasedSubQuantity: item.subQuantity
    });
  }
});
```
**Purpose**:
- Adds products from `prevDataGetPurchaseRelations` to `purchaseProductData` only if they are not already present in `selectProductData`.

**Steps**:
1. **Check for Duplicates**: Uses the `Set` of product IDs to ensure products from `prevDataGetPurchaseRelations` are only added if they are not present in `selectProductData`.
2. **Add Unique Products**: Adds unique products to the `purchaseProductData` array.

---

### Real-World Example

#### Example Data

**`prevDataGetPurchaseRelations`**:
```javascript
[
  {
    productId: 30,
    productPurchasePrice: 5,
    salePrice: 10,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    purchaseId: 824,
    quantity: 10,
    subQuantity: 0,
    returnedQuantity: 0,
    returnedSubQuantity: 0
  },
  {
    product: 'new-1 - QG6PM1SV',
    productId: 29,
    productPurchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    quantity: 0,
    subQuantity: 0,
    relationalPurchasePrice: null,
    originalPurchasedQuantity: '5 pc',
    returnedQuantity: 3,
    returnedSubQuantity: 0,
    totalOriginalPurchasedQuantity: 15,
    totalOriginalPurchasedSubQuantity: 10
  }
]
```

**`selectProductData`**:
```javascript
[
  {
    product: 'new-1 - QG6PM1SV',
    productId: 29,
    productPurchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    quantity: 0,
    subQuantity: 0,
    relationalPurchasePrice: null,
    originalPurchasedQuantity: '5 pc',
    returnedQuantity: 3,
    returnedSubQuantity: 0,
    totalOriginalPurchasedQuantity: 5,
    totalOriginalPurchasedSubQuantity: 0
  }
]
```

**Merged Data**:
```javascript
[
  {
    productId: 29,
    productPurchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    quantity: 0,
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
    quantity: 10,
    subQuantity: 0,
    returnedQuantity: 0,
    returnedSubQuantity: 0,
    totalOriginalPurchasedQuantity: 10,
    totalOriginalPurchasedSubQuantity: 0
  }
]
```

**Explanation**:
- The merged data includes all products from `selectProductData`.
- Products from `prevDataGetPurchaseRelations` are added only if they are not already in `selectProductData`.

---

### Similar Problem Questions

#### Question 1:
**How can I merge two arrays of product data while ensuring no duplicate products based on product ID?**

<details>
  <summary>Answer</summary>
  Create a `Set` of product IDs from one array and use it to filter out duplicates when merging data from another array. Add products from the first array directly and check for duplicates from the second array before adding them.
</details>

#### Question 2:
**What if I need to combine product data from multiple sources with different fields?**

<details>
  <summary>Answer</summary>
  Define a common schema or format for the product data. Map each source's data to this format before merging. Use the same approach to handle duplicates based on unique identifiers (e.g., product ID).
</details>

---

### Output and Comments

```javascript
const prevDataGetPurchaseRelations = [
  {
    productId: 30,
    productPurchasePrice: 5,
    salePrice: 10,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    purchaseId: 824,
    quantity: 10,
    subQuantity: 0,
    returnedQuantity: 0,
    returnedSubQuantity: 0
  },
  {
    product: 'new-1 - QG6PM1SV',
    productId: 29,
    productPurchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    quantity: 0,
    subQuantity: 0,
    relationalPurchasePrice: null,
    originalPurchasedQuantity: '5 pc',
    returnedQuantity: 3,
    returnedSubQuantity: 0,
    totalOriginalPurchasedQuantity: 15,
    totalOriginalPurchasedSubQuantity: 10
  }
];
const selectProductData = [
  {
    product: 'new-1 - QG6PM1SV',
    productId: 29,
    productPurchasePrice: 10,
    salePrice: 20,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null,
    quantity: 0,
    subQuantity: 0,
    relationalPurchasePrice: null,
    originalPurchasedQuantity: '5 pc',
    returnedQuantity: 3,
    returnedSubQuantity: 0,
    totalOriginalPurchasedQuantity: 5,
    totalOriginalPurchasedSubQuantity: 0
  }
];

const purchaseProductData = [];

// Create a set of product IDs from selectProductData for quick lookup
const selectProductIds = new Set(selectProductData.map(item => item.productId));

// Add all products from selectProductData to the combined array
selectProductData.forEach(item => {
  purchaseProductData.push({
    productId: item.productId,
    productPurchasePrice: item.productPurchasePrice,
    salePrice: item.salePrice,
    mainUnit: item.mainUnit,
    subUnit: item.subUnit,
    relatedByValue: item.relatedByValue,
    quantity: item.quantity,
    subQuantity: item.subQuantity,
    returnedQuantity: item.returnedQuantity,
    returnedSubQuantity: item.returnedSubQuantity,
    totalOriginalPurchasedQuantity: item.totalOriginalPurchasedQuantity,
    totalOriginalPurchasedSubQuantity: item.totalOriginalPurchasedSubQuantity
  });
});

// Add products from prevDataGetPurchaseRelations to the combined array only if not in selectProductData
prevDataGetPurchaseRelations.forEach(item => {
  if (!selectProductIds.has(item.productId)) {
    purchase

ProductData.push({
      productId: item.productId,
      productPurchasePrice: item.productPurchasePrice,
      salePrice: item.salePrice,
      mainUnit: item.mainUnit,
      subUnit: item.subUnit,
      relatedByValue: item.relatedByValue,
      quantity: item.quantity,
      subQuantity: item.subQuantity,
      returnedQuantity: item.returnedQuantity,
      returnedSubQuantity: item.returnedSubQuantity,
      totalOriginalPurchasedQuantity: item.quantity,
      totalOriginalPurchasedSubQuantity: item.subQuantity
    });
  }
});

console.log({ purchaseProductData });
```

**Output**:
```javascript
{
  purchaseProductData: [
    {
      productId: 29,
      productPurchasePrice: 10,
      salePrice: 20,
      mainUnit: 'pc',
      subUnit: null,
      relatedByValue: null,
      quantity: 0,
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
      quantity: 10,
      subQuantity: 0,
      returnedQuantity: 0,
      returnedSubQuantity: 0,
      totalOriginalPurchasedQuantity: 10,
      totalOriginalPurchasedSubQuantity: 0
    }
  ]
}
```

**Comments**:
- The output correctly merges and removes duplicates based on product IDs.
- The combined data is properly formatted and ready for further processing or display.