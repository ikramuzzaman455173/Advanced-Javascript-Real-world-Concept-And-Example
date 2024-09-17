
## Calculating Subtotals and Total Sum for Purchase Relations

### Table of Contents
1. [Introduction](#introduction)
2. [Code Explanation](#code-explanation)
3. [Real-World Example](#real-world-example)
4. [Similar Problem Questions](#similar-problem-questions)
5. [Output and Comments](#output-and-comments)

---

### Introduction
The provided code calculates the subtotal for each product based on its purchase price, quantity, and any related values. It then sums these subtotals to obtain a total sum for all products. This is useful for generating financial summaries and reports related to purchase transactions.

---

### Code Explanation

#### `calculateSubtotal` Function
```javascript
const calculateSubtotal = (purchasePrice, quantity = 0, subQuantity = 0, relatedValue) => {
  if (subQuantity && relatedValue) {
    return ((purchasePrice * subQuantity) / relatedValue + (purchasePrice * quantity)).toFixed(2);
  } else {
    return (purchasePrice * quantity).toFixed(2);
  }
};
```
**Purpose**:
- To calculate the subtotal for a product based on its purchase price, quantity, and any related value.

**Parameters**:
- `purchasePrice`: The price at which the product was purchased.
- `quantity`: The amount of product purchased.
- `subQuantity`: The quantity related to the product (optional).
- `relatedValue`: A value used to adjust the subtotal calculation if `subQuantity` is provided (optional).

**Logic**:
- If `subQuantity` and `relatedValue` are provided, the subtotal is calculated by adjusting the purchase price using these values.
- Otherwise, the subtotal is simply the product of `purchasePrice` and `quantity`.

#### Main Calculation
```javascript
// Initialize total sum
let totalSum = 0;

// Apply the function to each item in the array and accumulate the total sum
prevDataGetPurchaseRelations.forEach(item => {
  const subtotal = calculateSubtotal(
    item.purchasePrice,
    item.quantity,
    item.subQuantity,
    item.relatedByValue
  );
  totalSum += parseFloat(subtotal);
  console.log(`Product: ${item.productName}, Subtotal: $${subtotal}`);
});

console.log(`Total Sum: $${totalSum.toFixed(2)}`);
```
**Purpose**:
- To calculate and display the subtotal for each product and accumulate the total sum.

**Steps**:
1. **Initialize `totalSum`**: A variable to hold the cumulative total of all subtotals.
2. **Iterate Through Items**: For each product in `prevDataGetPurchaseRelations`, calculate the subtotal using the `calculateSubtotal` function.
3. **Accumulate Total**: Add the subtotal to `totalSum`.
4. **Display Results**: Print the subtotal for each product and the final total sum.

---

### Real-World Example

#### Example Data
```javascript
const prevDataGetPurchaseRelations = [
  {
    salePrice: 20,
    purchasePrice: 10,
    productName: 'new-1',
    relatedByValue: null,
    purchaseId: 810,
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
    purchaseId: 810,
    productId: 30,
    quantity: 5,
    subQuantity: 0,
    returnedQuantity: 5,
    returnedSubQuantity: 0
  }
];
```

**Results**:
1. **For `new-1`**:
   - Subtotal: `$10 * 2 = $20.00`
2. **For `new-2`**:
   - Subtotal: `$5 * 5 = $25.00`

**Total Sum**:
- `$20.00 + $25.00 = $45.00`

---

### Similar Problem Questions

#### Question 1:
**How can we calculate subtotals for a list of products with varying purchase prices and quantities?**

<details>
  <summary>Answer</summary>
  Use a function similar to `calculateSubtotal` to compute the subtotal for each product based on its purchase price and quantity. Iterate through the product list, calculate subtotals, and sum them to get the total.
</details>

#### Question 2:
**How do we handle products with additional related values affecting their subtotal calculations?**

<details>
  <summary>Answer</summary>
  Modify the subtotal calculation function to include conditions for related values and sub-quantities. Ensure that the function adjusts the subtotal based on these additional factors if they are provided.
</details>

---

### Output and Comments

```javascript
const prevDataGetPurchaseRelations = [
  {
    salePrice: 20,
    purchasePrice: 10,
    productName: 'new-1',
    relatedByValue: null,
    purchaseId: 810,
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
    purchaseId: 810,
    productId: 30,
    quantity: 5,
    subQuantity: 0,
    returnedQuantity: 5,
    returnedSubQuantity: 0
  }
];

const calculateSubtotal = (purchasePrice, quantity = 0, subQuantity = 0, relatedValue) => {
  if (subQuantity && relatedValue) {
    return ((purchasePrice * subQuantity) / relatedValue + (purchasePrice * quantity)).toFixed(2);
  } else {
    return (purchasePrice * quantity).toFixed(2);
  }
};

// Initialize total sum
let totalSum = 0;

// Apply the function to each item in the array and accumulate the total sum
prevDataGetPurchaseRelations.forEach(item => {
  const subtotal = calculateSubtotal(
    item.purchasePrice,
    item.quantity,
    item.subQuantity,
    item.relatedByValue
  );
  totalSum += parseFloat(subtotal);
  console.log(`Product: ${item.productName}, Subtotal: $${subtotal}`);
});

console.log(`Total Sum: $${totalSum.toFixed(2)}`);
```

**Comment**:
- The `calculateSubtotal` function correctly computes subtotals based on provided parameters.
- The main code accumulates the subtotals and prints the results, providing a clear summary of financial data related to purchases.

