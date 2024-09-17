

<h3 align="center"> Advanced JavaScript Array Operations: Filtering, Mapping, and Modifying 👨‍💻</h3>

## Table of Contents
- [Introduction](#introduction)
- [Real-World Example: Inventory Management System](#real-world-example-inventory-management-system)
- [Data Setup](#data-setup)
- [Filtering: Removing Discontinued Products](#filtering-removing-discontinued-products)
- [Mapping: Creating a List of Products to Reorder](#mapping-creating-a-list-of-products-to-reorder)
- [Additional Modification: Adjusting Quantities](#additional-modification-adjusting-quantities)
- [Real-World Questions and Outputs](#real-world-questions-and-outputs)
  - [Question 1: Which Products Are Removed?](#question-1-which-products-are-removed)
  - [Question 2: Reordering Products](#question-2-reordering-products)
  - [Question 3: Adjusting Stock Quantities](#question-3-adjusting-stock-quantities)
  - [Question 4: Handling Products Not in the System](#question-4-handling-products-not-in-the-system)

## Introduction
In this guide, we’ll explore array manipulation techniques that can be used in real-world scenarios like inventory management, focusing on **filtering**, **mapping**, and **modifying** arrays of objects.

---

## Real-World Example: Inventory Management System
Imagine an inventory management system where a company tracks products that have been purchased and needs to filter out discontinued or obsolete products. The system also needs to map out products that require reordering, based on specific criteria like quantities.

---

## Data Setup
We have an array representing the company’s purchase relations and another array representing discontinued products.

```javascript
let prevDataGetPurchaseRelations = [
  { purchaseId: 484, productId: 25, productName: "Wireless Mouse", quantity: 2, subQuantity: 0 },
  { purchaseId: 484, productId: 27, productName: "Keyboard", quantity: 2, subQuantity: 0 },
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 2, subQuantity: 0 },
  { purchaseId: 484, productId: 26, productName: "USB Cable", quantity: 2, subQuantity: 0 }
];

let discontinuedProductIds = [25, 27, 28, 26]; // These are discontinued products.
```

In this scenario:
- `prevDataGetPurchaseRelations` contains information about products that were purchased, including their `productId`, `productName`, `quantity`, and `subQuantity`.
- `discontinuedProductIds` is a list of `productId`s representing products that have been discontinued and need to be filtered out.

---

## Filtering: Removing Discontinued Products
We will filter the products to remove any that are discontinued, based on `discontinuedProductIds`.

```javascript
let activeProducts = prevDataGetPurchaseRelations.filter(item => !discontinuedProductIds.includes(item.productId));
```

### Commented Example Output:

```javascript
[
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 2, subQuantity: 0 }
]
// Products with productId 25, 27, and 26 were filtered out because they were discontinued.
```

---

## Mapping: Creating a List of Products to Reorder
Now, let’s say the company wants to reorder products that are still active in the system. We will map the filtered products to create a list containing only the `productId`, `productName`, and `quantity`.

```javascript
let reorderList = activeProducts.map(item => ({
  productId: item.productId,
  productName: item.productName,
  quantity: item.quantity
}));
```

### Commented Example Output:

```javascript
[
  { productId: 29, productName: "Monitor", quantity: 2 }
]
// The company needs to reorder monitors, as it is the only active product left after filtering.
```

---

## Additional Modification: Adjusting Quantities
What if the company wants to adjust the quantity of remaining products based on new stock data? Let’s assume they want to increase the `quantity` by 5 for each remaining product.

```javascript
activeProducts = activeProducts.map(item => ({
  ...item,
  quantity: item.quantity + 5
}));
```

### Commented Example Output:

```javascript
[
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 7, subQuantity: 0 }
]
// The quantity of monitors is updated from 2 to 7.
```

---

## Real-World Questions and Outputs

### Question 1: Which Products Are Removed?
<details>
<summary>After filtering, which products are removed from the inventory list?</summary>

```javascript
let discontinuedProducts = prevDataGetPurchaseRelations.filter(item => discontinuedProductIds.includes(item.productId));
console.log(discontinuedProducts);
```

#### Output:

```javascript
[
  { purchaseId: 484, productId: 25, productName: "Wireless Mouse", quantity: 2, subQuantity: 0 },
  { purchaseId: 484, productId: 27, productName: "Keyboard", quantity: 2, subQuantity: 0 },
  { purchaseId: 484, productId: 26, productName: "USB Cable", quantity: 2, subQuantity: 0 }
]
```

**Explanation**: The `Wireless Mouse`, `Keyboard`, and `USB Cable` are discontinued, so they were filtered out.
</details>

---

### Question 2: Reordering Products
<details>
<summary>Which products are left for reordering after filtering the discontinued ones?</summary>

```javascript
console.log(reorderList);
```

#### Output:

```javascript
[
  { productId: 29, productName: "Monitor", quantity: 2 }
]
```

**Explanation**: Only the `Monitor` product remains active in the inventory system and needs to be reordered.
</details>

---

### Question 3: Adjusting Stock Quantities
<details>
<summary>What happens if the company increases the stock quantity by 5 for each active product?</summary>

```javascript
console.log(activeProducts);
```

#### Output:

```javascript
[
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 7, subQuantity: 0 }
]
```

**Explanation**: The `Monitor` product’s stock has been updated from 2 to 7 after adding 5 to the original quantity.
</details>

---

### Question 4: Handling Products Not in the System
<details>
<summary>What happens if a product in `discontinuedProductIds` is not found in `prevDataGetPurchaseRelations`?</summary>

```javascript
let prevDataGetPurchaseRelations = [
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 2, subQuantity: 0 }
];

let discontinuedProductIds = [25, 27, 28, 26];

let activeProducts = prevDataGetPurchaseRelations.filter(item => !discontinuedProductIds.includes(item.productId));
console.log(activeProducts);
```

#### Output:

```javascript
[
  { purchaseId: 484, productId: 29, productName: "Monitor", quantity: 2, subQuantity: 0 }
]
```

**Explanation**: None of the discontinued product IDs were found in the purchase data, so no products were filtered out.
</details>
