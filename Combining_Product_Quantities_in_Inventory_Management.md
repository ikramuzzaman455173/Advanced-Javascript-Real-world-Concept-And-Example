# Combining Product Quantities in Inventory Management

## Table of Contents
- [Introduction](#introduction)
- [Real-World Example: Handling Product Returns and Inventory](#real-world-example-handling-product-returns-and-inventory)
- [Data Setup](#data-setup)
- [Combining Product Quantities](#combining-product-quantities)
- [Additional Scenarios](#additional-scenarios)
  - [Question 1: Combining Duplicates](#question-1-combining-duplicates)
  - [Question 2: Handling SubQuantities](#question-2-handling-subquantities)

---

## Introduction
In many inventory systems, products may have multiple entries due to returns, partial shipments, or sub-units like boxes or individual pieces. It’s important to combine product quantities efficiently to get an accurate count. This guide shows how to merge product data based on the product `id` and accumulate `quantity` and `subQuantity` values.

---

## Real-World Example: Handling Product Returns and Inventory

Imagine an inventory system where the same product can appear multiple times due to multiple purchases or returns. We need to combine these entries to get an accurate representation of the inventory levels.

---

## Data Setup

Here’s the initial data, where some products are listed multiple times, and we need to combine their quantities:

```javascript
const deletedProductsData = [
  {
    id: 29,
    productName: 'new-1',
    productNameAndCode: 'new-1 - QG6PM1SV',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 1,
    subQuantity: 1,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    id: 30,
    productName: 'new-2',
    productNameAndCode: 'new-2 - 8J8VAYOP',
    purchasePrice: 5,
    salePrice: 10,
    quantity: 1,
    subQuantity: 1,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    id: 29,
    productName: 'new-1',
    productNameAndCode: 'new-1 - QG6PM1SV',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 1,
    subQuantity: 0,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    id: 30,
    productName: 'new-2',
    productNameAndCode: 'new-2 - 8J8VAYOP',
    purchasePrice: 5,
    salePrice: 10,
    quantity: 1,
    subQuantity: 1,
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  }
];
```

This data contains two products (`id: 29` and `id: 30`), each of which appears more than once.

---

## Combining Product Quantities

To combine the product data, we use the `combineProductQuantities` function. This function aggregates the `quantity` and `subQuantity` of each product by its `id`.

```javascript
const combineProductQuantities = products => {
  const productMap = {};

  products.forEach(product => {
    const key = product.id;
    if (productMap[key]) {
      productMap[key].quantity += product.quantity;
      productMap[key].subQuantity += product.subQuantity;
    } else {
      productMap[key] = { ...product };
    }
  });

  return Object.values(productMap);
};

const combinedProducts = combineProductQuantities(deletedProductsData);
console.log(combinedProducts);
```

### Example Output:

```javascript
[
  {
    id: 29,
    productName: 'new-1',
    productNameAndCode: 'new-1 - QG6PM1SV',
    purchasePrice: 10,
    salePrice: 20,
    quantity: 2,       // Combined quantity
    subQuantity: 1,    // Combined subQuantity
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  },
  {
    id: 30,
    productName: 'new-2',
    productNameAndCode: 'new-2 - 8J8VAYOP',
    purchasePrice: 5,
    salePrice: 10,
    quantity: 2,       // Combined quantity
    subQuantity: 2,    // Combined subQuantity
    mainUnit: 'pc',
    subUnit: null,
    relatedByValue: null
  }
]
```

---

## Additional Scenarios

### Question 1: Combining Duplicates
<details>
<summary>How does the function handle products that appear multiple times in the array?</summary>

The `combineProductQuantities` function combines all products that have the same `id` by accumulating their `quantity` and `subQuantity`.

#### Example:

```javascript
deletedProductsData = [
  { id: 1, productName: 'A', quantity: 3, subQuantity: 1 },
  { id: 1, productName: 'A', quantity: 2, subQuantity: 1 }
];

const combined = combineProductQuantities(deletedProductsData);
console.log(combined);
```

#### Output:

```javascript
[
  { id: 1, productName: 'A', quantity: 5, subQuantity: 2 }
]
```

</details>

---

### Question 2: Handling SubQuantities
<details>
<summary>What happens when products have different `subQuantity` values?</summary>

The function will sum up the `subQuantity` values just like it does with `quantity`.

#### Example:

```javascript
deletedProductsData = [
  { id: 2, productName: 'B', quantity: 4, subQuantity: 2 },
  { id: 2, productName: 'B', quantity: 1, subQuantity: 0 }
];

const combined = combineProductQuantities(deletedProductsData);
console.log(combined);
```

#### Output:

```javascript
[
  { id: 2, productName: 'B', quantity: 5, subQuantity: 2 }
]
```

**Explanation**: The total `quantity` is 5, and the `subQuantity` is also accumulated correctly.

</details>
